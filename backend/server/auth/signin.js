// Redis setup
// const jwt = require('jsonwebtoken');
const redis = require('redis');

const redisClient = redis.createClient(process.env.REDIS_URL);

const signToken = username => {
  //1. set jwtPayload to an object with whatever was passed in
  //2. return the jwt.sign passing in the payload
};

const setToken = (key, value) => {
  // called to store session info
  return Promise.resolve(redisClient.set(key, value));
};
const createSession = userInfo => {
  // called once handleSignin is invoked, it will create a session if valid user
  //1. get email and id from the user info
  //2. use the signToken helper function on email or id and store it
  //3. return the return value of calling setToken helper function passing in the new token and the user id
  //4. return an object with success, userId set to the id, the token and the user
};

const handleSignin = (req, res, db, bcrypt) => {
  // called if authorization is false and user needs to sign in
  //1. get email and password from req.body
  //2. if one of those fields are missing, reject promise
  //3. return the result of calling db.select('email','password') from the login table where the email match
  //4. once you get the data back, compare the passwords and see if it's valid
  //5. if valid, return the user info
  //6. else reject the promise
};

const getAuthTokenId = (req, res) => {
  //1. get authorization from header
  //2. check the redis client for authorization and res.json and object with the id as the returned value
  //3 if err, send unathorized status
};
const signinAuthentication = (req, res, db, bcrypt) => {
  //1. Get authorization from header
  //2. If authorization is true, return the result of getAuthTokenId(res,req)
  //3. Otherwise call handleSignin(req, res, db, bcrypt) and then check if the data returned has id and email
  //4. if it has id and email, call createSession(data), otherwise reject the Promise
  //5. res.json whatever is returned back either way
};

module.exports = {
  signinAuthentication,
  redisClient
};
