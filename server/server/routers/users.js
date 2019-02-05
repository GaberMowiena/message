// npm packages
const express = require('express');
const bcrypt = require('bcryptjs');
const knex = require('knex');

// app imports
const user = require('../handlers/user');
const signin = require('../auth/signin');

const opt = {
  client: 'pg',
  connection: {
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB
  }
};

const db = knex(opt);
// global constants
const router = new express.Router();

router.route('/register').post((req, res) => {
  user.createUser(req, res, db, bcrypt);
});

router
  .route('/signin')
  .post((req, res) => signin.signinAuthentication(req, res, db, bcrypt));

module.exports = router;
