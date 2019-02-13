const crypto = require('crypto')
const { envConfig } = require('../../config/constants');
const { JWT_SECRET } = envConfig(process.env.NODE_ENV)

module.exports = (password) => {
  return crypto.createHmac('sha1', JWT_SECRET).update(password).digest('base64');
}