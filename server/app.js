const express = require("express");
const cors = require("cors");
const path = require("path");
const passport = require("passport");

const app = express();

require("dotenv").config();

app.use(cors({origin:"http://localhost:7000"}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
require("./lib/passport");
require("./lib/google");

app.use("/v1/images", express.static(path.join(__dirname, "images")));
app.use("/v1/auth", require("./routes/auth"));
app.use("/v1/user", require("./routes/user"));
app.use("/v1/game", require("./routes/game"));

app.use((error, req, res, next) => {
  res.status(500).json({
    message: "internal server error",
  });
});

const port = 8000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
