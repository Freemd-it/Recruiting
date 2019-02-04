const express = require('express')
const router = express.Router();
const usercontroller = require('../../../controllers/UserController');

router.get('/list', usercontroller.list);
router.get('/:id', usercontroller.read);
router.put('/:id', usercontroller.update);

router.get('/:id/origin', usercontroller.readStoreData);
router.put('/:id/origin', usercontroller.updateStoreData);


module.exports=router;