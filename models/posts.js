const { Model, DataTypes, TEXT, INTEGER } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Post extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: VARCHAR,
    },
    content: {
      type: TEXT,
    },
    user_id: {
      type: INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DATE,
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
    modelName: 'post',
  }
);

module.exports = Post;
