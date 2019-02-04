const User = require('../models/UserModel');

exports.list = async(req, res) => {
  try {
   const user = await User.find({})
   .sort({_id: -1})
   .exec()
   res.json({result:user})
  }catch(err) {
    res.status(500).json({err})
  }
}

exports.read = async (req, res) => {
  const {id} = req.params;

  try{

    const user = await User.findOneById(id)
    if(!user) {
      res.status(404).json({error: 'User not exist'});
    };

    res.json({
      message: 'Read Success',
      result: user
    });

  }catch(err){
    res.status(500).json({
      message: 'Read Fail',
      error : err
    })
  }
}

exports.update = async (req, res) => {
  const {id} = req.params;

  const respond = (user) => {
    res.json({
      message: 'Update Success',
      result: user
    })
  }

  try {

    await User.findByIdAndUpdate({_id : id}, 
      req.body, 
      {new: true})
    .then(respond);
  
  }catch(err){
    console.log(err)
    res.status(500).json({
      message: 'Update Fail',
      error : err
    })
  }

console.log(`=========update end=============`)

}