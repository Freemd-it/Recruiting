const mongoose = require('mongoose');
const {Schema} = mongoose;

const InterviewTimeSchema = new Schema({
    batch: Number,
    interviewDate: String,
    interviewTime: String
});

module.exports = mongoose.model('InterviewTime', InterviewTimeSchema);