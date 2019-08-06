const DepartmentModel = require('../models/DepartmentModel');

const convertType = (num) => {
  switch (num) {
    case 103:
      return 'select';
    case 102:
      return 'file';
    default:
      return 'text';
  }
}

// 각 본부 전체 질문 리스트
exports.getDepartmentQuestionsList = async (req, res) => {
  const {departmentName, secondary_departmentName, teamName, secondary_teamName } = req.query;
  try {
      let common = [];
      const common_questions = await DepartmentModel.getCommonQuestions()
      const q_array = common_questions[0].teams
      const item = q_array.find(item => item.teamName === '공통');
      const array = item.questions

      const result = array.map(i =>{
        return {
          'content' : i.content,
          'type' : convertType(i.type)
        }
      })

      common = common.concat({
        teamName : item.teamName,
        questions : result
      });

     let first = [];
     let second = [];

     if (departmentName !== '') {
       const questions = await DepartmentModel.getDepartmentQuestions(departmentName, '공통');
       const q_array = questions[0].teams
       const item = q_array.find(item => item.teamName === '공통');

        const array = item.questions
        const result = array.map(i =>{
          return {
            'content' : i.content,
            'type' : convertType(i.type)
          }
        })

      first = first.concat({
        teamName : item.teamName,
        questions : result
      });
     }

     if (teamName !== '' && teamName !== '공통') {
       const questions = await DepartmentModel.getDepartmentQuestions(departmentName, teamName);
       const q_array = questions[0].teams
       const item = q_array.find(item => item.teamName === teamName);

       const array = item.questions
       const result = array.map(i =>{
        return {
          'content' : i.content,
          'type' : convertType(i.type)
        }
        })

      first = first.concat({
       teamName : item.teamName,
       questions : result
     });
    }

     if (secondary_departmentName !== '' && secondary_departmentName !== departmentName) {
       const questions = await DepartmentModel.getDepartmentQuestions(secondary_departmentName, '공통');
       const q_array = questions[0].teams
       const item = q_array.find(item => item.teamName === '공통');
       
       const array = item.questions
       const result = array.map(i =>{
        return {
          'content' : i.content,
          'type' : convertType(i.type)
        }
       })

       second = second.concat({
        teamName : item.teamName,
        questions : result
      });
     }

     if (secondary_teamName !== '' && secondary_teamName !== '공통') {
       const questions = await DepartmentModel.getDepartmentQuestions(secondary_departmentName, secondary_teamName);
       const q_array = questions[0].teams
       const item = q_array.find(item => item.teamName === secondary_teamName);

       const array = item.questions
       const result = array.map(i =>{
        return {
          'content' : i.content,
          'type' : convertType(i.type)
        }
       })

       second = second.concat({
        teamName : item.teamName,
        questions : result
      });
    }

    res.status(200).json({
      message : 'GET DEPARTEMENT QUESTION LIST SUCESS',
      results : {
        common,
        first,
        second
      }
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: err.message
    })
  }
}

