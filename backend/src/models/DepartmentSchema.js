const mongoose = require('mongoose');
const {Schema} = mongoose

const QuestionsSchema = new Schema({
  content : String,
  register : String,
  type: Number,
  registedDate: {
    type: Date,
    default: Date.now // 현재 날짜를 기본값으로 지정
  }
})

const InterviewAvailableSchema = new Schema({
  interviewDate : String,
  interviewTime : String
})

const TeamsSchema = new Schema({
  teamName : String,
  questions : [QuestionsSchema],
  interviewAvailable : [InterviewAvailableSchema]
})

const DepartmentMetaSchema = new Schema({
  batch : Number,
  departmentName: String,
  teams : [TeamsSchema],
})





module.exports = mongoose.model('Departmentmeta', DepartmentMetaSchema);