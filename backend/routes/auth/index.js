module.exports = (app) => {
  const express = require('express');
  const router = express.Router();
  const AuthCtrl = require('../../middlewares/Auth.ctrl');

  // 로그인
  router.post('/login', AuthCtrl.create);
  

  return router;
}