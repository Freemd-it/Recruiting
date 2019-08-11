const DepartmentModel = require('../models/DepartmentSchema');
const UserModel = require('../models/Scheme');


const dummy = require('../../config/dbinit')

async function schemeInit () {
  try {
    await DepartmentModel.insertMany(dummy.department_metas);
    // await UserModel.insertMany(dummy.users);

    return true;
  } catch(e) {
    console.log(e)
    return false;
  }
}

module.exports = {
  schemeInit,
}
