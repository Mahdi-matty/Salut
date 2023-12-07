const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./User');
const Follow= require("./follow");


class followedBy extends Model {}

followedBy = sequelize.define(`followedBy`,{
  following_user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Follow,
      key: `following_user_id`
    }
  },
  user_id:{
    type: DataTypes.INTEGER,
    reference:{
      model: User,
      key: `id`
    }
  }
});

// followedBy.init(
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         primaryKey: true,
//         autoIncrement: true,
//       },
//       following_user_id: {
//         type: DataTypes.INTEGER,
  
//       },
//       followed_user_id: {
//         type: DataTypes.INTEGER,
//         references: {
//           model: User,
//           key: 'id',
//         },
//       },
//       doYouFollow:{
//         type: DataTypes.BOOLEAN,
//         defaultValue: false
//       },
//     },
//     {
//       sequelize
//     }
//   );
  
  module.exports = followedBy;