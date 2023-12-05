const Likes = require('./likes');
const User = require('./User');
const Posts = require('./posts');
const follow= require("./follow");
const comment = require("./comments");
const Message = require("./message");
const Story = require("./story");

Story.belongsTo(User, {
    foreignKey: 'teller_id',
});
User.hasOne(Story, {
    foreignKey: "teller_id",
})

comment.belongsTo(Posts, {
    foreignKey:`post_id`,
})

Posts.hasMany(comment,{
    foreignKey:`post_id`,
})

User.hasMany(comment,{
    foreignKey:`user_id`,
})
comment.belongsTo(User,{
    foreignKey:`user_id`,
})

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
Message.belongsTo(User, {
    foreignKey: "sender_id",
    as: "sender"
});
Message.belongsTo(User, {
    foreignKey: "reciver_id",
    as: 'reciver'
})
follow.belongsTo(User, {
    foreignKey: "following_user_id",
    as: "followers"
});
follow.belongsTo(User, {
    foreignKey: "followed_user_id",
    as: "following"
});

User.belongsToMany(User, {
    through: "follow",
    as: "followers",
    foreignKey: "followed_user_id"
});
User.belongsToMany(User,  {
    through: 'follow',
    as: "following",
    foreignKey: "following_user_id"
})

module.exports = {
    Likes,
    User,
    Posts,
    follow,
    Message,
    Story,
    comment
};