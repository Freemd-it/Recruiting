const localConfig = {
  MONGO_URL: 'mongodb://localhost/backend_test',
  JWT_SECRET: 'SeCrEtKeYfOrHaShInG',
};

const devConfig = {
  MONGO_URL: 'mongodb://13.209.7.151/test',
  JWT_SECRET: 'SeCrEtKeYfOrHaShInGDeV',

};

const prodConfig = {
  MONGO_URL: 'mongodb://13.209.65.66/Recruiting',
  JWT_SECRET: 'SeCrEtKeYfOrHaShInGPrOd',
};


const defaultConfig = {
  PORT: process.env.PORT || 3002,
};


function envConfig(env) {
  console.log(env)
  switch (env) {
    case 'local':
     return localConfig;
    case 'development':
      return devConfig;
    default:
      return prodConfig;
  }
}

module.exports = {
  envConfig: envConfig,
  defaultConfig: defaultConfig
};


