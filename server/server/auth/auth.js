const { redisClient } = require('./signin');

const requireAuth = (req, res, next) => {
  // check authorization from headers
  // if no authorization, 401 status
  // return the value of getting the authorization from the redis client, if err 401 status
  //  call next to move onto next middleware
};

module.exports = requireAuth;
