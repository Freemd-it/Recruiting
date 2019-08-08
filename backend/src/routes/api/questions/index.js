const express = require('express')
const router = express.Router();

const departmentcontroller = require('controllers/DepartmentController');

// router.get('/list', questionscontroller.getQuestionslist);

// 새로 만든 api 
router.get('/list', departmentcontroller.getDepartmentQuestionsList);

module.exports = router;