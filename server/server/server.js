const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const knex = require('knex');
const cors = require('cors');

const register = require('./user/userController');
const cookieController = require('./util/cookieController');
const sessionController = require('./session/sessionController');
const signin = require('./auth/signin');
const auth = require('./auth/auth');

const app = express();

const db = knex({
  client: 'pg',
  connection: {
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB
  }
});
app.use(cors());

/**
 * Automatically parse urlencoded body content from incoming requests and place it
 * in req.body
 */
app.use(bodyParser.urlencoded({ extended: true }));
// const whitelist = ['http://localhost:7777'];
// const corsOptions = {
//   origin: function(origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   }
// };

// app.use(morgan('combined'));
// app.use(cors(corsOptions));
app.use(bodyParser.json());

/**
 * Automatically parse cookies and puts in
 * in req.cookies
 */

app.use(cookieParser());

/**
 * --- Express Routes ---
 * Express will attempt to match these routes in the order they are declared here.
 * If a route handler / middleware handles a request and sends a response without
 * calling `next()`, then none of the route handlers after that route will run!
 * This can be very useful for adding authorization to certain routes...
 */

/**
 * root
 */
app.get('/', (req, res) => {
  // cookieController.setCookie(req, res);

  db.select('*')
    .from('users')
    .then(users => {
      res.json(users);
    });
});

/**
 * signup
 */
app.get('/signup', (req, res) => {
  res.json('SIGNUP');
});

app.post('/signup', (req, res) => {
  register.createUser(req, res, db, bcrypt);
});

// /**
//  * login
//  */
// app.post('/login', (req, res) => userController.verifyUser(req, res, bcrypt));

/**
 * login
 */
app.post('/signin', (req, res) =>
  signin.signinAuthentication(req, res, db, bcrypt)
);

/**
 * Authorized routes
 */
// app.get('/secret', auth.requireAuth, async (req, res) => {
//   // const authorized = await sessionController.isLoggedIn(req, res);
//   // if (!authorized) {
//   //   res.redirect('/signup');
//   // } else {
//   //   userController.getAllUsers((err, users) => {
//   //     if (err) throw err;
//   //     res.json('SECRET');
//   //   });
//   // }
// });

app.listen(3000);

module.exports = app;
