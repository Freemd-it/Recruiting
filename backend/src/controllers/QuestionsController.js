const Questions = require('../models/QuestionsModel');

const _ = require('lodash')

exports.getQuestionslist = async (req, res) => {
  const { department, secondary_department, team, secondary_team } = req.query;
  try {
    const common = await Questions.getCommonQuestions();

    // 본부별 공통질문 
    let first = [];
    let second = [];

    if (department !== '') {
      const questions = await Questions.getQuestions(department, '공통');
      first = first.concat(questions);
    }

    if (team !== '' && team !== '공통') {
      const questions = await Questions.getQuestions(department, team);
      first = first.concat(questions);
    }

    if (secondary_department !== '' && secondary_department !== department) {
      const questions = await Questions.getQuestions(secondary_department, '공통');
      second = second.concat(questions);
    }

    if (secondary_team !== '' && secondary_team !== '공통') {
      const questions = await Questions.getQuestions(secondary_department, secondary_team);
      second = second.concat(questions);
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
