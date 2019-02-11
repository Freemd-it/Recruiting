const express = require('express')
const router = express.Router();
const usercontroller = require('../../../controllers/UserController');
const filecontroller = require('../../../controllers/FileController');

const upload = require('../../../lib/s3Connect')
// const multer = require('multer');
// const memorystorage = multer.memoryStorage()
// const uploadData = multer({
//   storage: memorystorage
// })


router.get('/list', usercontroller.list);

router.get('/:id', usercontroller.read);
router.put('/:id', usercontroller.update);

// 리덕스 storedData테스트 
router.get('/:id/clientStoreData', usercontroller.readStoreData);
router.put('/:id/clientStoreData', usercontroller.updateStoreData);

// 파일 업로드 
router.get('/:id/file', filecontroller.getFileData)
// router.get('/:id/upload', filecontroller.getUploadfile)
// router.put('/:id/uploadlocal', filecontroller.puttUploadfilelocal)
router.put('/:id/upload', upload.array('file'), filecontroller.putUploadData)


module.exports = router;