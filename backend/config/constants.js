const localConfig = {
  MONGO_URL: 'mongodb://localhost/backend_test',
  JWT_SECRET: 'SeCrEtKeYfOrHaShInG',
  BUCKET : 'freemed.develop',
  PREFIX : 'Portfolios_local'
};

const devConfig = {
  MONGO_URL: 'mongodb://13.209.7.151/test',
  JWT_SECRET: 'SeCrEtKeYfOrHaShInGDeV',
  BUCKET : 'freemed.develop',
  PREFIX : 'Portfolios_dev'
};

const prodConfig = {
  MONGO_URL: 'mongodb://13.209.65.66/Recruiting',
  JWT_SECRET: 'SeCrEtKeYfOrHaShInGPrOd',
  BUCKET : 'freemed.recruiting',
  PREFIX : 'Portfolios_prod'
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


