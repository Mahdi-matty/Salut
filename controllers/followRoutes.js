const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const {User,Likes, Posts, follow} = require('../models');


const isAuthenticated = (req, res, next) => {
    if (!req.session.user) {
      res.status(403).json({ msg: "Login first to perform this action!" });
    } else {
      next();
    }
  };

  
  router.get("/", isAuthenticated, (req,res)=>{
    follow.findAll().then(dbUsers=>{
        res.json(dbUsers)
    }).catch(err=>{
        res.status(500).json({msg:"oh no!",err})
    })
});

router.get("/logout",(req,res)=>{
    req.session.destroy();
    res.send("logged out!")
});

router.get("/:id",(req,res)=>{
    follow.findByPk(req.params.id,{
        include:[User]
    }).then(dbfollow=>{
        if(!dbfollow){
            res.status(404).json({msg:"no such follow!"})
        } else{
            res.json(dbfollow)
        }
    }).catch(err=>{
        res.status(500).json({msg:"oh no!",err})
    })
});

router.post('/', isAuthenticated, async (req, res) => {
    follow.create(
        {
            following_user_id: req.body.following_user_id,
            followed_user_id: req.body.followed_user_id
        }
    ).then((newfollow) => {
        res.json(newfollow);
      })
      .catch((err) => {
        res.status(500).json({ msg: "oh no!",err});
      });
  });
  router.get('/:userId/followers', isAuthenticated, async (req, res) => {
    try {
      const userId = req.params.userId;
      const followers = await Follow.findAll({
        where: { followed_user_id: userId },
        include: [{ model: User, as: 'follower' }], 
      });
  
      res.render('followers-template', { followers });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  router.get('/:userId/following', isAuthenticated, async (req, res) => {
    try {
      const userId = req.params.userId;
      const followings = await Follow.findAll({
        where: { following_user_id: userId },
        include: [{ model: User, as: 'following' }], 
      });
  
      res.render('following-template', { followings });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

router.put("/:id", isAuthenticated, (req, res) => {
    follow.update(
      {
        following_user_id: req.body.following_user_id,
        followed_user_id: req.body.followed_user_id
      },
      {
        where: {
          id: req.params.id
        },
      }
    )
      .then((editedfollow) => {
        if (!editedfollow[0]) {
          res.status(404).json({ msg: "no such follow!" });
        } else {
          res.json(editedfollow);
        }
      })
      .catch((err) => {
        res.status(500).json({ msg: "oh no!", err });
      });
    });
    router.delete("/:id", isAuthenticated, (req, res) => {
        follow.destroy({
          where: {
            id: req.params.id,
          },
        })
          .then((delfollow) => {
            if (!delfollow) {
              res.status(404).json({ msg: "no such follow!" });
            } else {
              res.json(delfollow);
            }
          })
          .catch((err) => {
            res.status(500).json({ msg: "oh no!", err });
          });
      });
      
      module.exports = router;