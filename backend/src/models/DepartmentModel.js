const mongoose = require('mongoose');
const { envConfig } = require('../../config/constants');

const node_env = process.env.NODE_ENV
const { MONGO_URL } = envConfig(node_env)

mongoose.connect(MONGO_URL, {useNewUrlParser: true});
const connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'connection error:'));


const getDepartmentInfoList = () => {
  return new Promise ((resolve, reject) => {
    connection.db.collection("departmentmetas", ()=> {
      if(err) console.log(err);
      collection
        .find({})
        .sort({registedData: -1})
        // .limit()
        .toArray((err, data) => {
          console.log('data', data)
          err ? console.log(err) : resolve(data)
        })
    })
  })
}

module.exports = {
  getDepartmentInfoList
}