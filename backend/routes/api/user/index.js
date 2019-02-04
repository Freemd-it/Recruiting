const express = require('express')
const router = express.Router();
const usercontroller = require('../../../controllers/UserController');

router.get('/list', usercontroller.list);
router.get('/:id', usercontroller.read);
router.put('/:id', usercontroller.update);

router.get('/:id/clientStoreData', usercontroller.readStoreData);
router.put('/:id/clientStoreData', usercontroller.updateStoreData);


module.exports=router;