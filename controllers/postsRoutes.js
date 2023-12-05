const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const isMyPost = require("../middleware/isMyPost");
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

//query or route to find posts linked to a single user
router.get("/:id",(req,res)=>{
    Posts.findAll({
      where:{
        user_id:req.params.id
      },
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

function extractHashtags(text) {
  const regex = /#(\w+)/g;
  console.log("Extracted Hashtags:", regex);
  const matches = text.match(regex);
  return matches ? matches.join(",") : null;
}
router.post("/", isAuthenticated, (req, res) => {
  const { title, content,imageSource, user_id } = req.body;
  console.log("Received Request Data:", { title, content, user_id });
  const hashtags = extractHashtags(title);
  Posts.create({
    title,
    content,
    imageSource,
    user_id,
    // hashtags,
  })
    .then((newPost) => {
      res.json(newPost);
    })
    .catch((err) => {
      res.status(500).json({ msg: "oh no!", err });
    });
});
router.get('/search', (req, res) => {
  const { tag } = req.query;
  console.log('Received Search Query:', tag);
  
  Posts.findAll({
    where: {
      title: {
        [Op.like]: `%#${tag}%`,
      },
    }})
    .then((searchResults) => {
      console.log('Search Results:', searchResults);
      res.json(searchResults);
    })
    .catch((err) => {
      res.status(500).json({ msg: "Error during search", err });
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