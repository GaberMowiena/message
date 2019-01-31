const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userController = require('./user/userController');
const cookieController = require('./util/cookieController');
const sessionController = require('./session/sessionController');

const app = express();

// const mongoURI =
//   process.env.NODE_ENV === 'test'
//     ? 'mongodb://localhost/unit11test'
//     : 'mongodb://localhost/unit11dev';
// mongoose.connect(mongoURI);

/**
 * Set our Express view engine as ejs.
 * This means whenever we call res.render, ejs will be used to compile the template.
 * ejs templates are located in the client/ directory
 */
app.set('view engine', 'ejs');

/**
 * Automatically parse urlencoded body content from incoming requests and place it
 * in req.body
 */
app.use(bodyParser.urlencoded({ extended: true }));
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
  /**
   * Since we set `ejs` to be the view engine above, `res.render` will parse the
   * template page we pass it (in this case 'client/secret.ejs') as ejs and produce
   * a string of proper HTML which will be sent to the client!
   */
  // console.log('hi');
  cookieController.setCookie(req, res);
  res.render('./../client/index');
});

/**
 * signup
 */
app.get('/signup', (req, res) => {
  res.render('./../client/signup', { error: null });
});

app.post('/signup', (req, res) => userController.createUser(req, res, bcrypt));

/**
 * login
 */
app.post('/login', (req, res) => userController.verifyUser(req, res, bcrypt));

/**
 * Authorized routes
 */
app.get('/secret', async (req, res) => {
  const authorized = await sessionController.isLoggedIn(req, res);
  if (!authorized) {
    res.redirect('/signup');
  } else {
    userController.getAllUsers((err, users) => {
      if (err) throw err;

      res.render('./../client/secret', { users: users });
    });
  }
});

app.listen(3000);

module.exports = app;