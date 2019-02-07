const Questions = require('../models/QuestionsModel');

exports.getQuestionslist = async (req, res) => {
  const { keys } = req.query;

  const key = !keys ? [] :  keys.split('_').map((item) => {
    return parseInt(item, 10);
  })

  try {
    const results = await Questions.getQuestions(key);
    res.json({
      message: 'GET LIST SUCCESS',
      results: results
    })
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
}
