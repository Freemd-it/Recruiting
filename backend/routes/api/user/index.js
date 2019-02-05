const express = require('express')
const router = express.Router();
const usercontroller = require('../../../controllers/UserController');

router.get('/list', usercontroller.list);
router.get('/:id', usercontroller.read);
router.put('/:id', usercontroller.update);

// 리덕스 storedData테스트 
router.get('/:id/clientStoreData', usercontroller.readStoreData);
router.put('/:id/clientStoreData', usercontroller.updateStoreData);

// router.post('/:id/upload', user)

module.exports=router;