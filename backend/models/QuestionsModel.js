const mongoose = require('mongoose');
const {Schema} = mongoose;


const QuestionsSchema = new Schema({
  q_id: Number,
  type: {
    type : String,
    enum : ['공통질문', '본부질문', '팀질문'],
    required: true

  }, 
  // 질문 내용
  question : String,
  // 등록일자 
  registerDate: {
    type: Date,
    default: new Date() // 현재 날짜를 기본값으로 지정 UTC
  }
})





module.exports =  mongoose.model('Question', QuestionsSchema)
