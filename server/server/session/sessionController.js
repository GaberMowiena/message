const Session = require('./sessionModel');

const sessionController = {};

/**
 * isLoggedIn - find the appropriate session for this request in the database, then
 * verify whether or not the session is still valid.
 *
 *
 */
sessionController.isLoggedIn = async (req, res) => {
  // write code here
  // console.log('in isloggedin');
  const { ssid } = req.cookies;
  if (!ssid) return null;
  const authorized = await Session.findOne({
    cookieId: ssid
  });
  return authorized;
};

/**
 * startSession - create a new Session model and then save the new session to the
 * database.
 *
 *
 */
sessionController.startSession = async (req, res, data) => {
  const response = await Session.create({
    cookieId: data._id
  });
  return response;
};

module.exports = sessionController;
