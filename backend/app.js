const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors')

// config 불러오기 
const {defaultConfig, envConfig} = require('./config/constants');
const api = require('./src/routes/api');

const app = express();
const node_env = process.env.NODE_ENV
const { MONGO_URL, JWT_SECRET } = envConfig(node_env)

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

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.json({message : err.message})
});

app.listen(defaultConfig.PORT, err => {
  if(err) throw err;
  else console.log(`Server running on\n PORT: ${defaultConfig.PORT}\n NODE_ENV :${node_env}\n Running on ${MONGO_URL} `);
});
