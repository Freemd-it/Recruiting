const mongoose = require('mongoose');
const {Schema} = mongoose

const QuestionsSchema = new Schema({
  content : String,
  register : String,
  type: Number,
  registerDate: {
    type: Date,
    default: Date.now // 현재 날짜를 기본값으로 지정
  }
})

const TeamsSchema = new Schema({
  teamName : String,
  questions : [QuestionsSchema],
  interviewAvailable : Date
})

const DepartmentMetaSchema = new Schema({
  batch : Number,
  departmentName: String,
  teams : [TeamsSchema],
})

DepartmentMetaSchema.statics.getTeamsByDateInfo = function (batch) {
  return this.find({batch: batch})
    .then(departments => {
      const aggregated = [];
      departments.forEach(department => {
        const { departmentName, teams } = department;
        if (departmentName === '공통') {
          return;
        }
        teams.forEach(team => {
          const { teamName, interviewAvailable } = team;
          const dateIndex = aggregated.findIndex(d => d.date.toString() == interviewAvailable.toString());
          if (dateIndex === -1) {
            aggregated.push({ date: interviewAvailable, teams: [{
              departmentName, name: teamName
            }]});
          } else {
            aggregated[dateIndex].teams.push({
              departmentName, name: teamName
            });
          }
        });
      });
      return aggregated.sort((a, b) => new Date(a.date) - new Date(b.date));
    });
}

module.exports = mongoose.model('Departmentmeta', DepartmentMetaSchema);
