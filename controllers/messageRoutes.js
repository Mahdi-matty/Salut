const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const isMyPost = require("../middleware/isMyPost");
const {User,Likes, Posts, Message} = require('../models');
const { Op } = require('sequelize');

//find all
router.get("/",(req,res)=>{
    Message.findAll().then(dbMessage=>{
        res.json(dbMessage)
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
    Message.findAll({
      where:{
        user_id:req.params.id
      },
      include:[User]
    }).then(dbMessage=>{
        if(!dbMessage){
            res.status(404).json({msg:"no such message!"})
        } else{
            res.json(dbMessage)
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
    Message.create({
      content: req.body.content,
      sender_id: req.body.sender_id,
      reciver_id: req.body.reciver_id,
      
      // UserId: req.session.user.id,
    })
      .then((newMessage) => {
        res.json(newMessage);
      })
      .catch((err) => {
        res.status(500).json({ msg: "oh no!", err });
      });
  });

router.put("/:id", isAuthenticated, (req, res) => {
    Message.update(
      {
        content: req.body.content,
      sender_id: req.body.sender_id,
      reciver_id: req.body.reciver_id,
        UserId: req.session.user.id,
      },
      {
        where: {
          id: req.params.id,
          UserId:req.session.user.id
        },
      }
    )
      .then((editedMessage) => {
        if (!editedMessage[0]) {
          res.status(404).json({ msg: "no such Message!" });
        } else {
          res.json(editedMessage);
        }
      })
      .catch((err) => {
        res.status(500).json({ msg: "oh no!", err });
      });
    });
  //delete
  router.delete("/:id", isAuthenticated, (req, res) => {
    Message.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((delMessage) => {
        if (!delMessage) {
          res.status(404).json({ msg: "no such Message!" });
        } else {
          res.json(delMessage);
        }
      })
      .catch((err) => {
        res.status(500).json({ msg: "oh no!", err });
      });
  });
  
  module.exports = router;