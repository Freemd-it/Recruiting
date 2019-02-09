const Questions = require('../models/QuestionsModel');
const _ = require('lodash')

exports.getQuestionslist = async (req, res) => {
  const { key } = req.query;
  const deptCode = []; const teamCode = []

  key.split('_').map(code => {
    deptCode.push(code.slice(0,3))
    teamCode.push(code.slice(3,5))
  })

  try {
    let first = []; let second = [];
    const common = await Questions.getCommonQuestions();
    
    const firstDept = await Questions.getDeptCommonQuestions(deptCode[0], teamCode[0]) 
    const sercondDept = await Questions.getDeptCommonQuestions(deptCode[1], teamCode[1])
    
    firstDept.forEach(v => {first.push(v)})
    sercondDept.forEach(v => {second.push(v)})

    if(deptCode[0] != 103 && deptCode[0] != 104) {
       firstTeam = await Questions.getDeptTeamQuestions(deptCode[0], teamCode[0])
       firstTeam.forEach(v => { first.push(v)})
    }
    if(deptCode[1] != 103 && deptCode[1] != 104) {
      secondTeam = await Questions.getDeptTeamQuestions(deptCode[1], teamCode[1])
      secondTeam.forEach(v => { second.push(v)})
    }
    
    res.json({
      message: 'GET LIST SUCCESS',
      results: {
        common,
        first,
        second,
      }
    })

  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
}
