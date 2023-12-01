const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const {User,Likes, Posts} = require('../models');
const isMyPost = require('../middleware/isMyPost');

//find all
router.get("/",(req,res)=>{
    User.findAll().then(dbUsers=>{
        res.json(dbUsers)
    }).catch(err=>{
        res.status(500).json({msg:"oh no!",err})
    })
})
router.get("/logout",(req,res)=>{
    req.session.destroy();
    res.send("logged out!")
})
//find one
router.get("/:id",(req,res)=>{
    User.findByPk(req.params.id,{
        include:[Posts, Likes]
    }).then(dbUser=>{
        if(!dbUser){
            res.status(404).json({msg:"no such user!"})
        } else{
            res.json(dbUser)
        }
    }).catch(err=>{
        res.status(500).json({msg:"oh no!",err})
    })
})
//create
router.post("/",(req,res)=>{
    User.create({
        username:req.body.username,
        password:req.body.password,
        email: req.body.email,
        following_user_id: req.body.following_user_id,
        followed_user_id: req.body.followed_user_id
    }).then(newUser=>{
        res.json(newUser)
    }).catch(err=>{
        res.status(500).json({msg:"oh no!",err})
    })
})
//login
router.get("/login",(req,res)=>{
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
//edit
router.put("/:id",isMyPost,(req,res)=>{
    User.update({
        username:req.body.username,
        password:req.body.password,
        email: req.body.email,
        following_user_id: req.body.following_user_id,
        followed_user_id: req.body.followed_user_id
    },{
        where:{
            id:req.params.id
        }
    }).then(editUser=>{
        if(!editUser[0]){
            res.status(404).json({msg:"no such user!"})
        } else{
            res.json(editUser)
        }
    }).catch(err=>{
        res.status(500).json({msg:"oh no!",err})
    })
})
//delete
router.delete("/:id",isMyPost,(req,res)=>{
    User.destroy({
        where:{
            id:req.params.id
        }
    }).then(delUser=>{
        if(!delUser){
            res.status(404).json({msg:"no such user!"})
        } else{
            res.json(delUser)
        }
    }).catch(err=>{
        res.status(500).json({msg:"oh no!",err})
    })
})


module.exports = router;