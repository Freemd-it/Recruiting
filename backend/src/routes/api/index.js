const express = require('express')
const router = express.Router();

const auth = require('./auth');
const user = require('./user');
const recruit = require('./recruit');
const questions = require('./questions');

const authMiddleware = require('middlewares/Auth');
const upload = require('lib/s3Connect');


// /auth 로 들어오면 연결
router.use('/auth', auth)

// 해당 router 에 middleware를 적용
// router.use('/recruits', authMiddleware);
router.use('/recruits', upload.array('files'), user);

//test 를 위해 잠시 꺼둠 
// router.use('/questions', authMiddleware);
router.use('/questions', questions);
router.use('/recruit', recruit)


module.exports = router;
