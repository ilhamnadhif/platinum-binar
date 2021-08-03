const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, Google, Local } = require("../models");

module.exports = {
  register: async (req, res) => {
    const emailExist = await User.findOne({
      where: { email: req.body.email },
    });
    if (emailExist)
      return res.status(400).json({ msg: "email already exists" });
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const { username, email } = req.body;
    const save = await User.create({
      username: username,
      email: email,
    });
    await Local.create({
      userId: save.id,
      password: hashPassword,
    });
    res.json({ msg: "succes register user" });
  },
  login: async (req, res) => {
    const user = await User.findOne({
      include: [
        {
          model: Local,
        },
      ],
      where: { email: req.body.email },
    });
    if (!user) return res.status(400).json({ msg: "email is not found" });

    const validPass = await bcrypt.compare(
      req.body.password,
      user.Local.password
    );
    if (!validPass) return res.status(400).json({ msg: "invalid password" });

    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    const token = await jwt.sign(payload, "inirahasiawoy", { expiresIn: "1h" });

    res.json({
      message: "Succes Login",
      token: token,
      result: user,
    });
  },
  google: async (req, res) => {
    const data = req.user._json;
    try {
      const user = await Google.findOne({ where: { googleId: data.sub } });
      if (user == null) {
        const createUser = await User.create({
          username: data.name,
          email: data.email,
          provider: "google",
        });
        await Google.create({
          userId: createUser.id,
          googleId: data.sub,
          picture: data.picture,
        });
        const findUser = await User.findOne({
          include: [
            {
              model: Google,
            },
          ],
          where: { id: createUser.id },
        });
        const payload = {
          id: findUser.id,
          username: findUser.username,
          email: findUser.email,
        };

        const tokenss = await jwt.sign(payload, "inirahasiawoy", {
          expiresIn: "1h",
        });

        // res.json({
        //   message: "Succes SignUp Google",
        //   token: tokenss,
        //   result: findUser,
        // });
        res.redirect("http://localhost:7000/login?token=" + tokenss);
      }
      const find = await User.findOne({
        include: [
          {
            model: Google,
            where: { googleId: data.sub },
          },
        ],
      });
      const tokens = await jwt.sign(
        {
          id: find.id,
          username: find.username,
          email: find.email,
        },
        "inirahasiawoy",
        {
          expiresIn: "1h",
        }
      );

      // res.json({
      //   message: "Succes SignIn Google",
      //   token: tokens,
      //   result: find,
      // });
      res.redirect("http://localhost:7000/login?token=" + tokens);
    } catch (error) {
      console.log(error);
    }
  },
};
