import axios from 'axios';
import serverConfig from '../config/serverConfig';

const convertModelToSchemaBased = ({personal, apply, interview}) => {
  const { personalIdentification, education, career, speciality} = personal;
  return {
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
      career.detail[0].activityType.length > 0 ? (
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

    },
    interview_info: interview.interviewDates.map(row => ({
      interview_date: ['2019', ...row.day.replace(/ /gi, '').split('.')].splice(0, 3).join('-'),
      interview_week: row.day.replace(/ /gi, '').split('.').pop(),
      interview_time: row.times
    })),
  }
};

export {
  convertModelToSchemaBased
}

export default {
  submitRecruiting: (id, accessToken, body) => {
    return axios.put(`${serverConfig.url}:${serverConfig.port}/api/recruits/${id}`, {
      ...body
    }, {
      headers: {"x-access-token": `${accessToken}`}
    })
  },
}
