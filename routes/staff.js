var express = require('express');
var router = express.Router();
let db = require('../config/db');
let qs = require('querystring');
let url = require('url');
/* GET home page. */
router.get('/', function (req, res, next) {
    let pageSize = 10;
    let {name, rank, pageNum} = req.query;
    let sql;
    let countSql;
    if (!pageNum) {
        pageNum = 0;
    }
    pageNum = pageNum * pageSize;
    // 模糊查询
    if (name && rank) {
        sql = `select * from staffmanage where name like "%${name}%" and organization like "%${rank}%" order by objectId`;
        countSql = `select count(*) as count from staffmanage where name like "%${name}%" and organization like "%${rank}%" order by objectId`;;
    } else if (name) {
        sql = `select * from staffmanage where name like "%${name}%" order by objectId`;
        countSql = `select count(*) as count from staffmanage where name like "%${name}%" order by objectId`;
    } else if(rank) {
        sql = `select * from staffmanage where organization like "%${rank}%" order by objectId`;
        countSql = `select count(*) as count  from staffmanage where organization like "%${rank}%" order by objectId`;
    } else {
        sql = 'select * from staffmanage';
        countSql = 'select count(*) as count from staffmanage';
    }
    let count, data ;
    sql += ` limit ${pageNum}, ${pageSize}`;
    let promise1 = new Promise((resolve, rejected) => {
        db.query(sql, (err, result) => {
            if (err) {
                res.send({
                    code: '304',
                    msg: err.sqlMessage
                });
                rejected(err);
            } else {
                data = result;
                resolve(result);
            }
        })
    });
    let promise2 = new Promise((resolve, rejected) => {
        db.query(countSql, (err, result) => {
            if (err) {
                res.send({
                    code: '304',
                    msg: err.sqlMessage
                });
                rejected(err);
            } else {
                count = result;
                resolve();
            }
        })
    });
    Promise.all([promise1, promise2]).then(() => {
        console.log(data, count);
        res.send({
            code: '200',
            data: data,
            count: count
        })
    })
});
router.get('/count', (req, res, next) => {
    let sql = 'select count(*) as count from staffmanage';
    db.query(sql, (err, result) => {
        if (err) {
            res.send({
                code: '304',
                msg: err.sqlMessage
            });
        } else {
            res.send({
                code: '200',
                count: result[0].count
            })
        }
    })
})
router.post('/', (req, res, next) => {
    let sql = 'insert into staffmanage(rank, organization, phone, email, name, updatedAt) values (?,?,?,?,?,?)';
    console.log(req.body);
    let {rank, organization, phone, email, name} = req.body;
    
    let data = [rank, organization, phone, email, name, new Date()];
    // console.log(data);
    db.query(sql, data, (err, result) => {
        if (err) {
            res.send({
                code: '304',
                msg: err.sqlMessage
            })
        } else {
            res.send({
                code: '200',
                msg: '插入成功'
            })
        }
    }) 
});

router.delete('/', (req, res, next) => {
    
    let {objectId} = req.body;
    objectId = JSON.parse(objectId).join(',');
    let sql = 'delete from staffmanage where objectId in ('+objectId+')';
    db.query(sql, [], (err, result) => {
        if (err) {
            res.send({
                code: '304',
                msg: err.sqlMessage
            });
        } else {
            res.send({
                code: '200',
                msg: '删除成功'
            })
        }
    })
});

router.put('/', (req, res, next) => {
    let sql = 'update staffmanage set rank=?, organization=?, phone=?, email=?, name=?, updatedAt=? where objectId=?';
    let {rank, organization, phone, email, name, objectId} = req.body;
    let data = [rank, organization,phone, email,name, new Date(), objectId];
    db.query(sql, data, (err, result) => {
        if(err) {
            res.send({
                code: '304',
                msg: err.sqlMessage
            });
        } else {
            if (result.changedRows > 0) {
                res.send({
                    code: '200',
                    msg: '修改成功'
                })
            } else {
                res.send({
                    code: '204',
                    msg: '修改失败'
                })
            }
        }
    })
})

module.exports = router;