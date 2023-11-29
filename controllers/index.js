const express = require('express');
const router = express.Router();
const {User,Posts, Likes} = require("../models");
const userRoutes = require('./userRoutes');
const likesRoutes= require('./likesRoutes');
const postRoutes = require('./postsRoutes');
const autRoutes = require('./autRoutes');
const bcrypt = require("bcrypt");

router.get("/",(req,res)=>{
    res.render("home")
});

router.use("/api/users",userRoutes);
router.use("/api/likes",likesRoutes);
router.use("/api/posts",postRoutes);
router.use("/api/",autRoutes);


router.get("/profile",(req,res)=>{
    if(!req.session.user){
        res.redirect("/login")
    } else {
        User.findByPk(req.session.user.id,{
            include:[Todo]
        }).then(dbUser=>{
            const hbsUser = dbUser.toJSON()
            console.log('hbsUsers: ',hbsUser)
            res.render("profile",hbsUser)  
        })
    }
})



module.exports = router;