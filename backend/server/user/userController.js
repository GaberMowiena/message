const User = require('./userModel');
const cookieController = require('./../util/cookieController');
const sessionController = require('./../session/sessionController');

const userController = {};

/**
 * getAllUsers
 *
 * @param next - Callback Function w signature (err, users)
 */
userController.getAllUsers = next => {
  User.find({}, next);
};

/**
 * createUser - create a new User model and then save the user to the database.
 *
 * @param req - http.IncomingRequest
 * @param res - http.ServerResponse
 */
userController.createUser = async (req, res, db, bcrypt) => {
  try {
    const { name, email, password, city, cohort } = req.body;
    if (!email || !name || !password) {
      return res.status(400).json('Incorrect form submission');
    }
    const SALT_ROUNDS = 10;
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    db.transaction(trx => {
      trx
        .insert({
          password: hashedPassword,
          email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
          return trx('users')
            .returning('*')
            .insert({
              name,
              email: loginEmail,
              password: hashedPassword,
              city,
              cohort
            })
            .then(user => {
              res.json(user[0]);
            });
        })
        .then(trx.commit)
        .catch(trx.rollback);
    });
  } catch (err) {
    console.log(err);
  }
};

/**
 * verifyUser - Obtain username and password from the request body, locate
 * the appropriate user in the database, and then authenticate the submitted password
 * against the password stored in the database.
 *
 * @param req - http.IncomingRequest
 * @param res - http.ServerResponse
 */
userController.verifyUser = async (req, res, bcrypt) => {
  try {
    const { username, password } = req.body;
    const userinfo = await User.findOne({ username });
    // console.log(userinfo);
    const authorized = await bcrypt.compare(password, userinfo.password);

    if (authorized) {
      const loggedIn = await sessionController.isLoggedIn(req, res);

      if (!loggedIn) {
        sessionController.startSession(req, res, userinfo).then(resp => {
          const { cookieId } = resp;

          cookieController.setSSIDCookie(req, res, cookieId);
        });
      } else {
        res.redirect('/secret');
      }
    } else {
      res.redirect('/signup');
    }
  } catch (err) {
    res.redirect('/signup');
  }
};

module.exports = userController;
