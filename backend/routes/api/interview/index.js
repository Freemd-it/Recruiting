const express = require('express')
const router = express.Router();
const interviewController = require('../../../controllers/InterviewTime.Ctrl');

router.get('/schedules/:batch', interviewController.getInterviewSchedule);

module.exports = router;