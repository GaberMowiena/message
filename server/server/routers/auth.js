// npm packages
const express = require('express');
const bcrypt = require('bcryptjs');
const knex = require('knex');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
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

// app.get(
// //   '/auth/github',
// passportGithub.authenticate('github', { scope: ['user:email'] }),
//   function(req, res) {
//     // The request will be redirected to GitHub for authentication, so this
//     // function will not be called.
//     res.send('hi');
//   };
// // );

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: 'http://127.0.0.1:3000/auth/github/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      github.createUser(profile._json, db);
      return done(null, profile);
    }
  )
);

router
  .route('/github')
  .get(
    passport.authenticate('github', { scope: ['user:email'] }),
    (req, res) => {
      res.send('hi');
    }
  );

router
  .route('/github/callback')
  .get(
    passport.authenticate('github', { failureRedirect: '/login' }),
    (req, res) => {
      res.redirect('localhost:3000/users/all');
    }
  );

module.exports = router;
