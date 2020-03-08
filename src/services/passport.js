const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const usersFn = require('../databaseHelpers/usersFn');

module.exports = (db) => {
////OAUTH
passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/users/auth/google/callback'
  }, async (accessToken, refreshToken, profile, done) => {
    // console.log(accessToken);
    // console.log('refresh token ', refreshToken);
    // console.log('profile ', profile);
    // console.log('done ', done);

    //save the new user to the database
    // console.log(profile.id);
    // console.log(profile.displayName);
    // console.log(profile.emails[0].value);

    const user = await usersFn.addNewUser(db, {name: profile.displayName, email: profile.emails[0].value, googleId: profile.id});
    console.log(user);
  })
);
}
