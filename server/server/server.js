// npm packages
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
require('dotenv').config();

// app imports
const usersRouter = require('./routers/users');
const authRouter = require('./routers/auth');
const profileRouter = require('./routers/profiles');

// global constants
const app = express();

// passport.serializeUser(function(user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function(obj, done) {
//   done(null, obj);
// });

// middleware
// app.use((request, response, next) => {
//   response.header('Access-Control-Allow-Origin', '*');
//   response.header(
//     'Access-Control-Allow-Headers',
//     'Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization'
//   );
//   response.header(
//     'Access-Control-Allow-Methods',
//     'POST,GET,PATCH,DELETE,OPTIONS'
//   );
//   response.header('Content-Type', 'application/json');
//   return next();
// });

// app.use((request, response, next) => {
//   response.header('Access-Control-Allow-Origin', '*');
//   response.header(
//     'Access-Control-Allow-Headers',
//     'Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization'
//   );
//   response.header(
//     'Access-Control-Allow-Methods',
//     'POST,GET,PATCH,DELETE,OPTIONS'
//   );
//   response.header('Content-Type', 'application/json');
//   return next();
// });
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());

app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/profile', profileRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT);

module.exports = app;
