const User = require('../models/UserModel');

// 리스트 조회
exports.list = async(req, res) => {
  try {
    const user = await User
    .find()
    .sort({_id: -1})
    .exec();

    res.json({result: user});
  }catch(err) {
    console.log(err)
    res.status(500).json({error: err});
  }
}

// 로그인 성공시 해당 스키마에 등록이 됨
exports.create = async(req, res) => {
  const { user_name, email, password } = req.body;
  // console.log(`넣은 로그인정보 name : ${name} ${email} ${password}`)

  // 받은 이름, 이메일, 패스워드를 만든 스키마에 저장
  const user = new User({
    
      // user_name,
      // email,
      // password
    
    basic_info:{
      user_name,
      email,
      password
    },
  });

  try {
    TODO: // auto_increment reset ?
    await user.save();
    res.json({result: user});

  } catch(err) {
    console.log(err)
    res.status(500).json({
      error : err
    })
  }
}

// 개인 조회
exports.read = async (req, res) => {
  const {id} = req.params;

  try{
    const user = await User.findOne({id}).exec();

    if(!user) {
      res.status(404).json({error: 'User not exist'});
    };

    res.json({
      result: user
    });

  }catch(err){
    res.status(500).json({
      error : err
    })
  }
}

// 지원서 수정 
// req.body
exports.update = async(req, res) => {
  const {id} = req.params;
  const {
    address,
    english_name,
    is_male,
    birth_date,
    phone,
    sns,

    academic_name,
    location,
    degree,
    major,
    entrance_date,
    graduation_date,

    external_type,
    organizer,
    start_date,
    end_date,
    turnaround_time,
    content,

    special_type,
    acquisition_date,
    language_ability,

    department
  } = req.body;

  const set = {
    'basic_info.address' : address,
    'basic_info.english_name' : english_name,
    'basic_info.is_male' : is_male,
    'basic_info.birth_date' : birth_date,
    'basic_info.phone' : phone,
    'basic_info.sns' : sns,

    'academic_career.academic_name' : academic_name,
    'academic_career.location' : location,
    'academic_career.degree' : degree,
    'academic_career.major' : major,
    'academic_career.entrance_date' : entrance_date,
    'academic_career.graduation_date' : graduation_date,

    // TODO: 몇번째 인덱스 인지, 그리고 해당 값이 무엇인지 알아야 변경 가능함 
    // 'external_activities.index.value 
    'external_activities.0.external_type': external_type,
    'external_activities.0.organizer': organizer,
    'external_activities.0.start_date': start_date,
    'external_activities.0.end_date': end_date,
    'external_activities.0.turnaround_time': turnaround_time,
    'external_activities.0.content': content,

    'special_info.0.special_type': special_type,
    'special_info.0.acquisition_date': acquisition_date,
    'special_info.0.language_ability': language_ability,
    'special_info.0.content': content,

    'apply_info.department' : department,
    // 'apply_info.secondary_department' : secondary_department,
    // 'apply_info.team' : team,
    // 'apply_info.secondary_team' : secondary_team,
    // 'apply_info.can_moved' : can_moved,
    // 'apply_info.can_multiple_interview' : can_multiple_interview,
    // 'apply_info.secondary_team' : secondary_team,


  }

  try {
    const user = await User.findOneAndUpdate({id}, {
      $set: set,
    },{
      // upsert: true, // 이 값을 넣어주면 데이터가 존재하지 않으면 새로 만들어줍니다
      new: true // 이 값을 넣어줘야 반환하는 값이 업데이트된 데이터입니다.

    }).exec();

  if(!user) {
    res.status(404).json({error: 'User not exist'});
  };

  res.json({
    result: user
  });
  }catch(err){
    console.log(err)
    res.status(500).json({
      error : err
    })
  }
}



