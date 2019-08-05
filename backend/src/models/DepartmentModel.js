const mongoose = require('mongoose');
const { envConfig } = require('../../config/constants');

const node_env = process.env.NODE_ENV
const { MONGO_URL } = envConfig(node_env)

mongoose.connect(MONGO_URL, {useNewUrlParser: true});
const connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'connection error:'));

// collection 이름
const schema = "departmentmetas"

// 각 본부 전체 질문 리스트
// 쿼리 스트링 적용
const getDepartmentQuestions = (department, team) => {
  console.log(department, team)
  return new Promise ((resolve, reject) => {
    connection.db.collection(schema, (err, collection) => {
      if(err) console.log(err);
      collection
      .find(
          {
          'departmentName': department,
          'teams' : {
                $elemMatch:{
                  "teamName": team
              }
            }
          }
        )
        .sort({registedData: -1})
        .limit(2)
        .toArray((err, data) => {
          err ? console.log(err) : resolve(data)
        })
    })
  })
}

// 프리메드 본부 공통
const getCommonQuestions = () => {
  return new Promise((resolve, reject) => {
    connection.db.collection(schema, (err, collection) => {
      if(err) console.log(err);
      collection
        .find({
          'departmentName' : '프리메드',
        })
        .sort({registedData: -1})
        .limit(2)
        .toArray(function (err, data) {
          err ? reject(err) : resolve(data)
      });
    })
  })
}

module.exports = {
  getCommonQuestions,
  getDepartmentQuestions
}