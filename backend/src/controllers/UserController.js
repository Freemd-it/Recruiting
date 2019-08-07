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
  const { batch, basic_info, academic_career, external_activities, special_info, question_info, interview_info} = jsonParser(req.body.body);

  try{
    console.log('body:', req.body.body)
    // const user = await User.findOneById(id);

   
   
    // console.log('data:', data)

    res.status(200).json({
      message : 'SUCCESS'
    })


  }catch(err){
    console.log(err)
    res.status(500).json({
      message : err.message
    })
  }


}


exports.update = async (req, res) => {
  console.log(req.body);
  const { id } = req.params;
  const { files } = req;
  const { batch, basic_info, academic_career, external_activities, special_info, question_info, interview_info} = jsonParser(req.body.body);
  const questionList = []
  
  const setQuestionList = (question_info) => _.forEach(question_info, (v, k) => makeQuestionObject(v,k))
  const setInterviewList = (interview_info) => _.forEach(interview_info, (v, k) => makeInterviewObject(v,k))

  const makeQuestionObject = (value, key) => {
    if(key === 'common') {
      _.forEach(value, (v, k) => {
        questionList.push({
          classify: 102,
          department: '900',
          team: '00',
          question : v.question,
          content: v.text,
          type: v.type,
          batch: 20,
          portfolios: [],
          registedDate: moment().format('YYYY-MM-DD HH:mm:ss')
        })
      })
    } else if (key == 'department' ) {
        let cnt = 0
        _.forEach(value, (_v, _k) => {
          if(_k !== 'files') {
            _.forEach(_v, (__v, __k) => {
              questionList.push({
                classify: 102,
                department: _k.slice(0,3),
                team: _k.slice(3,5),
                question : __v.question,
                content: __v.text,
                type: __v.type,
                select: __v.select,
                batch: 20,
                portfolios: __v.type === 'file' ? files[cnt] : [],
                registedDate: moment().format('YYYY-MM-DD HH:mm:ss')
              })
              __v.type === 'file' && cnt++
            })
            
          }
        })
      }
  }
  
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
    
    setQuestionList(question_info)
   
    const data = {
      batch,
      basic_info: {
        ...basic_info,
        password: user.basic_info.password,
        department: String(basic_info.department),
        team: String(basic_info.team),
        secondary_department: String(basic_info.secondary_department),
        secondary_team: String(basic_info.secondary_team),
        medical_field: String(basic_info.medical_field),
        secondary_medical_field: String(basic_info.secondary_medical_field),
      },
      academic_career: {...academic_career},
      external_activities: external_activities,
      special_info: special_info,
      question_info: questionList,
      interview_info: setInterviewList(interview_info),
      support_status: 201,
      evaluation: '미평가',
    };

    await User.findByIdAndUpdate(
      {_id : id},
      { $set: JSON.parse(JSON.stringify(data)) },
      {new:true, upsert: true});
    
    res.json({
      message: 'Update Success',
      result: data
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