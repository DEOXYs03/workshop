var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');


require('dotenv').config();
require('./db.js');

// นำเข้า Routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// สร้างตัวแปร app แค่ครั้งเดียว
var app = express();

// ==========================================
// 1. ตั้งค่า Middlewares (ควรทำก่อน Routes)
// ==========================================
app.use(cors()); // ย้าย CORS มาไว้ด้านบนสุดเพื่อให้คลุมทุก Routes
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ==========================================
// 2. ตั้งค่า View Engine (ถ้าไม่ได้ใช้ ลบทิ้งได้ครับ)
// ==========================================
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// ==========================================
// 3. กำหนดเส้นทาง Routes ทั้งหมด
// ==========================================
app.use('/', indexRouter);
app.use('/users', usersRouter);

// API Routes ตาม Flowchart
app.use('/api/v1', require('./routes/auth.routes'));
app.use('/api/v1/products', require('./routes/product.routes'));
//app.use('/api/v1/orders', require('./routes/order.routes'));


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

module.exports = app;