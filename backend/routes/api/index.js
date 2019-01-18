module.exports = function(app){//함수로 만들어 객체 app을 전달받음
  const express = require('express');
  const router = express.Router();
  const postCtrl = require('../../controllers/Post.ctrl');

  // 리스트
  router.get('/posts', postCtrl.list);

  // 조회
  router.get('/posts/:id', postCtrl.read);

  // 쓰기
  router.post('/posts', postCtrl.write);

  // 수정 
  router.put('/posts/:id', postCtrl.update);

  return router;




  // const express = require('express');
  // const router = express.Router();
  
  // // 전체 목록 조회
  // router.get('/posts', function(req,res){
  //   res.end();
  // });

  // // 상세 조회
  // router.get('/posts/:id', function(req, res){
  //   res.render('index', { title: 'posts/:id' });
  //   console.log(req.params);
  // });

  // // 생성
  // router.post('/posts', function (req, res){
  //   res.end();
  // });

  // // 수정
  // router.put('/posts/:id', function(req, res){
  //   res.end();
  // });


	// return router;	//라우터를 리턴
};