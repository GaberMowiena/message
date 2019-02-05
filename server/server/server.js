// npm packages
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
require('dotenv').config();
const knex = require('knex');

// app imports
const usersRouter = require('./routers/users');
const authRouter = require('./routers/auth');

// global constants
const app = express();

// passport.serializeUser(function(user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function(obj, done) {
//   done(null, obj);
// });

// middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());

app.use('/users', usersRouter);
app.use('/auth', authRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT);

module.exports = app;
