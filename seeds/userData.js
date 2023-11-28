const { User } = require('../models');

const userdata = [
  {
    username: 'Testuser',
  },
  {
    password: 'Password',
  },
  {
    email: 'test_email@ex.com',
  },
];

const seedUser = () => User.bulkCreate(userdata);

module.exports = seedUser;