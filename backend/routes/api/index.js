const express = require('express')
const router = express.Router();
const auth = require('./auth');
const user = require('./user');
const questions = require('./questions');
const authMiddleware = require('../../middlewares/Auth');
const upload = require('../../lib/s3Connect')


// /auth 로 들어오면 연결
router.use('/auth', auth)

// 해당 router 에 middleware를 적용
router.use('/recruits', authMiddleware);
router.use('/recruits', upload.any('files'), user);

router.use('/questions', authMiddleware);
router.use('/questions', questions);


module.exports = router;