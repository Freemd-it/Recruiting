const User = require('../models/UserModel');
const jsonParser = require('parse-json')
const _ = require('lodash')

exports.list = async(req, res) => {
  try {
   const user = await User
   .find({})
   .sort({_id: -1})
   .exec()

   res.json({result:user})
  } catch(err) {
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

exports.update = async (req, res) => {
  const { id } = req.params;
  const { 
     batch, 
     basicInfo,
     academicCareer, 
     externalActivities, 
     specialInfo, 
     questionInfo, 
     interviewInfo,

    } = jsonParser(req.body.body);

    const obtainQuestionList = questionInfo => {
      return Object.entries(questionInfo).filter(d => d[0] !== 'fileKeys').reduce((acc, curr) => {
        const [key, value] = curr;
        const questionList = obtainQuestionListByDept(key, value);
        return acc.concat(questionList);
      }, []);
    }
    const obtainInterviewList = (interviewInfo) => _.forEach(interviewInfo, (v, k) => makeInterviewObject(v,k))

    const obtainQuestionListByDept = (key, value) => {
      if (key === 'common') {
        return Object.entries(value).map((row, index) => {
          return {
            batch,
            departmentName : '공통',
            teamName : '공통',
            type : row[1].type === 'text' ? 101 : 102,
            question : row[1].question,
            text : row[1].text,
            questionType : 'common',
            index
          };
        });

      } else if (key === 'department') {
        return Object.entries(value)
          .filter(d => d[0] !== 'files')
          .reduce((acc, curr) => {
            const [departmentName, teamName] = curr[0].split('_');
            const questions = Object.entries(curr[1])
              .sort((a, b) => +a[0] - +b[0])
              .map(d => d[1])
              .map((d, index) => ({...d, 
                batch,
                departmentName,
                teamName, 
                type : d.type === 'text' ? 101 : 102,
                index
            }));
            return acc.concat(questions);
        }, []);
      }
    }

  try {
    const user = await User.findOneById(id);
    const questionList = obtainQuestionList(questionInfo);
    req.files.map((d, i) => ({
      fileLink: d.location,
      path: questionInfo.fileKeys[i],
      oriName: d.originalname,
      key: d.key
    })).forEach(file => {
      const { fileLink, path, oriName, key } = file;
      const [department, teamAndIndex] = path.split('_');
      const [team, index] = teamAndIndex.split('.');
      const fileIndex = questionList.findIndex(d => {
        return d.departmentName === department 
          && d.teamName === team 
          && d.index === +index;
      });
      questionList[fileIndex].file = {
        url: fileLink, oriName, key
      };
    });

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
      interviewInfo: obtainInterviewList(interviewInfo),
      supportStatus : 201,
      evaluation: '미평가',
      registedDate : Date.now()
    };

    await User.findByIdAndUpdate(
      {_id : id},
      { $set: JSON.parse(JSON.stringify(data)) },
      { new:true, upsert: true });

    res.status(200).json({
      message : 'UPDATE SUCCESS',
      result: data
    })

  } catch (err) {
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
