const Likes = require('./likes');
const User = require('./User');
const Posts = require('./posts');

Likes.belongsTo(Posts, {
    foreignKey:'post_id',
});
Likes.belongsTo(User,{
    foreignKey:'user_id',
});

Posts.hasMany(Likes, {
    foreignKey:'post_id',
});
User.hasMany(Likes, {
    foreignKey:'user_id',
});

Posts.belongsTo(User, {
    foreignKey:'user_id',
});
User.hasMany(Posts,{
    foreignKey:'user_id',
});

User.hasMany(User);

module.exports = {
    Likes,
    User,
    Posts
};