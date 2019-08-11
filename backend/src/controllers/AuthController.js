const jwt = require('jsonwebtoken');

const AuthService = require('service/AuthService');
const User = require('models/UserModel');


exports.login = async (req, res) => {
  const { userName, email, password } = req.body;
  const secret = req.app.get('jwt-secret');

  try {
    let user = await User.findOneUserInfo(userName, email);

    if (!user) {
      const isExistEmail = await User.findOneByEmail(email);

      if (isExistEmail) {
        res.json({
          message: 'exist email',
          results: false,
          isExistEmail: true,
        });
        return;
      }
      user = await User.create(userName, email, password);
    }

    const token = await AuthService.makeToken(user, secret, password);
    const response = [token, user._id, user.supportStatus];
    
    res.json({ message: 'login Success', results: response })

  } catch(err) {
    console.log(err)
    res.status(500).json({ message: err.message })
  }
};


exports.check = (req, res) => {
  res.json({ success: true, info: req.decoded })
}
