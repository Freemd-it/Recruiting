const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

// config 불러오기 
const config = require('./config')
const port = process.env.PORT || 3002;

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

// cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }
  next();
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({message : err.message})
});

app.listen(port, () => {
  console.log(`running on port : ${port} `)
});



mongoose.Promise = global.Promise;
// 몽고디비 연결
mongoose.connect(config.mongodbUri_dev, {
  useNewUrlParser: true
}).then(()=> {
  console.log(`connected to ${config.mongodbUri_dev}`)
}).catch((e) => {
  console.error(e);
});