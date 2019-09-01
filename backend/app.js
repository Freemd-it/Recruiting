const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors')
const Sentry = require('@sentry/node');

// config 불러오기 
const {defaultConfig, envConfig} = require('./config/constants');
const api = require('./src/routes/api');

const app = express();


const node_env = process.env.NODE_ENV
const { MONGO_URL, JWT_SECRET, SENTRY } = envConfig(node_env)

// 에러 로그 수집을 위한 센트리 설정
Sentry.init({ dsn: SENTRY });
app.use(Sentry.Handlers.requestHandler());

// 설정
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// 비밀키 
app.set('jwt-secret', JWT_SECRET)

app.get('/', (req, res) => {
    res.send('리쿠르팅 api 서버')
});


// cors
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 
}

app.use(cors(corsOptions))
app.use((req, res, next) => {
  console.log(res.header);
  next();
});

// /api요청 사용
app.use('/api', api);

// 센트리 테스트 API
app.get('/debug-sentry', function mainHandler(req, res) {
  throw new Error('My first Sentry error!');
});

// api 에서 에러 발생시 센트리로 메세지가 가도록 설정
app.use(Sentry.Handlers.errorHandler());

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err);
  res.status(err.status || 500);
  res.json({message : err.message})
});

app.listen(defaultConfig.PORT, err => {
  if(err) throw err;
  else console.log(`Server running on\n PORT: ${defaultConfig.PORT}\n NODE_ENV :${node_env}\n Running on ${MONGO_URL} `);
});
