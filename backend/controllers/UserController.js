const User = require('../models/UserModel');

exports.list = async(req, res) => {
  console.log(req.decoded)
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
  // console.log(req.decoded)
  const {id} = req.params;

  try{
    // const user = await User.findOne({_id:id}).exec();
    const user = await User.findOneById(id)
    console.log(user)
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
  console.log(`=========update start=============`)
  const {id} = req.params;
  const {
    basic_info,
    academic_career,
    external_activities,
    special_info,
    question_info,
    interview_info
      } = req.body;
  
  let basic_set= {basic_info};
  let academic_set = {academic_career};
  let external_set = {external_activities};
  let special_set = {special_info};
  let question_set = {question_info};
  let interview_set = {interview_info};


  const respond = (user) => {
    res.json({
      message: 'Update Success',
      result: user
    })
  }

  try {
    console.log(interview_set)
    await User.findOneAndUpdate(
      {_id:id}, 
      {$set: basic_set},
      {new:true}).exec()

    await User.findOneAndUpdate(
      {_id:id}, 
      {$set: external_set},
      {new:true}).exec()

    await User.findOneAndUpdate(
      {_id:id}, 
      {$set: academic_set},
      {new:true}).exec()

    await User.findOneAndUpdate(
      {_id:id}, 
      {$set: special_set},
      {new:true}).exec()

    await User.findOneAndUpdate(
      {_id:id}, 
      {$set: question_set},
      {new:true}).exec()


    await User.findOneAndUpdate(
      {_id:id}, 
      {$set: interview_set},
      {new:true}).exec()
      
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