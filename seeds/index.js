const sequelize = require('../config/connection');
const seedUser = require('./userData');
const seedPost = require('./seedData');
const seedLikes = require('./likesData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUser();

  await seedPost();

  await seedLikes();

  process.exit(0);
};

seedAll();