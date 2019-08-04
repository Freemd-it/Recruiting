const DepartmentModel = require('../models/DepartmentModel');

exports.getDepartmentList = async (req, res) => {
  try {
    const result = await DepartmentModel.getDepartmentInfoList();
    console.log('result',result)
    res.status(200).json({
      message : "success",
      result : result
    })

  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: err.message
    })
  }
}