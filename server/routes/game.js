const express = require("express");
const router = express.Router();
const gameController = require("../controllers/game");

router.post(
  "/",
  gameController.upload.single("image"),
  gameController.createGame
);
router.get("/", gameController.getAllGames);
router.get("/:url", gameController.getGameByUrl);
router.put(
  "/:id",
  gameController.upload.single("image"),
  gameController.updateGame
);
router.delete("/:id", gameController.deleteGame);
router.patch("/:url", gameController.playCount);

module.exports = router;
