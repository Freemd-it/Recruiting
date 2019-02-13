const express = require('express')
const interviewController = require('controllers/InterviewTimeCtroller');

const router = express.Router();

router.get('/schedules/:batch', interviewController.getInterviewSchedule);

module.exports = router;