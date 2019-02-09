const User = require('../models/UserModel');
const fileService = require('../service/FileService');

// const { envConfig } = require('../config/constants');
// const node_env = process.env.NODE_ENV
// const { PREFIX, BUCKET } = envConfig(node_env)

exports.getFileData = async (req, res) => {
  const { id } = req.params
  // file 이름 필요
  try {
    const results = await fileService.getListObject(id)

    res.json({
      message: 'GET S3 LIST DATA SUCCESS',
      result: results
    })

  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
}

// 파일 업로드 테스트
// 해당 유저의 파일 데이터 업로드 
// 인터뷰에 있는 데이터를 어떻게 받아와야하나 ..
exports.putUploadData = async (req, res) => {
  const { id } = req.params
   try {
    const results = await fileService.uploadFile(id, req.files)
   
    res.json({
      message: 'UPLOAD DATA SUCCESS',
      result: results
    })

  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
}