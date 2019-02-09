const mongoose = require('mongoose');
const { envConfig } = require('../config/constants');
const node_env = process.env.NODE_ENV
const { MONGO_URL } = envConfig(node_env)

mongoose.connect(MONGO_URL);
const connection = mongoose.connection;


connection.on('error', console.error.bind(console, 'connection error:'));

const getQuestions = (key) => {
  return new Promise(async (resolve, reject) => {
    connection.db.collection("questions", function (err, collection) {
      if(err) reject(err);
      
      collection.find({
        'classify': {
          $in: key
        }
      }).toArray(function (err, data) {
        err ? reject(err) : resolve(data)
      });
    })
  })
}

module.exports = {
  getQuestions,
}





