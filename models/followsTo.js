const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./User');
const Follow= require("./follow");


class followsTo extends Model {}


followsTo = sequelize.define(`followsTo`,{
  followed_user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Follow,
      key: `followed_user_id`
    }
  },
  user_id:{
    type: DataTypes.INTEGER,
    reference:{
      model: User,
      key: `id`
    }
  }
  
})
  
  module.exports = followsTo;