const { request, response } = require('express');
const { find } = require('../helpers/company.js');

const usersByCompanyGet = async (req = request, res = response) => {
  try {
    const context = {};
    
    context.company = req.query.company;
    console.log(`\nQueried by company`)
    console.log(`Current authenticated user = "${req.userAuth}"`)
    console.log(req.query)

    const rows = await find(context);
    console.log(`${rows.length || 0} records found`);

    if (req.query.company) {
      if (rows.length) {
        res.status(200).json(rows);
      } else {
        res.status(404).end();
      }
    } else {
      res.status(200).json(rows);
    }
  } catch (err) {
    console.log(err);
    return err;
  }
}

module.exports = {
  usersByCompanyGet
};