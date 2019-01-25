module.exports = (app) => {
  const express = require('express');
  const router = express.Router();
  const TestCtrl = require('../../controllers/Test.ctrl');

  // 로그인
  router.post('/posts', TestCtrl.create);

  // // 목록 조회
  // router.get('/posts', TestCtrl.list);

  // // 개인 조회
  // router.get('/posts/:user_id', TestCtrl.read);

  // // 지원서 수정
  // router.put('/posts/:user_id', TestCtrl.update);
  
  // router.patch('/recruits/:user_id', UserCtrl.update);

  return router;
}