const express = require('express')
const router = express.Router();

const userController = require('controllers/UserController');

const upload = require('lib/s3Connect')

router.get('/list', userController.list);

router.get('/:id', userController.read);
router.put('/:id', userController.update);

// 임시저장
router.get('/:id/clientStoreData', userController.readStoreData);
router.put('/:id/clientStoreData', userController.updateStoreData);

module.exports = router;
