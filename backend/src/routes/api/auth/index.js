const express = require('express')

const authcontroller = require('controllers/AuthController');
const authMiddleware = require('middlewares/Auth');

const router = express.Router();

router.post('/login', authcontroller.login);

router.use('/check', authMiddleware);
router.get('/check', authcontroller.check);

module.exports = router;