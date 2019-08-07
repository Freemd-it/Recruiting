const User = require('../models/UserModel');
const jsonParser = require('parse-json')
const moment = require('moment')
const _ = require('lodash')

exports.list = async(req, res) => {
  try {
   const user = await User
   .find({})
   .sort({_id: -1})
   .exec()

   res.json({result:user})
  }catch(err) {
    res.status(500).json({err})
  }
}

exports.read = async (req, res) => {
  const {id} = req.params;

  try {
    const user = await User.findOneById(id)

    if(!user) {
      res.status(404).json({error: 'User not exist'});
    };

    res.json({
      message: 'Read Success',
      result: user
    });

  } catch(err) {
    res.status(500).json({
      message: 'Read Fail',
      error : err
    })
  }
}


exports.n_update = async(req, res) => {
  const { id } = req.params;
  const { files } = req;
  const { 
     batch, 
     basicInfo,
     academicCareer, 
     externalActivities, 
     specialInfo, 
     questionInfo, 
     interviewInfo
    } = jsonParser(req.body.body);
    const questionList = []

    const setQuestionList = (questionInfo) => _.forEach(questionInfo, (v, k) => makeQuestionObject(v,k))
    const setInterviewList = (interviewInfo) => _.forEach(interviewInfo, (v, k) => makeInterviewObject(v,k))

    const makeQuestionObject = (value, key) => {
      if (key === 'common') {
        Object.entries(value).map((row, index) => {
          // console.log('row', row)
          questionList.push({
            batch : batch,
            departmentName : '공통',
            teamName : '공통',
            question : row[1].question,
            type : row[1].type === 'text' ? 101 : 102,
            text : row[1].text
          }) 
        })
      } else if (key === 'department') {
        let cnt = 0;
        Object.entries(value).map((row, index) => {
          if(index !== 'files') {
            Object.entries(row).map((_row, _index) => {
              // console.log('_row', _row)
                Object.entries(_row).map((__row, __index) => {
                 console.log('__row!!!!!', __row[1])
                 console.log('__index!!!!!!', __index)
                })
            })
          }

        })
      }
    }





  try{
    // console.log('batch',batch)
    // console.log('basicInfo',basicInfo)
    // console.log('academicCareer',academicCareer)
    // console.log('externalActivities',externalActivities)
    // console.log('specialinfo',specialInfo)
    console.log('questionInfo',questionInfo)
    // console.log('interviewInfo',interviewInfo)

    const user = await User.findOneById(id);
    // console.log('user.basicInfo',user.basicInfo)
    setQuestionList(questionInfo)
    
    const data = {
      batch,
      basicInfo : {
        ...user.basicInfo,
        password : user.basicInfo.password,
        departments : basicInfo.departments,
        academicCareer : {...academicCareer},
        externalActivities : externalActivities,
        specialinfo: specialInfo,
        questionInfo : questionList
      }
    }

    await User.findByIdAndUpdate(
      {_id : id},
      { $set: JSON.parse(JSON.stringify(data)) },
      {new:true, upsert: true});
      // console.log('questionList',questionList)

   
    res.status(200).json({
      message : 'UPDATE SUCCESS',
      result: data
    })


  }catch(err){
    console.log(err)
    res.status(500).json({
      message : err.message
    })
  }


}

// 스토어 데이터 확인 
exports.readStoreData = async(req, res) => {
  const { id } = req.params;
  
  try{
    const user = await User.findOneById(id);
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
  const { id } = req.params;
 
  const respond = (user) => {
    const {clientStoreData} = user
    const value =  !clientStoreData  ? {}: clientStoreData

    res.json({
      message: 'Update StoreData Success',
      result: value
    })
  }

  try {
    await User.findByIdAndUpdate({_id : id}, req.body, { new: true, upsert: true }).then(respond)

   } catch (err) {
     res.status(500).json({
       message: 'Update StoreData Fail',
       error : err
     })
   }
}

const makeInterviewObject = ({interview_date, interview_week, interview_time}) => {
  return {
    interview_date,
    interview_week,
    interview_time,
  }
}