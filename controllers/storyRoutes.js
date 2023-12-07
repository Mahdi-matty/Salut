const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const isMyPost = require("../middleware/isMyPost");
const {User,Story, Posts} = require('../models');

router.get("/logout",(req,res)=>{
    req.session.destroy();
    res.send("logged out!")
})
router.get("/",(req,res)=>{
  Story.findAll()
  .then(dbstories => {
    res.json(dbstories)
    // res.render('stories', { stories: dbstories });
  }).catch(err=>{
      res.status(500).json({msg:"oh no!",err})
  })
})
router.get("/:id",(req,res)=>{
    Story.findAll({
      where:{
        id:req.params.id
      },
      include:[User]
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
    const { imageSource, teller_id  } = req.body;
    console.log("Received Request Data:", { imageSource, teller_id });
    // const hashtags = extractHashtags(title);
    Story.create({
      imageSource,
      teller_id,
    })
      .then((newstory) => {
        res.json(newstory)
        // res.json({story: newstory, id: newstory.id});
      })
      .catch((err) => {
        console.error("Error creating a new story:", err);
        res.status(500).json({ msg: "oh no!", err });
      });
  });

  router.delete("/:id", isAuthenticated, (req, res) => {
    Story.destroy({
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