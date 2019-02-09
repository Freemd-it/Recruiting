const mongoose = require('mongoose');
const { envConfig } = require('../config/constants');
const node_env = process.env.NODE_ENV
const { MONGO_URL } = envConfig(node_env)

mongoose.connect(MONGO_URL);
const connection = mongoose.connection;


connection.on('error', console.error.bind(console, 'connection error:'));

const getQuestions = (deptCode, teamCode) => {
  return new Promise(async (resolve, reject) => {
    connection.db.collection("questions", function (err, collection) {
      if(err) reject(err);
      collection
        .find({'department': deptCode, 'used': true, $or: [ { team: '00' }, { team: teamCode }]})
        .sort({registedData: -1})
        .limit(deptCode == 104 || deptCode == 103 ? 2 : 1)
        .toArray(function (err, data) {
        err ? reject(err) : resolve(data)
      });
    })
  })
}

const getCommonQuestions = () => {
  return new Promise(async (resolve, reject) => {
    connection.db.collection("questions", function (err, collection) {
      if(err) reject(err);
      collection
        .find({ 'department': '900', 'used': true })
        .sort({registedData: -1})
        .limit(2)
        .toArray(function (err, data) {
        err ? reject(err) : resolve(data)
      });
    })
  })
}

module.exports = {
  getQuestions,
  getCommonQuestions,
}





