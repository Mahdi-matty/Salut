const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const {User,Likes, Posts} = require('../models');

//find all
router.get("/",(req,res)=>{
    Likes.findAll().then(dbPosts=>{
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
    Likes.findByPk(req.params.id,{
        include:[User, Posts]
    }).then(dblikes=>{
        if(!dblikes){
            res.status(404).json({msg:"no"})
        } else{
            res.json(dblikes)
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
      Likes.create({
        Likes_user_id: req.body.Likes_user_id,
        is_liked: req.body.is_liked,
        is_disliked: req.body.is_disliked,
        user_id: req.body.user_id,
        post_id: req.body.post_id,
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
    Likes.update(
      {
        Likes_user_id: req.body.Likes_user_id,
        is_liked: req.body.is_liked,
        is_disliked: req.body.is_disliked,
        user_id: req.body.user_id,
        post_id: req.body.post_id,
        UserId: req.session.user.id,
      },
      {
        where: {
          id: req.params.id,
          UserId:req.session.user.id
        },
      }
    )
      .then((editedLike) => {
        if (!editedLike[0]) {
          res.status(404).json({ msg: "no such Like!" });
        } else {
          res.json(editedLike);
        }
      })
      .catch((err) => {
        res.status(500).json({ msg: "oh no!", err });
      });
    });
  //delete
  router.delete("/:id", isAuthenticated, (req, res) => {
    Likes.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((delLike) => {
        if (!delLike) {
          res.status(404).json({ msg: "no such Like!" });
        } else {
          res.json(delLike);
        }
      })
      .catch((err) => {
        res.status(500).json({ msg: "oh no!", err });
      });
  });
  
  module.exports = router;