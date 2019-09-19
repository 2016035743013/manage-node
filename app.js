var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

let staffRouter = require('./routes/staff.js');
let positionRouter = require('./routes/position');
let organizationRouter = require('./routes/organization');
let roleRouter = require('./routes/role')
let managersRouter = require('./routes/managers')
let loginRouter = require('./routes/login')

var app = express();
// 配置允许跨域白名单
app.all('*', function(req, res, next) {  
  res.header("Access-Control-Allow-Origin", "*");  
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");  
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
  res.header("X-Powered-By",' 3.2.1')  
  res.header("Content-Type", "application/json;charset=utf-8");  
  next();  
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));//配置访问静态资源


app.use('/staffManage', staffRouter);
app.use('/positionManage', positionRouter);
app.use('/organizationmanage', organizationRouter);
app.use('/rolemanage', roleRouter);
app.use('/managers', managersRouter);
app.use('/login', loginRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
// 捕获全局的错误  使程序不会崩溃，但是方法太过粗糙了
process.on('uncaughtException', (err) => {
  console.log(err);
})
module.exports = app;
