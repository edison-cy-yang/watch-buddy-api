const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

////OAUTH
passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/users/auth/google/callback'
  }, (accessToken, refreshToken, profile, done) => {
    console.log(accessToken);
    console.log('refresh token ', refreshToken);
    console.log('profile ', profile);
    console.log('done ', done);
  })
);
