const mongoose = require('mongoose');
const multiUpdate = require('mongoose-multi-update')
const encrypted = require('lib/encrypted')

const { UserSchema } = require('./Scheme')

UserSchema.statics.create = function (user_name, email, password) {  
  const userinfo = new this({
    basicInfo: {
      user_name, 
      email, 
      password: encrypted(password),
    }
  })
  return  userinfo.save()
};

UserSchema.statics.findOneById = function (id) {
  return this.findOne({ _id:id }).exec();
};

UserSchema.statics.findOneUserInfo = function (user_name, email) {
  return this.findOne({
    'basicInfo.userName':user_name,
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
UserSchema.statics.findOneByUsername = function(user_name) {
  return this.findOne({
    'basicInfo.userName' : user_name
  }).exec();
};

// 비밀번호 암호화
UserSchema.methods.verify = function(password) {
  return this.basic_info.password === encrypted(password)
}

UserSchema.plugin(multiUpdate);

module.exports = mongoose.model('User', UserSchema);

