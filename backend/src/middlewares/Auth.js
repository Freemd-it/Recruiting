const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
  const token = req.headers['x-access-token'] || req.query.token;
  const secret = req.app.get('jwt-secret');

  if(!token) {
    return res.status(403).json({
      success : false,
      message : 'Not Loggin In'
    })
  }

  const tokenDecoding = new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if(err) reject (err);
      resolve(decoded)
    });
  });
  
  try{
    await tokenDecoding.then((decoded) => {
      req.decoded = decoded
      next()
    })
  }catch(err){
    res.status(403).json({
      success: false,
      message: err.message
  })
  } 
}

module.exports = authMiddleware
