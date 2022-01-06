const { request, response } = require('express');
const { find } = require('../helpers/company.js');
const User = require('../models/user.js');
const bcryptjs = require('bcryptjs');

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
        res.status(404).json({
          msg: `No users found. Company code: ${context.company}`
        });
      }
    } else {
      res.status(200).json(rows);
    }
  } catch (err) {
    console.log(err);
    return err;
  }
}

const createUser = async (req = request, res = response) => {

  const { email, password } = req.body;
  const user = new User({ email, password });

  // Verificar si es usuario de ludycom
  const domain = email.substring(email.length - 11);
  if (domain !== "ludycom.com") {
    res.status(400).json({
      msg: `${email} - email not valid. Email must have a valid domain from ludycom`
    })
    return
  }

  // Validar si ya existe el usuario
  const userExists = await User.findOne({ email: email })
  console.log(userExists);
  if (userExists) {
    res.status(400).json({
      msg: `User ${email} already exists`
    })
    return
  }  

  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt)

  // Guardar en BD
  await user.save();

  res.json({
    msg: "post API - controlador",
    user
  })

}

module.exports = {
  usersByCompanyGet,
  createUser
};