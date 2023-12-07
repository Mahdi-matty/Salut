const { Model, DataTypes, TEXT, INTEGER } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Message extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
};
Message.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          content: {
            type: DataTypes.TEXT,
          },
          sender_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          reciver_id: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
          created_at: {
            type: DataTypes.DATE,
          },
    }, {
        sequelize,
    }
);

module.exports= Message;