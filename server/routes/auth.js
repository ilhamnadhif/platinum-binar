const express = require("express");
const router = express.Router();
const passport = require("passport");
const auth = require("../controllers/auth");
const authController = require("../controllers/auth");

router.post("/register", authController.register);
router.post("/login", authController.login);

router.get(
  "/user",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/v1/auth/failed" }),
  authController.google
);

router.get("/failed", (req, res) => {
  res.send("gagal login");
});

module.exports = router;
