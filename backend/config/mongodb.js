const mongoose = require('mongoose');
const {defaultConfig, envConfig} = require('./constants');

mongoose.Promise = global.Promise;

const node_env = process.env.NODE_ENV
const {MONGO_URL} = envConfig(node_env)

try {
  mongoose.connect(MONGO_URL,{
    useNewUrlParser : true
  })
} catch (err) {
  mongoose.createConnection(MONGO_URL)
}

mongoose.connection
  .once('open', () => console.log('MongoDB Running'))
  .on('error', err => {
    throw err
  })