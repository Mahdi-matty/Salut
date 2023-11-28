const { Model, DataTypes, INTEGER, BOOLEAN } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Likes extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

Likes.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    Likes_user_id: {
      type: DataTypes.INTEGER,
    },
    is_liked: {
      type: DataTypes.BOOLEAN,
    },
    is_disliked: {
      type: DataTypes.BOOLEAN,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    post_id: {
      type: DataTypes.INTEGER,
    },
    created_at: {
      type: DataTypes.DATE,
    },
  },
  {
    // hooks: {
    //   async beforeCreate(newUserData) {
    //     newUserData.password = await bcrypt.hash(newUserData.password, 10);
    //     return newUserData;
    //   },
    // },
    sequelize,
    // timestamps: false,
    // freezeTableName: true,
    // underscored: true,
    // modelName: 'likes',
  }
);

module.exports = Likes;
