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
            type : row[1].type === 'text' ? 101 : 102,
            question : row[1].question,
            text : row[1].text,
            questionType : 'common',
          }) 
        })
      } else if (key === 'department') {

        var results = Object.entries(value)
        .filter(d => d[0] !== 'files')
        .reduce((acc, curr) => {
          const [departmentName, teamName] = curr[0].split('_');
          const questions = Object.entries(curr[1])
            .sort((a, b) => +a - +b)
            .map(d => d[1])
            .map((d, index) => ({...d, 
              departmentName, teamName : index === 0 ? '공통' : teamName, type : d.type === 'text' ? 101 : 102}));
          return acc.concat(questions);
        }, []);

        for(index in results) {
          questionList.push(results[index])
        }
      }
    }

  try{
    // console.log('batch',batch)
    // console.log('basicInfo',basicInfo)
    // console.log('academicCareer',academicCareer)
    // console.log('externalActivities',externalActivities)
    // console.log('specialinfo',specialInfo)
    // console.log('questionInfo',questionInfo)
    // console.log('interviewInfo',interviewInfo)

    const user = await User.findOneById(id);
    // console.log('user.basicInfo',user.basicInfo)
    setQuestionList(questionInfo)
    const data = {
      batch,
      basicInfo : {
        ...basicInfo,
        password : user.basicInfo.password,
        departments : basicInfo.departments,
      },
      academicCareer : {...academicCareer},
      externalActivities : externalActivities,
      specialInfo: specialInfo,
      questionInfo : questionList,
      interviewInfo: setInterviewList(interviewInfo),

      // supportStatus: 201,
      evaluation: '미평가',
    };
    // console.log('data', data)

    await User.findByIdAndUpdate(
      {_id : id},
      { $set: JSON.parse(JSON.stringify(data)) },
      {new:true, upsert: true});

    console.log('data', data)
   
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