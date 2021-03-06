var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const log = require('./middlewares/logger');
var logger = require('morgan');
const cors = require('cors');
const { decodeToken } = require('./middlewares/index');

const productRouter = require('./routes/product');
const categoryRouter = require('./routes/category');
const tagRouter = require('./routes/tag');
const authRouter = require('./routes/auth');
const deliveryAddressRouter = require('./routes/deliveryAddress');
const cartRouter = require('./routes/cart');
const orderRouter = require('./routes/order');
const invoiceRouter = require('./routes/invoice');
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(decodeToken());
app.use(log);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', productRouter);
app.use('/api', categoryRouter);
app.use('/api', tagRouter);
app.use('/api', deliveryAddressRouter);
app.use('/auth', authRouter);
app.use('/api', cartRouter);
app.use('/api', orderRouter);
app.use('/api', invoiceRouter);
// app.use('/', indexRouter);
// app.use('/users', usersRouter);

app.use('/', (req,res) => {
  res.render('index', { title: 'POS API' });
});

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

module.exports = app;
