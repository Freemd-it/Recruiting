const express = require('express')
const router = express.Router();
const auth = require('./auth');
const user = require('./user');

const authMiddleware = require('../../middlewares/Auth');

// /auth 로 들어오면 연결
router.use('/auth', auth)

// 해당 router 에 middleware를 적용
router.use('/recruits', authMiddleware);
router.use('/recruits', user);

module.exports = router;