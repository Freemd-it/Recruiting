module.exports = (app) => {
  const express = require('express');
  const router = express.Router();
  const UserCtrl = require('../../controllers/User.ctrl');

  // 로그인
  router.post('/login', UserCtrl.create);

  // 목록 조회
  router.get('/recruits', UserCtrl.list);

  // 개인 조회
  router.get('/recruits/:user_id', UserCtrl.read);

  // 지원서 수정
  router.put('/recruits/:user_id', UserCtrl.update);
  
  // router.patch('/recruits/:user_id', UserCtrl.update);

  return router;
}