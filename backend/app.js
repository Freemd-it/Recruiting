const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const database = require('./config/mongodb');

// config 불러오기 
const {defaultConfig, envConfig} = require('./config/constants');

const port = process.env.PORT || 3002;

// 라우팅
const api = require('./routes/api');

const app = express();
const node_env = process.env.NODE_ENV
const {MONGO_URL, JWT_SECRET} = envConfig(node_env)

// 설정
app.use(logger('dev'));
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



// 비밀키 
app.set('jwt-secret', JWT_SECRET)

app.get('/', (req, res) => {
    res.send('api 서버')
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
      res.header('Access-Control-Allow-Methods', '*');
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

app.listen(defaultConfig.PORT, err => {
  if(err){
    throw err;
  } else {
    console.log(`
    Server running on port: ${defaultConfig.PORT}
    ---
    NODE_ENV :${node_env}
    ---
    Running on ${MONGO_URL} 
    ---
    Freemed Online!!!
    `);
  };
});
