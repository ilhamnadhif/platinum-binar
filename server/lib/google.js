const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "1080693596240-spg6jkvrbaf38an7g7f4h13osfk9cr7t.apps.googleusercontent.com",
      clientSecret: "5YDLRW9JMr4FQsAZNcXiwleg",
      callbackURL: "/v1/auth/google/callback",
      proxy: true,
    },
    function (accessToken, refreshToken, profile, cb) {
      //   User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //   return cb(err, user);
      // console.log("user", user);
      //   });
      console.log(profile);
      cb(null, profile);
    }
  )
);
