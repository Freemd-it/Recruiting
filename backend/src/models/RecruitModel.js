const mongoose = require('mongoose');
const { envConfig } = require('../../config/constants');
const { MONGO_URL } = envConfig(process.env.NODE_ENV);
const { RecruitSchema } = require('./Scheme');
const moment = require('moment');

mongoose.connect(MONGO_URL, {useNewUrlParser: true});
mongoose.Promise = global.Promise;
const connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'connection error:'));

RecruitSchema.statics.getBatch = function() {
  return this.findOne({ recruitStatus: 1001 })
    .then(result => result.batch);
}

RecruitSchema.statics.getDepartmentData = function() {
  return this.findOne({ recruitStatus: 1001 }, {'_id': 0})
    .then(result => result.departments
      .filter(department => department.departmentName !== '공통')
      .map(department => {
      const teams = department.teams;
      if (teams.length > 1) {
        department.teams = teams.filter(team => team.teamName !== '공통')
      }
      return department;
    }));
}

RecruitSchema.statics.getInterviewTimes = function() {
  return this.findOne({ recruitStatus: 1001 })
    .then(result => {
      const { interviewTimes, announceDate } = result;
      const aggregated = [];
      interviewTimes.forEach(elem => {
        const { date, time } = elem;
        const format = (date) => moment(date).format('YYYYMMDD');
        const dateIndex = aggregated.findIndex(d => format(d.date) == format(date));
        if (dateIndex === -1) {
          aggregated.push({ date, times: [time] });
        } else {
          aggregated[dateIndex].times.push(time);
        }
      });
      return {
        announceDate,
        interviewDates: aggregated.sort((a, b) => new Date(a.date) - new Date(b.date))
      };
    });
}

module.exports = mongoose.model('Recruit', RecruitSchema, 'recruitmetas'); 
