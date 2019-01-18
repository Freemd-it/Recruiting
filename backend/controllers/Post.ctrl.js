const Post = require('../models/PostModel');


// 리스트 조회
exports.list = async(req, res) => {
  try {
    const posts = await Post
    .find()
    .sort({_id: -1})
    .exec();

    res.json(posts);
  }catch(e) {
    res.status(500).json({error: err});
  }
}


// 조회 
exports.read = async(req, res) => {
  const {id} = req.params;

  try {
    const post = await Post.findById(id).exec();
    console.log(req.body);

    if(!post) {
      res.status(404).json({error: 'Post not exist'});
    };

    res.json(post);

  } catch(err){
    res.status(500).json({error: err});
  };
};


// 쓰기 
exports.write = async(req, res) => {
  const {title, body, tags } = req.body
  
  const post = new Post({
    title, body, tags
  });

  try {
    await post.save(); // 디비 등록
    res.json(post);

  }catch (e){
    res.status(500).json({error: err});
  }
}

// 수정
exports.update = async (req, res) => {
  const {id} = req.params;

  try {
   const post =  await Post.findByIdAndUpdate(id, req.body, {
      new: true
    }).exec();

    if(!post) {
      res.status(404).json({error: 'Post not exist'});
    };
    res.json(post);

  }catch(e){
    res.status(500).json({
      error: err
    })
  }
}