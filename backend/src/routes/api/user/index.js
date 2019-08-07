const express = require('express')
const router = express.Router();

const userController = require('controllers/UserController');
const filecontroller = require('controllers/FileController');

const upload = require('lib/s3Connect')

router.get('/list', userController.list);

router.get('/:id', userController.read);
router.put('/:id', userController.n_update);
// router.put('/:id', userController.update);


// 임시저장
router.get('/:id/clientStoreData', userController.readStoreData);
router.put('/:id/clientStoreData', userController.updateStoreData);

// 파일 업로드 
router.get('/:id/file', filecontroller.getFileData)
router.put('/:id/upload', upload.array('file'), filecontroller.putUploadData)


module.exports = router;