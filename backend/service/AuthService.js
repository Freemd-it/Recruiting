const jwt = require('jsonwebtoken');

module.exports = {
  makeToken: (user, secret, password) => {
    if (user.verify(password)) {
      return new Promise((resovle, reject) => {
        jwt.sign({
          _id : user._id,
          user_name: user.user_name,
          email: user.email,
        }, secret, {
          expiresIn: '7d',
          issuer:'Freemed.com',
          subject:'userInfo',
        }, (err, token) => {
          if (err) {
            reject(err);
          }
          resovle(token);
        });
      });
    } else {
      throw new Error('Login Failed');
    }
  }
}
