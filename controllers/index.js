const express = require('express');
const router = express.Router();
const {User,Posts, Likes} = require("../models");
const userRoutes = require('./userRoutes');
const likesRoutes= require('./likesRoutes');
const postRoutes = require('./postsRoutes');

router.get("/",(req,res)=>{
    res.render("home")
});

router.use("/api/users",userRoutes);
router.use("/api/likes",likesRoutes);
router.use("/api/posts",postRoutes);



router.get("/sessiondata",(req,res)=>{
    res.json(req.session)
})

router.get("/login",(req,res)=>{
    if(req.session.user){
        res.redirect("/profile")
    }
    res.render("login")
})

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