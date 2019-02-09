import axios from 'axios';
import serverConfig from '../config/serverConfig';
import * as _ from 'lodash';

const convertModelToSchemaBased = ({ personal, apply, interview }) => {
  const { personalIdentification, education, career, speciality } = personal;
  const { common, department } = apply;
  return new Promise((resolve, reject) => {
    try {

      let formData = new FormData();
      formData.append('body', JSON.stringify({
        basic_info: {
          user_name: personalIdentification.name,
          english_name: personalIdentification.englishName,
          email: personalIdentification.emailText,
          is_male: personalIdentification.gender === 'male',
          birth_date: personalIdentification.birthText,
          phone_number: personalIdentification.phoneNumberText,
          sns: personalIdentification.sns,
          address: personalIdentification.address,
          department: apply.applyChoice[0].department,
          secondary_department: apply.applyChoice[1].department,
          team: apply.applyChoice[0].team,
          secondary_team: apply.applyChoice[1].team,
        },
        academic_career: {
          academic_name: education.schoolNameText,
          location: education.location,
          major: education.major,
          entrance_date: education.graduationYear.entrance,
          graduation_date: education.graduationYear.graduation,
          degree: education.graduationYear.status,
        },
        special_info: (
          speciality.detail[0].activityDetail.length > 0 ? (
            speciality.detail.map(row => ({
              special_type: row.activityDetail,
              self_evaluation_ability: row.grade,
              content: row.content,
            }))) : []
        ),
        external_activities: (
          career.detail[0].activityDetail.length > 0 ? (
            career.detail.map(row => ({
              external_type: row.activityType,
              organizer: row.activityDetail,
              start_date: row.durationStart,
              end_date: row.durationEnd,
              turnaround_time: row.turnaround_time,
              content: row.content,
            }))) : []
        ),
        question_info: {
          common: Object.entries(common ? common : []).sort((a, b) => a - b).map(row => row[1]),
          department: department,
          fileKeys: Object.entries(department.files ? department.files : []).map(row => row[0]),
        },
        interview_info: interview.interviewDates.map((row, index) => ({
          interview_date: row.day,
          interview_week: index === 0 ? '토' : '일',
          interview_time: row.times
        })),
      }))

      const fileKeys = Object.entries(department.files ? department.files : []).map(row => row[0]);
      const filesPromise = Object.entries(department.files ? department.files : []).map(row => {
        return fetch(row[1]).then(r => r.blob());
      });

      Promise.all(filesPromise)
        .then(files => {
          for (let index = 0; index < files.length; index++) {
            formData.append('files[]', files[index], _.get(department, fileKeys[index].split('.')).name);
          }
          resolve(formData);
        });
    } catch (e) {
      reject(e);
    }
  })
};

export {
  convertModelToSchemaBased
}

export default {
  submitRecruiting: (id, accessToken, body) => {
    for (let pair of body.entries()) {
      if (pair[0] == 'body') {
        console.log(pair[0], JSON.parse(pair[1]));
      } else {
        console.log(pair);
      }
    }
    return axios.put(`${serverConfig.url}/api/recruits/${id}`, body, {
        headers: { "x-access-token": `${accessToken}`, "Content-Type": 'multipart/form-data', }
    }).then(res => res.data.isAlreadySubmitted)
  },
  getQuestionInfo: (questionClassIds) => {
    let key = '';
    questionClassIds.forEach((questionClassId, index) => {
      if (questionClassId !== null) {
        if (index > 0) {
          key += '_';
        }
        key += questionClassId.toString();
      }
    });
    return axios.get(`${serverConfig.url}/api/questions/list?key=${key}`, 
      { headers: { "x-access-token": `${window.localStorage.accessToken}` }}
    ).then(res => res.data.results);
  },
  getInterviewInfo: () => {
    return axios.get(`${serverConfig.url}/api/interview/schedules/20`,
      { headers: { "x-access-token": `${window.localStorage.accessToken}` }}
    ).then(res => res.data.result);
  }
}
