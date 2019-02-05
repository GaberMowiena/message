// npm packages
const { Validator } = require('jsonschema');
// const Sequelize = require('sequelize');

// app imports
// const User = require('../models/User');
const register = require('../schemas/register.json');
const validateSchema = require('../helper/validateSchema');

//global constants
const v = new Validator();

const createUser = async (req, res, db, bcrypt) => {
  try {
    const { name, email, password } = req.body;

    const validSchema = validateSchema(v.validate(req.body, register), 'users');
    if (validSchema !== 'OK') {
      return res.status(400).json('Incorrect form submission');
    }

    const SALT_ROUNDS = 10;
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    db.transaction(trx => {
      trx
        .insert({
          name,
          email,
          password: hashedPassword
        })
        .into('users')
        .returning('*')
        .then(user => {
          return res.json(user[0]);
        })
        .then(trx.commit)
        .catch(trx.rollback);
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createUser
};
