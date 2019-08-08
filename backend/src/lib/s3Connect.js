const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')

aws.config.loadFromPath('./config/aws_config.json')

const S3 = new aws.S3()

module.exports = multer({
  storage: multerS3({
    s3 : S3,
    bucket: 'freemed.recruiting',
    acl: 'public-read',
    key(req, file, cb) {
      console.log(file);
      cb(null, Date.now() + '.' + file.originalname.split('.').pop())
    },
  }),
})