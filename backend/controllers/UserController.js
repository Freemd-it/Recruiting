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

  const {
    basic_info,
    academic_career,
    external_activities,
    special_info,
    question_info,
    interview_info
  } = req.body;

  let data = {
    basic_info,
    academic_career,
    external_activities,
    special_info,
    question_info,
    interview_info
  }
    
  const respond = (user) => {
    res.json({
      message: 'Update Success',
      result: user
    })
  }

  try {
    console.log(data)
    await User.findByIdAndUpdate(
      {_id : id},
      {$set: data},
      {new:true, upsert: true}
    ).then(respond)
  
  }catch(err){
    res.status(500).json({
      message: 'Update Fail',
      error : err
    })
  }
}


// 스토어 데이터 확인 
exports.readStoreData = async(req, res) => {
  const {id} = req.params;

  const respond = (user) => {
    const {clientStoreData} = user
    const value =  clientStoreData === null ? '': clientStoreData
    res.json({
      message: 'Read StoreData Success',
      result: value
    })
  }

  try{
    const user = await User.findOneById(id)
                  .then(respond)
   
    if(!user) {
      res.status(404).json({error: 'User not exist'});
    };

  }catch(err){
    res.status(500).json({
      message: 'Read StoreData Fail',
      error : err
    })
  }}

// 스토어 데이터 수정 
exports.updateStoreData = async(req, res) => {
  const {id} = req.params;
 
  const respond = (user) => {
    const {clientStoreData} = user
    const value =  !clientStoreData ? '': clientStoreData
    res.json({
      message: 'Update StoreData Success',
      result: value
    })
  }

  try {
    await User.findByIdAndUpdate(
      {_id : id},
      req.body,
      {new:true, upsert: true}
    ).then(respond)
   
   }catch(err){
     res.status(500).json({
       message: 'Update StoreData Fail',
       error : err
     })
   }
}


