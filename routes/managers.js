var express = require('express');
var router = express.Router();
let db = require('../config/db');
/* GET home page. */
router.get('/', function (req, res, next) {
    let sql;
    sql = 'select * from managersmanage order by objectId'
    
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
    let sql = 'insert into managersmanage(phone, email, nickname,username,updatedAt) values (?,?,?,?,?)';
    console.log(req.body);
    let {phone, email, nickname,username} = req.body;
    
    let data = [phone, email, nickname,username, new Date()];
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
    let sql = 'delete from managersmanage where objectId in ('+objectId+')';
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
    let sql = 'update managersmanage set phone=?, email=?, nickname=?,username=?,updatedAt=? where objectId=?';
    let {phone, email, nickname,username, objectId} = req.body;
    let data = [phone, email, nickname,username,  new Date(), objectId];
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