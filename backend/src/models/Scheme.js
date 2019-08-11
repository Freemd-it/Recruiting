const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  // 기수
  batch: Number,

  // 임시저장
  clientStoreData:{

  },

  // 제출여부
  supportStatus: {
    type: Number,
    enum : [200, 201],
    default: '200'
  },

  // 등록일자
  registedDate: {
    type: Date,
    default: Date.now()
  },
  
  // 평가
  evaluation : {
    type: String,
    default: '미평가'
  },

  // 기본정보
  basicInfo: {
    userName: String, // 지원자 이름
    email: {
      type : String,
      unique : true
    },
    password : String,

    englishName: String,// 지원자 영어이름
    isMale: Boolean, // 남여
    birthDate: Date, // 생일
    phoneNumber: String, // 폰
    sns: String, // sns url
    address: String, // 주소
    password : String,

    departments: [{ // 1지망 && 2지망 등등..
      departmentName: String, // 본부
      teamName: String, // 팀이름
      order: Number, // 1,2, ...
      medicalField: {
        type : String,
        enum : ["무료진료", "보건교육", '해외진료']
      },
    }],
    
    otherAssignNgo: Boolean, // NGO 동의
    otherAssignMedical: Boolean, // 다른의료 동의?
  },

  // 학력사항
  academicCareer: {
    academicName: String, // 학교이름
    location: String, // 지역
    major: String, // 전공
    entranceDate: Date, // 입학년도 
    graduationDate: Date, // 졸업년도
    degree: {
      type: String,
      enum: ["졸업", "휴학", "재학", "대학원"],
    },
  },

  // 특기사항
  specialInfo: [{ // 특기사항
    specialType: {
      type: String,
      enum: ["자격증", "어학능력", "기타능력"],
    },
    acquisitionDate: Date,
    selfEvaluationAbility: { // 본인 수준평가
      type: String,
      enum: ["상", "중", "하"]
    },
    content: String ,
  }],

  // 경력사항
  externalActivities: [{
    externalType:{
      type: String,
      enum : ['인턴', '봉사활동'],
    },
    organizer: String, // 회사이름
    startDate: Date, // 시작날짜
    endDate: Date, // 종료날짜
    turnaroundTime: Number, // 시작 ~ 종료까지의 총 시간
    content: String // 내용
  }],

  // 본부 질문
  questionInfo: [{
    batch : Number,
    departmentName: String,
    teamName: String,
    type: {
      type: Number,
      enum: [101, 102, 103] // 텍스트, 파일첨부, 선택
    },
    question: String, // 질문내용
    text: String, // 답변
    questionType: {
      type: String,
      enum: ["common", "department"], // 공통질문, 본부질문
    },
    file: {
      oriName: String, // 파일이름
      key: String, // 변환된 파일이름
      url: String, // s3링크
    },
  }],

  // 인터뷰시간
  interviewInfo: [{
    interviewDate: Date,
    interviewWeek: String,
    interviewTime: [String]
  }],

  // 평가여부
  evaluation : {
    type: String,
    default: '미평가'
  },
});

// ?
const RecruitSchema = new Schema({
  batch: Number,
  period: {
    startDate: Date,
    endDate: Date
  },
  announceDate: Date,
  recruitStatus: Number,
  medicalFields: [String],
  departments: [{
    departmentName: String,
    departmentDescription: String,
    departmentImageUrl: String,
    teams: [
      {
        teamName: String,
        medicalFieldOptions: [String]
      }
    ]
  }],
  interviewTimes: [{
    date: Date,
    time: String
  }]
})
// module.exports = mongoose.model('User', UserSchema);

module.exports = {
  UserSchema,
  RecruitSchema,
}
