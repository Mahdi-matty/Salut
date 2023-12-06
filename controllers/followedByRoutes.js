const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const isMyFollower = require("../middleware/isMyFollower");
const {User,Likes, Posts, Follow, followedBy, followsTo} = require('../models');


const isAuthenticated = (req, res, next) => {
    if (!req.session.user) {
      res.status(403).json({ msg: "Login first to perform this action!" });
    } else {
      next();
    }
  };

//get all the followers or followedBy

router.get("/", isAuthenticated, (req,res)=>{
    followedBy.findAll().then(dbUsers=>{
        res.json(dbUsers)
    }).catch(err=>{
        res.status(500).json({msg:"oh no!",err})
    })
});

// not sure if needed
router.get("/logout",(req,res)=>{
    req.session.destroy();
    res.send("logged out!")
});

//finds all the follower of current user
router.get("/:id",(req,res)=>{
    followedBy.findAll({
        where:{
            userId:req.session.user.id,
        },
        include:[User]
    }).then(dbfollow=>{
        if(!dbfollow){
            res.status(404).json({msg:"no such follower!"})
        } else{
            res.json(dbfollow)
        }
    }).catch(err=>{
        res.status(500).json({msg:"oh no!",err})
    })
});

//create a follower
router.post('/', isAuthenticated, async (req, res) => {
    followedBy.create(
        {
            UserId: req.body.FollowId, //id of the person following
            FollowId: req.session.user.id,  //id of current user
            // doYouFollow: true,
        }
    ).then((newfollow) => {
        res.json(newfollow);
      })
      .catch((err) => {
        res.status(500).json({ msg: "oh no!",err});
      });
  });

// for rendering not sure if need it
  router.get(`/:userId/followedBy/display`, isAuthenticated, async (req,res)=>{
    try{
      const userId = req.params.userId;
      console.log(`I am handlebar ${req.params.userId}` );
      // console.log(res.json());
      const followers = await followedBy.findAll({
        where: { followed_user_id: userId },
        include: [{ model: User, as: 'followers' }], 
      }).then(dbFollower=>{
        console.log(`----------------------------------------------------++----------------`);
        console.log(dbFollower);
        // res.render("followers",{
        //    followers:dbFollower
        // });
        // res.json(dbFollower);
      });
    }
    catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
    // res.render("followers",{
    //   // followers:
    // });
  });
  
  router.get('/:userId/followedBy', isAuthenticated, async (req, res) => {
    try {
      const userId = req.params.userId;
      // console.log(`-------------------- ${userId}`);
      const followers = await follow.findAll({
        where: { followed_user_id: userId },
        include: [{ model: User, as: 'followers' }], 
      }).then(dbFollower=>{
        // console.log(`----------------------------------------------------++----------------`);
        // console.log(dbFollower[0].followers.dataValues);
        // res.render("followers",{
        //   followers:dbFollower[0].followers.dataValues
        // });
        res.json(dbFollower);
      });
      // console.log(`----------------------------------------------------++----------------`);
      // console.log(followers[0].following_user_id);
      // isMyFollower();
      //find the user using the routes
      // router.get(`/api/users/2` ,(req,res)=>{
      //   console.log("__________WHy don't you work??__________");
      //   console.log(res);
      // });
      // res.render("followers");
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

//for unfollow (not using it yet)
router.put("/:id", isAuthenticated, (req, res) => {
    followedBy.update(
      {
        following_user_id: req.body.following_user_id,
        followed_user_id: res.session.user.id,
        // doYouFollow: false,
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


// delete a follower
router.delete("/:id", isAuthenticated, (req, res) => {
  followedBy.destroy({
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