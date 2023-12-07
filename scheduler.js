const cron = require('node-cron');
const { Story } = require('./models');
const Sequelize = require("sequelize");


cron.schedule('* * * * *', async () => {
    try {
      const currentTime = new Date();
      const expirationTime = new Date(currentTime.getTime() - 5 * 60 * 1000);

      const deletedCount = await Story.destroy({
        where: {
          createdAt: {
            [Sequelize.Op.lt]: expirationTime,
          },
        },
      });
      console.log(`${deletedCount} posts deleted.`);
  } catch (error) {
    console.error('Error deleting expired posts:', error);
  }
});