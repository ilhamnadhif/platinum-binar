("use strict");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Games", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.STRING,
      },
      game_url: {
        type: Sequelize.STRING,
      },
      play_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    await queryInterface.bulkInsert("Games", [
      {
        name: "Suit Game",
        description: "Andalkan keberuntunganmu untuk kalahkan musuhmu!",
        image: "1623669855358-rps.png",
        game_url: "/suitgame",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Counter Game",
        description: "Klik Klik Klik Doang",
        image: "1623834941623-bugatti.jpeg",
        game_url: "/countergame",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Games");
  },
};
