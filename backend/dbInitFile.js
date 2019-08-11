const mongoose = require('mongoose');
const {defaultConfig, envConfig} = require('./config/constants');
const { schemeInit } = require('./src/service/SchemeService');

// mongoose.Promise = global.Promise;
const node_env = process.env.NODE_ENV;
const { MONGO_URL } = envConfig(node_env);
console.log(MONGO_URL);

const close = async () => {
  await mongoose.connection.close(async () => {
      console.log("Mongoose Closed");
      await process.exit();
  });
}

  // 몽고디비 연결
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true
}).then(async ()=> {
  console.log(`Connected to mongodb ${MONGO_URL}`);
  if (await schemeInit()) {
      console.log(`DB Initialization succeeded`);
  } else {
      console.log(`DB Initialization failed`);
  }
  await close();
}).catch(async e => {
  console.error(`Connection Error: ${e}`);
  close();
});
