var express = require('express');
var router = express.Router();
let db = require('../config/db');
/* GET home page. */
router.post('/updatePwd', function (req, res, next) {
    let updateSql = 'UPDATE managersmanage set PASSWORd =? where objectId = ?'
    let querySql = 'select * from managersmanage where password = ? and objectId = ?';
    let {newPwd, oldPwd, objectId} = req.body;
    let data = [oldPwd, objectId];
    db.query(querySql,data, (err, result) => {
        if (err) {
            res.send({
                code: '304',
                msg: err.sqlMessage
            })
        } else {
            if (result.length == 0) {
                res.send({
                    code: '204',
                    msg: '密码输入错误'
                })
            } else {
                db.query(updateSql, [newPwd, objectId], (err, result) => {
                    if (err) {
                        res.send({
                            code: "304",
                            msg: err.sqlMessage,
                        })
                    } else {
                        res.send({
                            code: '200',
                            msg: '修改密码成功'
                        })
                    }
                })
            }
        }
    })
});
router.post('/', (req, res, next) => {
    let sql = 'select objectId, phone,email,nickname,username, auth, superAuth from managersmanage where username=? and password=?';
    console.log(req.body);
    let {password, username} = req.body;
    
    let data = [password, username];
    // console.log(data);
    db.query(sql, data, (err, result) => {
        if (err) {
            res.send({
                code: '304',
                msg: err.sqlMessage
            })
        } else {
            console.log(result.length);
            if (result.length == 0) {
                res.send({
                    code:'204',
                    msg: '账户名或密码错误'
                })
            } else {
                res.send({
                    code: '200',
                    data: result
                })
            }
        }
    }) 
});

module.exports = router;