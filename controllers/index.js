const express = require('express');
const router = express.Router();
const {User,Posts, Likes} = require("../models");
const userRoutes = require('./userRoutes');
const likesRoutes= require('./likesRoutes');
const postRoutes = require('./postsRoutes');
const bcrypt = require("bcrypt");

router.get("/",(req,res)=>{
    res.render("home")
});

router.use("/api/users",userRoutes);
router.use("/api/likes",likesRoutes);
router.use("/api/posts",postRoutes);



router.get("/sessiondata",(req,res)=>{
    res.json(req.session)
})

// router.get("/login",(req,res)=>{
//     if(req.session.user){
//         res.redirect("/profile")
//     }
//     res.render("login")
// })

//Mahdi's version
router.post("/login",(req,res)=>{
    //1. find the user who is trying to login
    User.findOne({
        where:{
            username:req.body.username
        }
    }).then(foundUser=>{
        if(!foundUser){
            res.status(401).json({msg:"Invalid username/password"})
        } else {
            if(!bcrypt.compareSync(req.body.password,foundUser.password)){
                res.status(401).json({msg:"Invalid username/password"})
            } else {
                req.session.user = {
                    id:foundUser.id,
                    username:foundUser.username
                }
                res.json(foundUser)
            }
        }
    })
})

router.get("/logout",(req,res)=>{
    req.session.destroy();
    res.send("logged out!")
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