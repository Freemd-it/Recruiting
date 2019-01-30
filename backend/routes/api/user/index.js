const express = require('express')
const router = express.Router();
const usercontroller = require('../../../controllers/UserController');

router.get('/list', usercontroller.list);
router.get('/:id', usercontroller.read);
router.put('/:id', usercontroller.update);

module.exports=router;