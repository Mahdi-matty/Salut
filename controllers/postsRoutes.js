const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const {User,Likes, Posts} = require('../models');

//find all
router.get("/",(req,res)=>{
    Posts.findAll().then(dbPosts=>{
        res.json(dbPosts)
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
    Posts.findByPk(req.params.id,{
        include:[User, Likes]
    }).then(dbPosts=>{
        if(!dbPosts){
            res.status(404).json({msg:"no such post!"})
        } else{
            res.json(dbPosts)
        }
    }).catch(err=>{
        res.status(500).json({msg:"oh no!",err})
    })
});
const isAuthenticated = (req, res, next) => {
  if (!req.session.user) {
    res.status(403).json({ msg: "Login first to perform this action!" });
  } else {
    next();
  }
};

router.post("/", isAuthenticated, (req, res) => {
      Posts.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.body.user_id,
        UserId: req.session.user.id,
      })
        .then((newPost) => {
          res.json(newPost);
        })
        .catch((err) => {
          res.status(500).json({ msg: "oh no!", err });
        });
    });
  //edit
  router.put("/:id", isAuthenticated, (req, res) => {
    Posts.update(
      {
        title: req.body.title,
        content: req.body.content,
        user_id: req.body.user_id,
        UserId: req.session.user.id,
      },
      {
        where: {
          id: req.params.id,
          UserId:req.session.user.id
        },
      }
    )
      .then((editedPost) => {
        if (!editedPost[0]) {
          res.status(404).json({ msg: "no such Like!" });
        } else {
          res.json(editedPost);
        }
      })
      .catch((err) => {
        res.status(500).json({ msg: "oh no!", err });
      });
    });
  //delete
  router.delete("/:id", isAuthenticated, (req, res) => {
    Posts.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((delPost) => {
        if (!delPost) {
          res.status(404).json({ msg: "no such post!" });
        } else {
          res.json(delPost);
        }
      })
      .catch((err) => {
        res.status(500).json({ msg: "oh no!", err });
      });
  });
  
  module.exports = router;