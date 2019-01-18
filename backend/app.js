// env 연동
require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('morgan');

const {
  PORT : port = 4000,
  MONGO_URI: mongoURI
} = process.env;

// Node 의 Promise 를 사용 하도록 설정
mongoose.Promise = global.Promise; 

// 몽고디비 연결
mongoose.connect(mongoURI, {
  useNewUrlParser: true
}).then(()=> {
  console.log(`connected to mongodb ${mongoURI}`)
}).catch((e) => {
  console.error(e);
});

// const Post = require('./Model/PostModel');

const app = express();

const api = require('./routes/api')(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', api);

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
