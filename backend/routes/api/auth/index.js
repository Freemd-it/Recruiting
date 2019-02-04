const express = require('express')
const router = express.Router();
const authcontroller = require('../../../controllers/AuthController');
const authMiddleware = require('../../../middlewares/Auth');


router.post('/register', authcontroller.register);
router.post('/login', authcontroller.login);

router.use('/check', authMiddleware);
router.get('/check', authcontroller.check);

module.exports = router;