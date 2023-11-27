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
    Likes_user_id: {
      type: INTEGER,
    },
    is_liked: {
      type: BOOLEAN,
    },
    is_disliked: {
      type: BOOLEAN,
    },
    user_id: {
      type: INTEGER,
    },
    post_id: {
      type: INTEGER,
    },
    created_at: {
      type: Date,
    },
  },
  {
    hooks: {
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'likes',
  }
);

module.exports = Likes;
