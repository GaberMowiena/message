// npm packages
const express = require('express');
const bcrypt = require('bcryptjs');
const knex = require('knex');

const axios = require('axios');
require('dotenv').config();

// app imports
const github = require('../handlers/auth');

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

router.route('/github/callback').get((req, res) => {
  const uri = `https://github.com/login/oauth/access_token?client_id=${
    process.env.CLIENT_ID
  }&client_secret=${process.env.CLIENT_SECRET}&code=${req.query.code}`;
  axios
    .post(uri, {}, { headers: { Accept: 'application/json' } })
    .then(response => {
      const token = response.data['access_token'];
      axios
        .get(`https://api.github.com/user?access_token=${token}`)
        .then(info => github.createUser(info.data, db))
        .then(data => data);
    })
    .catch(err => console.log('err', err));
});

module.exports = router;
