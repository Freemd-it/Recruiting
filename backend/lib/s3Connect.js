const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const moment = require('moment');


aws.config.loadFromPath('./config/aws_config.json')
const { envConfig } = require('../config/constants');
const node_env = process.env.NODE_ENV
const { PREFIX, BUCKET } = envConfig(node_env)

const S3 = new aws.S3()
const year = moment().format('YYYY')
const month = moment().format('MM')
const day = moment().format('DD')

module.exports = multer({
  storage: multerS3({
    s3 : S3,
    // bucket : 'freemed.develop',
    bucket: `${BUCKET}/${PREFIX}/${year}/${month}/${day}`,
    acl: 'public-read',
    key(req, file, cb) {
      // console.log('req', req)
      // console.log('fie', file)
      cb(null, Date.now() + '.' + file.originalname.split('.').pop())
    },
  }),
})
