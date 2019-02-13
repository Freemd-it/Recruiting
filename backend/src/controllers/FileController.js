const User = require('../models/UserModel');
const fileService = require('../service/FileService');

// const { envConfig } = require('../config/constants');
// const node_env = process.env.NODE_ENV
// const { PREFIX, BUCKET } = envConfig(node_env)

exports.getFileData = async (req, res) => {
  const { id } = req.params
  
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