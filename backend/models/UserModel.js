const mongoose = require('mongoose');
const {Schema} = mongoose;
const crypto = require('crypto')
const { envConfig} = require('../config/constants');
const node_env = process.env.NODE_ENV
const {JWT_SECRET} = envConfig(node_env)
const multiUpdate = require('mongoose-multi-update')
const NODE_JS = 'Node.js';

// 포트폴리오
const PortfoliosSchema = new Schema({
  originalname: String,
  location: String, // 포트폴리오 파일 경로
  registedDate: {
    type: Date,
    default: new Date() // 현재 날짜를 기본값으로 지정
  }
})

// 경력사항
const ExternalActivitiesSchema = new Schema({
  external_type:{
    type: String,
    enum : ['인턴', '봉사활동']
  },
  organizer: String, 
  start_date: String, // 2019/03
  end_date: String, 
  turnaround_time: Number,
  content: String 
})

// 자격증
const SpecialSchema = new Schema({
  special_type: {
    type: String,
    enum: ['자격증', '어학능력', '기타능력']
  },
  // acquisition_date: Date,
  self_evaluation_ability: {
    type: String,
    enum: ['상', '중', '하']
  },
  content: String 
});

// 질문 스키마
const QuestionsSchema = new Schema({
  classify: Number, //공통, 본부, 팀질문 및 어떤본부 팀인지 분류 101 102 103
  department: String, //본부
  team: String, //팀
  key: String, // 본부 팀 
  question : String, //질문내용,
  type: String,
  content: String,
  select :{
    SQL: {
      type: String,
    },
    jQuery: {
      type: String,
    },
    HTML: {
      type: String,
    },
    Javascipt: {
      type: String,
    },
    CSS: {
      type: String,
    },
    Linux: {
      type: String,
    },
    NODEJS: {
      type: String,
    },
    PHP: {
      type: String,
    },
  } ,
  batch: Number, //기수
  portfolios: [PortfoliosSchema],
  registedDate: {
    type: Date,
    default: new Date() // 현재 날짜를 기본값으로 지정
  }
})

const interviewSchema = new Schema({
  interview_date : Date,
  interview_week : String,
  interview_time : [String]
})

const UserSchema = new Schema({
  clientStoreData:{
  },
  support_status: {
    type: Number,
    default: '200'
  },
  registedDate: {
    type: Date,
    default: new Date() // 현재 날짜를 기본값으로 지정
  },
  basic_info:{
    user_name : String,
    email: {
      type : String,
      unique : true
    },
    password : String,
    
    can_moved: Boolean, 
    can_multiple_interview: Boolean,

    english_name: String,
    is_male: Boolean,
    birth_date: String, // yyyy-mm-dd
    
    phone_number : String,
    sns : String,
    address : String,
    
    department: {
      type: String,
      enum: ['경영지원본부', '브랜드마케팅본부', '디자인본부','IT기획본부', '무료진료소사업본부', '보건교육산업본부', '해외의료사업본부']
    },
    secondary_department: {
      type: String,
      enum: ['경영지원본부', '브랜드마케팅본부', '디자인본부','IT기획본부', '무료진료소사업본부', '보건교육산업본부', '해외의료사업본부']
    },
    team: String, 
    secondary_team: String, 
  },
  academic_career: {
    academic_name : String,
    location : String,
    degree : String,
    major: String,
    entrance_date : String,
    graduation_date: String
  },
  external_activities: [ExternalActivitiesSchema],
  special_info: [SpecialSchema],
  question_info: [QuestionsSchema],
  interview_info : [interviewSchema]
})


// 몽고디비 저장
// arrow function 이 안먹힘
UserSchema.statics.create = function(user_name, email, password)  {
  const secret = JWT_SECRET

  const encrypted = crypto.createHmac('sha1', secret)
                    .update(password)
                    .digest('base64');
  
  const userinfo = new this({
    basic_info:{
      user_name, 
      email, 
      password : encrypted
    }
  })

  return  userinfo.save()
};

// id 로 찾기
UserSchema.statics.findOneById = function(id){
  return this.findOne({
    _id:id
  }).exec();
};

UserSchema.statics.findOneUserInfo = function(user_name, email){
  console.log(user_name, email)
  return this.findOne({
    'basic_info.user_name':user_name,
    'basic_info.email' : email
  }).exec();
};

// email 로 찾기
UserSchema.statics.findOneByEmail = function(email){
  return this.findOne({
    'basic_info.email' : email
  }).exec();
};

// 이름 으로 찾기
UserSchema.statics.findOneByUsername = function(user_name) {
  return this.findOne({
      'basic_info.user_name' : user_name
  }).exec();
};

// 비밀번호 암호화
UserSchema.methods.verify = function(password) {
  // console.log(this.password)
  const encrypted = crypto.createHmac('sha1', JWT_SECRET)
                          .update(password)
                          .digest('base64');

  return this.basic_info.password === encrypted
}

UserSchema.plugin(multiUpdate);

module.exports = mongoose.model('User', UserSchema);

