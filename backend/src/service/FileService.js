const aws = require('aws-sdk');
const fs = require('fs');
const moment = require('moment');
const multer = require('multer');
const multerS3 = require('multer-s3');

const { envConfig } = require('../../config/constants');
const { PREFIX, BUCKET } = envConfig(process.env.NODE_ENV)

aws.config.loadFromPath('./config/aws_config.json')

const s3 = new aws.S3();
const year = moment().format('YYYY')
const month = moment().format('MM')
const day = moment().format('DD')

const getListObject = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      s3.getObject({
        Bucket: `${BUCKET}/`, 
        Key: `${PREFIX}/${year}/${month}/${day}/${id}`
       }, (err, data) => {
        if (err) reject(err);
        resolve(data)
      })
    } catch (err) {
      console.log(err)
      reject(err)
    }
  })
}


const uploadFile = (id, files) => {
  files.forEach((fileObj, index) => {
    console.log(fileObj, index)
    return new Promise(async (resolve, reject) => {
      try {
        s3.upload({
          Bucket: `${BUCKET}/${PREFIX}/${year}/${month}/${day}/${id}`,
          Key: `${fileObj.originalname}`,
          ACL: 'public-read',
          ContentType: fileObj.mimetype,
          Body: fileObj.buffer
        }, (err, fileUpload) => {
          if (err) reject(err)
          console.log('fileUpload', fileUpload)
          resolve(fileUpload)
        })
          .on('httpUploadProgress', (evt) => {
            console.log('evt', evt)
          }).send((err, data) => {
            if (err) reject(err)
            console.log('localtion', data.Location)
            // resolve(data.Location)
          })
      } catch (err) {
        reject(err)
      }
    })
  })
}

module.exports = {
  getListObject,
  uploadFile,
}