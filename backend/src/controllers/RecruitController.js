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