const User = require('../models/UserModel');
const jsonParser = require('parse-json')
const moment = require('moment')
const _ = require('lodash')

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
  const { id } = req.params;
  const { basic_info, academic_career, external_activities, special_info, question_info, interview_info} = jsonParser(req.body.body);
  
  try {
    let user = await User.findOneById(id);
    if (user.support_status !== 200) {
      res.json({
        message: 'already submitted',
        result: false,
        isAlreadySubmitted: true
      });
      return;
    }

    const data = {
      basic_info: {...basic_info, password: user.basic_info.password},
      academic_career: {...academic_career},
      external_activities: {...external_activities},
      special_info: {...special_info},
      question_info: question_list(question_info),
      interview_info: interview_list(interview_info),
      support_status: 201
    };

    await User.findByIdAndUpdate({_id : id}, { $set: JSON.parse(JSON.stringify(data)) }, {new:true, upsert: true});
    
    res.json({
      message: 'Update Success',
      result: user
    })

  } catch(err){
    console.log(err)
    res.status(500).json({
      message: 'Update Fail',
      error : err
    })
  }
}


// 스토어 데이터 확인 
exports.readStoreData = async(req, res) => {
  const { id } = req.params;
  
  try{
    const user = await User.findOneById(id);
    console.log('user',user)
    if(!user) {
      res.status(404).json({error: 'User not exist'});
      return;
    };

    const { clientStoreData } = user;
    const value = !clientStoreData ? {}: clientStoreData;

    res.json({
      message: 'Read StoreData Success',
      result: value
    })

  } catch (err) {
    res.status(500).json({
      message: 'Read StoreData Fail',
      error : err
    })
  }};

// 스토어 데이터 수정 
exports.updateStoreData = async(req, res) => {
  const {id} = req.params;
 
  const respond = (user) => {
    const {clientStoreData} = user
    const value =  !clientStoreData  ? {}: clientStoreData

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



function question_list (question_info) {
  return _.map(question_info, (v, k) => {
    return makeQuestionObject(v,k)
  })
}
function interview_list (interview_info) {
  return _.map(interview_info, (v, k) => {
    return makeInterviewObject(v,k)
  })
}

makeQuestionObject = (value, key) => {
  return {
    classify: key === 'department' ? 102 : 103,
    department: key === 'common' ? 900 : 102,
    team: key === 'common'? 00 : 01,
    question : key === 'common'?value[0] : '',
    content_type: 'text',
    batch: 20,
    portfolios: key === 'common'? '': value.files,
    registedDate: moment().format('YYYY-MM-DD HH:mm:ss')
  }
}

makeInterviewObject = ({interview_date, interview_week, interview_time}) => {
  return {
    interview_date,
    interview_week,
    // interview_time: JSON.parse(JSON.stringify(interview_time)),
    interview_time,
  }
}