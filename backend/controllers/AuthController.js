const jwt = require('jsonwebtoken');
const AuthService = require('../service/AuthService');
const User = require('../models/UserModel');

// POST: baseUrl/api/auth/login
// body : {user_name, email, password}
exports.login = async (req, res) => {
  const {user_name, email, password} = req.body;
  const secret = req.app.get('jwt-secret');

  try {
    // 이메일을 찾고 체크를 한뒤 응답
    let user = await User.findOneUserInfo(user_name, email);

    if (!user) {
      user = await User.create(user_name, email, password);
    }

    const token = await AuthService.makeToken(user, secret, password);

    const response = [token, user._id, user.support_status];
    res.json({
      message: 'login Success',
      results: response,
    })

  } catch(err) {
    console.log(err);
    res.status(500).json({
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
