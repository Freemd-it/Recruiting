const mongoose = require('mongoose');

const { Schema } = mongoose;


const PortfoliosSchema = new Schema({
  originalname: String,
  location: String,
  registedDate: {
    type: Date,
    default: new Date(),
  }
})

// 경력사항
const ExternalActivitiesSchema = new Schema({
  external_type:{
    type: String,
    enum : ['인턴', '봉사활동']
  },
  organizer: String, 
  start_date: String,
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
  acquisition_date: Date,
  self_evaluation_ability: {
    type: String,
    enum: ['상', '중', '하']
  },
  content: String 
});

// 질문 스키마
const QuestionsSchema = new Schema({
  classify: Number,
  department: String,
  team: String,
  key: String,
  question : String,
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

const InterviewSchema = new Schema({
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
    default: new Date(),
  },
  basic_info:{
    user_name : String,
    email: {
      type : String,
      unique : true
    },
    password : String,
    
    other_assign_ngo: Boolean,
    other_assign_medical: Boolean,
    
    english_name: String,
    is_male: Boolean,
    birth_date: String,
    
    phone_number : String,
    sns : String,
    address : String,
    
    first_department: {
      type: String,
      enum: ['경영지원본부', '브랜드마케팅본부', '디자인본부','IT기획본부', '무료진료소사업본부', '보건교육산업본부', '해외의료사업본부']
    },
    secondary_department: {
      type: String,
      enum: ['경영지원본부', '브랜드마케팅본부', '디자인본부','IT기획본부', '무료진료소사업본부', '보건교육산업본부', '해외의료사업본부']
    },
    first_team: String, 
    secondary_team: String, 
    bussiness_activity: String,
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
  interview_info : [InterviewSchema],
  evaluation : {
    type: String,
    default: '미평가'
  },
})

module.exports = {
  PortfoliosSchema,
  ExternalActivitiesSchema,
  SpecialSchema,
  QuestionsSchema,
  InterviewSchema,
  UserSchema,
  SpecialSchema,
}