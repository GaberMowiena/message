// Redis setup
const jwt = require('jsonwebtoken');
const redis = require('redis');

const redisClient = redis.createClient(process.env.REDIS_URL);

const signToken = email => {
  //1. set jwtPayload to an object with whatever was passed in
  const jwtPayload = { email };
  const SECRET = 'fdsfsdfsd';
  //2. return the jwt.sign passing in the payload
  return jwt.sign(jwtPayload, SECRET, { expiresIn: 60 * 60 });
};

const setToken = (key, value) => {
  // called to store session info
  return Promise.resolve(redisClient.set(key, value));
};
const createSession = userInfo => {
  // called once handleSignin is invoked, it will create a session if valid user
  //1. get email from the user info
  console.log('in create session');
  const { email } = userInfo;
  //2. use the signToken helper function on email  and store it
  const token = signToken(email);
  //3. return the return value of calling setToken helper function passing in the new token and the email
  return setToken(token, email)
    .then(resp => {
      return { success: true, email, token, resp };
    })
    .catch(err => {
      return Promise.reject(err);
    });
  //4. return an object with success, userId set to the id, the token and the user
};

const handleSignin = (req, res, db, bcrypt) => {
  // called if authorization is false and user needs to sign in
  //1. get email and password from req.body
  const { email, password } = req.body;
  //2. if one of those fields are missing, reject promise
  if (!email || !password) {
    return Promise.reject();
  }
  //3. return the result of calling db.select('email','password') from the login table where the email match
  return db
    .select('email', 'password')
    .from('login')
    .where('email', '=', email)
    .then(data => {
      return bcrypt.compare(password, data[0].password).then(valid => {
        if (valid) {
          console.log(valid);
          return data[0];
        } else {
          return Promise.reject();
        }
      });
    });
  //4. once you get the data back, compare the passwords and see if it's valid

  //5. if valid, return the user info
  //6. else reject the promise
};

const getAuthTokenId = (req, res) => {
  //1. get authorization from header
  const { authorization } = req.header;
  //2. check the redis client for authorization and res.json and object with the id as the returned value
  return redisClient.get(authorization, (err, reply) => {
    if (!reply || err) res.status(401).send('Unauthorized');
    return res.json({ email: reply });
  });
  //3 if err, send unathorized status
};
const signinAuthentication = (req, res, db, bcrypt) => {
  //1. Get authorization from header
  const { authorization } = req.header;
  //2. If authorization is true, return the result of getAuthTokenId(res,req)
  if (authorization) {
    return getAuthTokenId(res, req);
  } else {
    //3. Otherwise call handleSignin(req, res, db, bcrypt) and then check if the data returned has id and email
    return handleSignin(req, res, db, bcrypt)
      .then(data => {
        data.email ? createSession(data) : Promise.reject();
      })
      .then(result => res.json(result))
      .catch(err => res.status(400).json('Error'));

    //
    // .then(result => res.json(result));
    //4. if it has id and email, call createSession(data), otherwise reject the Promise
    //5. res.json whatever is returned back either way
  }
};

module.exports = {
  signinAuthentication,
  redisClient
};
