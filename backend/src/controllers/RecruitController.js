const Recruit = require('../models/RecruitModel');

exports.getBatch = async (_, res) => {
  try {
    res.json({ batch: await Recruit.getBatch() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err });
  }
}

exports.getDepartmentData = async (req, res) => {
  try {
    res.json(await Recruit.getDepartmentData());
  } catch (err) {
    console.error(err);
    res.status(500).json({ err });
  }
}

exports.getInterviewTimes = async (req, res) => {
  try {
    res.json(await Recruit.getInterviewTimes());
  } catch (err) {
    console.error(err);
    res.status(500).json({ err });
  }
}

exports.getTeamsByDateInfo = async (req, res) => {
  try {
    res.json([
      {
        date: new Date('2019-09-14T09:00:00'),
        teams: [
          {
            departmentName: '경영지원본부',
            name: 'IT기획팀'
          },
          {
            departmentName: '브랜드마케팅본부',
            name: '디자인팀'
          },
          {
            departmentName: '해외의료사업본부',
            name: '공통'
          }
        ]
      },
      {
        date: new Date('2019-09-15T09:00:00'),
        teams: [
          {
            departmentName: '경영지원본부',
            name: '인사조직팀'
          },
          {
            departmentName: '경영지원본부',
            name: '통계팀'
          }
        ]
      }
    ]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err });
  }
}