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

    const common = await Questions.getCommonQuestions();
    const first = await Questions.getQuestions(deptCode[0], teamCode[0]);
    const second = await Questions.getQuestions(deptCode[1], teamCode[1]);
    
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
