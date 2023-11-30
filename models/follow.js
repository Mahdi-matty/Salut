const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Follow extends Model {}

Follow.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    following_user_id: {
      type: DataTypes.INTEGER,
    },
    followed_user_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize
}
);

module.exports = Follow;