const Questions = require('../models/QuestionsModel');
const deptHasTeam = require('lib/deptHasTeam');

const _ = require('lodash')

exports.getQuestionslist = async (req, res) => {
  const { key } = req.query;
  const deptCode = []; const teamCode = []

  key.split('_').map(code => {
    deptCode.push(code.slice(0,3))
    teamCode.push(code.slice(3,5))
  })

  try {
    const common = await Questions.getCommonQuestions();

    // 본부별 공통질문 
    let first = []; let second = []

    for(let i=0; i <deptCode.length; i++)
    {
        const dept = await Questions.getDeptCommonQuestions(deptCode[i])
        i === 0 ? first = dept : second = dept
        
        if(!deptHasTeam(deptCode[i])) {
          const team = await Questions.getDeptTeamQuestions(deptCode[i], teamCode[i])
          i === 0 ? team.forEach(_v => { first.push(_v)}) : team.forEach(_v => { second.push(_v)})
        }
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
