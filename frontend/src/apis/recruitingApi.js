import axios from 'axios';
import serverConfig from '../config/serverConfig';
import * as _ from 'lodash';

const convertModelToSchemaBased = ({ personal, apply, interview, user }) => {
  const { personalIdentification, education, career, speciality } = personal;
  const { common, department } = apply;
  return new Promise((resolve, reject) => {
    try {

      let formData = new FormData();
      formData.append('body', JSON.stringify({
        batch: user.batch,

        basicInfo: {
          userName: personalIdentification.name,
          englishName: personalIdentification.englishName,
          email: personalIdentification.emailText,
          isMale: personalIdentification.gender === 'male',
          birthDate: personalIdentification.birthText,
          phoneNumber: personalIdentification.phoneNumberText,
          sns: personalIdentification.sns,
          address: personalIdentification.address,

          departments: (
            apply.applyChoice.length > 0 ? (
              apply.applyChoice.map((row, index) => ({
                departmentName: row.department,
                teamName: row.team,
                medicalField: row.medical_field,
                order : index
              }))) : []
          ),
          otherAssignNgo: apply.otherAssignConsent.ngo,
          otherAssignMedical: apply.otherAssignConsent.medical,
        },
        academicCareer: {
          academicName: education.schoolNameText,
          location: education.location,
          major: education.major,
          entranceDate: education.graduationYear.entrance,
          graduationDate: education.graduationYear.graduation,
          degree: education.graduationYear.status,
        },
        specialInfo: (
          speciality.detail[0].activityDetail.length > 0 ? (
            speciality.detail.map(row => ({
              specialType: row.activityDetail,
              selfEvaluationAbility: row.grade,
              content: row.content,
            }))) : []
        ),
        externalActivities: (
          career.detail[0].activityDetail.length > 0 ? (
            career.detail.map(row => ({
              externalType: row.activityType,
              organizer: row.activityDetail,
              startDate: row.durationStart,
              endDate: row.durationEnd,
              turnaroundTime: row.turnaround_time,
              content: row.content,
            }))) : []
        ),
        questionInfo: {
          common: common,
          department: department,
          fileKeys: Object.keys(department.files ? department.files : []).map(d => d.slice(0, -5))
        },

        interviewInfo: interview.interviewDates.map((row, index) => ({
          interviewDate: row.date,
          interviewWeek: index === 0 ? '토' : '일',
          interviewTime: row.times
        })),
      }))

      const filesPromise = Object.entries(department.files ? department.files : []).map(row => {
        return fetch(row[1]).then(r => r.blob());
      });

      const fileKeys = Object.keys(department.files ? department.files : []);
      Promise.all(filesPromise)
        .then(files => {
          for (let index = 0; index < files.length; index++) {
            formData.append('files', files[index], _.get(department, fileKeys[index].split('.')).name);
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
    return axios.put(`${serverConfig[process.env.NODE_ENV].url}/api/recruits/${id}`, body, {
        headers: { 'x-access-token': `${accessToken}`, 'Content-Type': 'multipart/form-data', }
    }).then(res => res.data.isAlreadySubmitted)
  },
  getQuestionInfo: applyChoice => {
    const department = applyChoice[0].department;
    const team = applyChoice[0].team;
    const secondaryDepartment = applyChoice[1].department;
    const secondaryTeam = applyChoice[1].team;
    return axios.get(`${serverConfig[process.env.NODE_ENV].url}/api/questions/list`, 
      { 
          headers: { 'x-access-token': `${window.localStorage.accessToken}` },
          params: {
            departmentName: department,
            secondary_departmentName: secondaryDepartment,
            teamName: team,
            secondary_teamName: secondaryTeam 
          }
      }
    ).then(res => res.data.results);
  },
  getInterviewInfo: () => {
    return axios.get(`${serverConfig[process.env.NODE_ENV].url}/api/recruit/interview`,
      { headers: { 'x-access-token': `${window.localStorage.accessToken}` }}
    ).then(res => res.data);
  },

  getTeamsByDateInfo: batch => {
    return axios.get(`${serverConfig[process.env.NODE_ENV].url}/api/recruit/team_date`,
      { 
        headers: { 'x-access-token': `${window.localStorage.accessToken}` },
        params: { batch }
      }
    ).then(res => res.data);
  }
}
