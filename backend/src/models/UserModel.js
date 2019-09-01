const mongoose = require('mongoose');
const multiUpdate = require('mongoose-multi-update')
const encrypted = require('lib/encrypted')

const { UserSchema } = require('./Scheme')

UserSchema.statics.create = function (userName, email, password) {  
  const userinfo = new this({
    basicInfo: {
      userName, 
      email, 
      password: encrypted(password),
    }
  })
  return  userinfo.save()
};

UserSchema.statics.findOneById = function (id) {
  return this.findOne({ _id:id }).exec();
};

UserSchema.statics.findOneUserInfo = function (userName, email) {
  return this.findOne({
    'basicInfo.userName':userName,
    'basicInfo.email' : email
  }).exec();
};

// email 로 찾기
UserSchema.statics.findOneByEmail = function(email){
  return this.findOne({
    'basicInfo.email' : email
  }).exec();
};

// 이름 으로 찾기
UserSchema.statics.findOneByUsername = function(userName) {
  return this.findOne({
    'basicInfo.userName' : userName
  }).exec();
};

// 비밀번호 암호화
UserSchema.methods.verify = function(password) {
  return true;
  // return this.basicInfo.password === encrypted(password)
}

UserSchema.plugin(multiUpdate);

module.exports = mongoose.model('User', UserSchema);
