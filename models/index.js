const Likes = require('./likes');
const User = require('./User');
const Posts = require('./posts');

Likes.belongsTo(Posts);
Likes.belongsTo(User);

Posts.hasMany(Likes);
User.hasMany(Likes);

Posts.belongsTo(User);
User.hasMany(Posts);

User.hasMany(User);

module.exports = {
    Likes,
    User,
    Posts
};