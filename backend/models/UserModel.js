const mongoose = require('mongoose');
const {Schema} = mongoose;

// 기본정보
const basic_info = new Schema({
  user_name: String,
    english_name: String,
    is_male: Boolean,
    birth : Date,
    phone_number: String,
    email: {
      type : String,
      required : true,
      unique: true
    },
    password : {
      type : String,
      required : true,
      trim : true // 공백 제거
    }
});

// 학교 정보
const academic_career = new Schema({
  academic_name: String,
  location: String,
  // 0 - 고등학교
  // 1 - 대학교
  // 2 - 대학원
  degree: ['0','1','2'],
  major: String,
  entrance_date: Date,
  graduation_date: Date
});

// 대외 활동
const external_activities = new Schema({
  type:['0','1','2'],
  organizer: String,
  start_date: Date,
  end_date: Date,
  content: String
});

// 특별활동
const special_info = new Schema({
  type:['0','1','2'],
  acquisition_date: Date,
  language_ability:['0','1','2'],
  content: String
});

// 지원자가 해당 질문에 대한 대답
const question = new Schema({
  q_id: questions,
  answer: String
});

const questions = new Schema({
  _q_Id : { type: mongoose.Schema.Types.ObjectId, ref: 'Q_id' }, 
  department : ['0', '1', '2', '3']
})

// 유저
const User = new Schema({
  _userId : { type: mongoose.Schema.Types.ObjectId, ref: 'UserId' }, 
  basic_info: basic_info,
  academic_career: academic_career,
  external_activities: external_activities,
  special_info: special_info,
  department: String,
  secondary_department: String,
  team: String,
  secondary_team: String,
  can_moved: Boolean,
  question:[question],
  portfolios:
});



module.exports = mongoose.model('User', User)

// publishedDate: {
//   type: Date,
//   default: new Date() // 현재 날짜를 기본값으로 지정
// }

// embedd or reference ? 
// enum은 어떻게 ?