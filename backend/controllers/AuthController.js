const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');

// POST: baseUrl/api/auth/register
// body : {user_name, email, password}
exports.register = async (req, res) => {
  
  let newUser = 0

  const {user_name, email, password} = req.body;

  // 가입자 생성
  // TODO: 중복여부 체크 해야함.
  const create = (user) => {
    console.log(user)
    if(user) {
      throw new Error('User exists')
    } else {
      return User.create(user_name, email, password)
    }
  }

  // respond to the client
  const respond = (user) => {
    res.json({
        message: 'register success',
        result : user
        // admin: isAdmin ? true : false
    })
  }

  try {
    await User.findOneByEmail(email)
    .then(create)
    .then(respond)
  }catch(err){
    res.status(409).json({message: err.message});
  }
}








// POST: baseUrl/api/auth/login
// body : {user_name, email, password}

exports.login = async (req, res) => {
  const {user_name, password} = req.body;
  const secret = req.app.get('jwt-secret');

  const check = (user) => {
    const user_info = user.basic_info

    if(!user_info){
      throw Error ('Login  : User not exists');
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
           resovle([token, user._id])
         });
        });
        return pw
      }else {
        throw new Error('Login Failed')
      }
    }
  }

  const respond = (token) => {
    console.log(token)
    res.json({
      message: 'Login Success',
      results: token,
    })
  }

  try {
  
    await User.findOneByUsername(user_name)

    // await User.findOneById(user._id)
    .then(check)
    .then(respond)

  } catch(err) {
    // console.log(err)
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
