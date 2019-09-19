var express = require('express');
var router = express.Router();
let db = require('../config/db');
/* GET home page. */
router.get('/', function (req, res, next) {
    let sql;
    sql = 'select * from organizationmanage order by objectId'
    
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
    let sql = 'insert into organizationmanage(type, remark, name, updatedAt) values (?,?,?,?)';
    console.log(req.body);
    let {type, remark, name} = req.body;
    
    let data = [type, remark, name, new Date()];
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
    console.log(req.body);
    objectId = JSON.parse(objectId).join(',');
    let sql = 'delete from organizationmanage where objectId in ('+objectId+')';
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
    let sql = 'update organizationmanage set type=?, remark=?, name=?, updatedAt=? where objectId=?';
    let {type, remark, name, objectId} = req.body;
    let data = [type, remark, name,  new Date(), objectId];
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