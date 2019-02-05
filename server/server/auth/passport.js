const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
require('dotenv').config();

const passportGithub = passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: 'https://localhost:3000/auth/github/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('accesstoken', accessToken);
      console.log('rftoken', refreshToken);
      console.log('profile', profile);
      return done(null, profile);
    }
  )
);

module.exports = { passportGithub };
