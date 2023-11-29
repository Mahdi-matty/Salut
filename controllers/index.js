const express = require('express');
const router = express.Router();
const {User,Posts, Likes} = require("../models");
const userRoutes = require('./userRoutes');
const likesRoutes= require('./likesRoutes');
const postRoutes = require('./postsRoutes');
const autRoutes = require('./autRoutes');
const bcrypt = require("bcrypt");


// remove this
// router.get("/signup",(req,res)=>{
//     res.render("signup")
// });

//Ryan's code

// router.get("/login",(req,res)=>{
//     res.render("login")
// });

router.use("/api/users",userRoutes);
router.use("/api/likes",likesRoutes);
router.use("/api/posts",postRoutes);
router.use("/api/",autRoutes);

router.get("/",(req,res)=>{
    try {
        res.render("home");
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    });


router.get("/profile",(req,res)=>{
    if(!req.session.user){
        res.redirect("/login")
    } else {
        User.findByPk(req.session.user.id,{
            include:[Posts, Likes]
        }).then(dbUser=>{
            const hbsUser = dbUser.toJSON()
            console.log('hbsUsers: ',hbsUser)
            res.render("profile",hbsUser)  
        })
    }
})



module.exports = router;