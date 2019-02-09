const Questions = require('../models/QuestionsModel');

exports.getQuestionslist = async (req, res) => {
  const { key } = req.query;
  console.log('들어온 값:', key)
  const _key = key === undefined ? [] :  key.split('_').map((item) => {
    return parseInt(item, 10);
  })

  try {
    const results = await Questions.getQuestions(_key);
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
