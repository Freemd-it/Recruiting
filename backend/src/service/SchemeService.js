const DepartmentModel = require('../models/DepartmentModel');


const dummy = require('../../config/dbinit')

async function schemeInit () {
  try {
    await DepartmentModel.insertMany(dummy.department_metas);

    return true;
  } catch(e) {
    return false;
  }
}

module.exports = {
  schemeInit,
}