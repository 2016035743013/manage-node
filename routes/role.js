var express = require('express');
var router = express.Router();
let db = require('../config/db');
/* GET home page. */
router.get('/', function (req, res, next) {
    let sql;
    sql = 'select * from rolemanage order by objectId'
    
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
    let sql = 'insert into rolemanage(isSystemRole, role, remark,name, updatedAt) values (?,?,?,?,?)';
    let {isSystemRole, role, remark, name} = req.body;
    
    let data = [isSystemRole, role, remark,name, new Date()];
    console.log(data);
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
    let sql = 'delete from rolemanage where objectId in ('+objectId+')';
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
    let sql = 'update rolemanage set isSystemRole=?, role=?, remark=?, updatedAt=?, name=? where objectId=?';
    let {isSystemRole, role, remark, objectId, name} = req.body;
    let data = [isSystemRole, role, remark,  new Date(), name, objectId];
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