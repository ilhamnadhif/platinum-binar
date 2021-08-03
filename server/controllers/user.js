const { User, Google, Local } = require("../models");

const getAllUser = async (req, res) => {
  try {
    const allUser = await User.findAll({
      include: [
        {
          model: Google,
        },
        {
          model: Local,
        },
      ],
      order: [
        ["total_score", "DESC"],
        ["createdAt", "ASC"],
      ],
    });
    res.status(200).json(allUser);
  } catch (error) {
    console.log(error);
  }
};

const getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const findOne = await User.findOne({
      include: [
        {
          model: Google,
        },
        {
          model: Local,
        },
      ],
      where: { id },
    });
    res.status(200).json(findOne);
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  await User.update(
    {
      username: req.body.username,
    },
    { where: { id: req.params.id } }
  );
  res.status(200).json({
    msg: "succes",
  });
};

const updateScore = async (req, res) => {
  await User.update(
    {
      total_score: req.body.total_score,
    },
    { where: { id: req.params.id } }
  );
  res.status(200).json({
    msg: "succes",
  });
};

module.exports = {
  getAllUser,
  getUserById,
  updateUser,
  updateScore,
};
