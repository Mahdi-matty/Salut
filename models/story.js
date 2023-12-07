const { Model, DataTypes, TEXT, INTEGER } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Story extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

Story.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    imageSource : {
      type: DataTypes.STRING,
    },
    teller_id: {
      type: DataTypes.INTEGER,
      unique: true,
      // allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
    },
  },
  {

    sequelize,
 
  }
);

module.exports = Story;