var mysql = require("mysql");

var pool = mysql.createPool({
    host:"127.0.0.1",//127.0.0.1 port: '3306'
    port: '3306',
    user:"root",
    password:"BA17734734cd",//BA17734734cd
    database:"usermanage",
    connectionLimit: 0,//这里需要设置为0，代表可以无数次请求数据库，否则请求几次数据库就无法请求到数据了
});

function query(sql,data,callback){
    pool.getConnection(function(err,connection){
        connection.query(sql,data, function (err,rows) {
            callback(err,rows);
            connection.release();
        });
    });
}

module.exports = {
    query
};