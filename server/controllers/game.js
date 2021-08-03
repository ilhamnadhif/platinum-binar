const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { Game } = require("../models");

const storage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, "./images");
  },

  filename: function (request, file, callback) {
    callback(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

const createGame = async (req, res) => {
  const image = req.file.filename;
  const { name, description, game_url } = req.body;

  try {
    const create = await Game.create({
      name: name,
      description: description,
      image: image,
      game_url: game_url,
    });
    res.status(201).json(create);
  } catch (error) {
    console.log(error);
  }
};

const getAllGames = async (req, res) => {
  try {
    const allGames = await Game.findAll({ order: [["createdAt", "ASC"]] });
    res.status(200).json(allGames);
  } catch (error) {
    console.log(error);
  }
};

const getGameByUrl = async (req, res) => {
  const url = req.params.url;
  try {
    const findOne = await Game.findOne({ where: { game_url: `/${url}` } });
    res.status(200).json(findOne);
  } catch (error) {
    console.log(error);
  }
};

const updateGame = async (req, res) => {
  const id = req.params.id;
  const image = req.file.filename;
  const { name, description, game_url, play_count } = req.body;
  try {
    const game = await Game.findOne({ where: { id } });
    await Game.update(
      {
        name: name,
        description: description,
        image: image,
        game_url: game_url,
        play_count: play_count,
      },
      { where: { id: game.id } }
    );
    removeImage(game.image);
    res.json({ message: "succes update game" });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const deleteGame = async (req, res) => {
  const id = req.params.id;
  try {
    const game = await Game.findOne({ where: { id } });
    await Game.destroy({ where: { id: game.id } });
    removeImage(game.image);
    res.json({ message: "succes delete paket", result: game });
  } catch (error) {
    console.log(error);
  }
};

const playCount = async (req, res) => {
  const url = req.params.url;
  const { play_count } = req.body;

  await Game.update({ play_count }, { where: { game_url: `/${url}` } });
  res.send("succes");
};

const removeImage = (filePath) => {
  // console.log('filePath', filePath)
  // console.log('__dirname', __dirname)
  filePath = path.join(__dirname, "../../images/", filePath);
  console.log(filePath);
  fs.unlink(filePath, (err) => console.log(err));
};

module.exports = {
  createGame,
  upload,
  getAllGames,
  getGameByUrl,
  updateGame,
  deleteGame,
  playCount,
};
