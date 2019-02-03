const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

// config 불러오기 
const config = require('./config')
const port = process.env.PORT || 4000;

// 라우팅
const api = require('./routes/api');

const app = express();

// 설정
app.use(logger('dev'));
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 비밀키 
app.set('jwt-secret', config.secret)


app.get('/', (req, res) => {
    res.send('테스트 api 서버')
});

// /api요청 사용
app.use('/api', api);

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, () => {
  console.log(`running on port : ${port} `)
});



mongoose.Promise = global.Promise;
// 몽고디비 연결
mongoose.connect(config.mongodbUri, {
  useNewUrlParser: true
}).then(()=> {
  console.log(`connected to ${config.mongodbUri}`)
}).catch((e) => {
  console.error(e);
});