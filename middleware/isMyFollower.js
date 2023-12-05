const {User} = require("../models");
const isMyFollower = (req,res,next)=>{
    console.log(res);
    // User.findByPk(req.params.id,{
    //     // include:[Posts, Likes]
    // }).then(dbUser=>{
    //     if(!dbUser){
    //         res.status(404).json({msg:"no such user!"})
    //     } else{
    //         res.json(dbUser)
    //     }
    // }).catch(err=>{
    //     res.status(500).json({msg:"oh no!",err})
    // })
}

module.exports = isMyFollower;