const mongoose = require('mongoose');
const { envConfig } = require('../../config/constants');
const { MONGO_URL } = envConfig(process.env.NODE_ENV);
const { RecruitSchema } = require('./Scheme');

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
    .then(result => result.departments);
}

RecruitSchema.statics.getInterviewTimes = function() {
  return this.findOne({ recruitStatus: 1001 })
    .then(result => {
      const { interviewTimes, announceDate } = result;
      const aggregated = [];
      interviewTimes.forEach(elem => {
        const { date, time } = elem;
        const dateIndex = aggregated.findIndex(d => d.date.toString() == date.toString());
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
