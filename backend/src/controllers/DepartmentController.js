const DepartmentModel = require('../models/DepartmentModel');

// 각 본부 전체 질문 리스트
exports.getDepartmentQuestionsList = async (req, res) => {
  const {departmentName, secondary_departmentName, teamName, secondary_teamName } = req.query;
 

  try {
    const common = await DepartmentModel.getCommonQuestions()

     // 본부별 공통질문 
     let first = [];
     let second = [];
 
     if (departmentName !== '') {
       const questions = await DepartmentModel.getDepartmentQuestions(departmentName, '공통');
       const q_array = questions[0].teams;
       const item = q_array.find(item => item.teamName === '공통');
       first = first.concat(item);
     }
 
     if (teamName !== '' && teamName !== '공통') {
       const questions = await DepartmentModel.getDepartmentQuestions(departmentName, teamName);
       const q_array = questions[0].teams;
       const item = q_array.find(item => item.teamName === teamName);
        first = first.concat(item);
     }
 
     if (secondary_departmentName !== '' && secondary_departmentName !== departmentName) {
       const questions = await DepartmentModel.getDepartmentQuestions(secondary_departmentName, '공통');
       const q_array = questions[0].teams;
       const item = q_array.find(item => item.teamName === '공통');
       second = second.concat(item);
     }
 
     if (secondary_teamName !== '' && secondary_teamName !== '공통') {
       const questions = await DepartmentModel.getDepartmentQuestions(secondary_departmentName, secondary_teamName);
       const q_array = questions[0].teams;
       const item = q_array.find(item => item.teamName === secondary_teamName);
       second = second.concat(item);
     }

    res.status(200).json({
      message : 'GET DEPARTEMENT QUESTION LIST SUCESS',
      results : {
        common,
        first,
        second
      }
    })

    // const result = await DepartmentModel.getDepartmentQuestionsInfoList();
    // console.log('result', result)
    // res.status(200).json({
    //   message : "GET DEPARTEMENTS QUESTION LIST INFO SUCCESS",
    //   result : result
    // })

  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: err.message
    })
  }
}

