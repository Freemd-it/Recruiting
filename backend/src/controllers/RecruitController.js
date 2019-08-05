const Recruit = require('../models/RecruitModel');
const Department = require('../models/DepartmentSchema');

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
    const { batch } = req.query;
    res.json(await Department.getTeamsByDateInfo(batch));
  } catch (err) {
    console.error(err);
    res.status(500).json({ err });
  }
}