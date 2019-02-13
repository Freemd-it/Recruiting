const express = require('express')
const router = express.Router();

const questionscontroller = require('controllers/QuestionsController');

router.get('/list', questionscontroller.getQuestionslist);

module.exports = router;