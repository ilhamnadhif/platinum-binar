const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const { User, Google, Local } = require("../models");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "inirahasiawoy",
};

passport.use(
  new JwtStrategy(options, (payload, done) => {
    User.findOne({
      include: [
        {
          model: Google,
        },
        {
          model: Local,
        },
      ],
      where: { id: payload.id },
    })
      .then((user) => done(null, user))
      .catch((err) => done(err, false));
  })
);
