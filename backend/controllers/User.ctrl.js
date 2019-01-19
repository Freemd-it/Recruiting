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
    res.status(500).json({
      error : err
    })
  }
}

// 개인 조회
exports.read = async (req, res) => {
  const {user_id} = req.params;

  try{
    const user = await User.findOne({user_id}).exec();

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
  const {user_id} = req.params;
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
    graduation_date

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

  }

  try {
    // {user_id}로 하지 않으면, 해당 params로 변환이 안됨
    const user = await User.findOneAndUpdate({user_id}, {
      $set: set
    },{
      new: true,
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

// 로그인 -> 이름, 이메일, 비밀번호 존재하는 경우 -> update 



