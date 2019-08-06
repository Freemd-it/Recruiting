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
      console.log(batch);
      const aggregated = [];
      departments.forEach(department => {
        const { departmentName, teams } = department;
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
      return aggregated.sort(d => new Date(d.date));
    });
}

module.exports = mongoose.model('Departmentmeta', DepartmentMetaSchema);