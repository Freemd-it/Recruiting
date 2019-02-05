const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');


// POST: baseUrl/api/auth/login
// body : {user_name, email, password}
exports.login = async (req, res) => {
  const {user_name, email, password} = req.body;
  const secret = req.app.get('jwt-secret');

  // 체크 
  const check = (user) => {
    const user_info = user

    if(!user_info){
      return User.create(user_name, email, password)
      .then(check)
      .then(ResgisterRespond)
    }else {
      if(user.verify(password)) {
        const pw = new Promise((resovle, reject) => {
          jwt.sign({
            _id : user._id,
            user_name: user_info.user_name,
            email: user_info.email,
         },secret,{
           expiresIn: '7d',
           issuer:'Freemed.com',
           subject:'userInfo',
         }, (err, token) => {
           if(err) reject(err);
           resovle([token, user._id, user.support_status])
         });
        });
        return pw
      }else {
        throw new Error('Login Failed')
      }
    }
  }

  const respond = (token) => {
    res.json({
      message: 'Login Success',
      results: token,
    })
  }

  const ResgisterRespond = (token) => {
    res.json({
      message: 'Register Success',
      results: token,
    })
  }
 

  try {
  
    // 이메일을 찾고 체크를 한뒤 응답 
    await User.findOneUserInfo(user_name, email)
    // await User.findOneByEmail(email)
    .then(check)
    .then(respond)

  } catch(err) {
    console.log(err)
    res.status(403).json({
      message: err.message
    })
  }
};



// GET /api/auth/check
exports.check = (req, res) => {
  res.json({
    success: true,
    info: req.decoded
  })
}
