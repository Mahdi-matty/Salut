const {Post} = require("../models");
const isMyPost = (req,res,next)=>{
    Post.findByPK(req.params.id).then(foundPost=>{
        if(foundPost.user_id!==req.session.user.id){
            return res.status(401).json({msg:"This is not your post !"});
        }
        next();
    })
}

module.exports = isMyPost;