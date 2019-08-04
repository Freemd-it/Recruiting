const router = require('express').Router();

const recruit = require('controllers/RecruitController');

router.get('/batch', recruit.getBatch);
router.get('/department', recruit.getDepartmentData);
router.get('/interview', recruit.getInterviewTimes)

module.exports = router;