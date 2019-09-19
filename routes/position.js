var express = require('express');
var router = express.Router();
let db = require('../config/db');
/* GET home page. */
router.get('/', function (req, res, next) {
    let sql;
    let {rank} = req.query;
    if (!rank) {
        sql = 'select * from positionmanage order by objectId'
    } else {
        sql = "select * from positionmanage where rank like '%"+rank+"%' order by objectId";
    }
    db.query(sql, (err, result) => {
        if (err) {
            res.send({
                code: '304',
                msg: err.sqlMessage
            })
        } else {
            res.send(result);
        }
    })
});
router.post('/', (req, res, next) => {
    let sql = 'insert into positionmanage(remark, rank, code, name, updatedAt) values (?,?,?,?,?)';
    console.log(req.body);
    let {remark, rank, code, name} = req.body;
    
    let data = [remark, rank, code, name, new Date()];
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
    
    let sql = 'delete from positionmanage where objectId in ('+objectId+')';
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
    let sql = 'update positionmanage set remark=?, rank=?, code=?, name=?, updatedAt=? where objectId=?';
    let {remark, rank, code, name, objectId} = req.body;
    let data = [remark, rank, code, name,  new Date(), objectId];
    db.query(sql, data, (err, result) => {
        if(err) {
            res.send({
                code: '304',
                msg: err.sqlMessage
            });
        } else {
            res.send({
                code: '200',
                msg: '修改成功'
            })
            
        }
    })
})

module.exports = router;