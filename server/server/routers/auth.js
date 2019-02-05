// npm packages
const express = require('express');
const bcrypt = require('bcryptjs');
const knex = require('knex');

// app imports
const { passportGithub } = require('../auth/passport');

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

// app.get(
//   '/auth/github',
passportGithub.authenticate('github', { scope: ['user:email'] }),
  function(req, res) {
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called.
    res.send('hi');
  };
// );

router
  .route('/github')
  .get(
    passportGithub.authenticate('github', { scope: ['user:email'] }),
    (req, res) => {
      res.send('hi');
    }
  );

router
  .route('/github/callback')
  .get(
    passportGithub.authenticate('github', { failureRedirect: '/login' }),
    (req, res) => {
      res.redirect('/');
    }
  );

module.exports = router;
