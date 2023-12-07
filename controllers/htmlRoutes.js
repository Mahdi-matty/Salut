const express = require("express");
const router = express.Router();
const {User,Posts, Likes, Follow, followedBy, followsTo} = require("../models");
const bcrypt = require("bcrypt");

// router.get("/", (req, res)=>{
//     Posts.findAll().then(dbPosts=>{
//         const hbsPosts = dbPosts.map(post=>post.toJSON());
//         res.render("home",{
//             posts:hbsPosts
//         });
//     }).catch(err=>{
//         res.status(500).json({msg:"oh no!",err})
//     })

// });

// router.get("/",(req,res)=>{
//     try {
//         // res.render("home");
//         User.findAll({
//             include:[Posts, Likes]
//         }).then(dbPosts=>{
            
//             const hbsPosts = dbPosts.map(post=>post.toJSON());
//             console.log("################################");
//             console.log(dbPosts);
//             res.render("home",{
//                 users:hbsPosts
//             })
//         })
//       } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//       }
// });

// working version
router.get("/",(req,res)=>{
    try {
        // res.render("home");
        Posts.findAll({
            include:[User]
        }).then(dbPosts=>{
            const hbsPosts = dbPosts.map(post=>post.toJSON());
            console.log(hbsPosts);
            res.render("home",{
                posts:hbsPosts
            })
        });
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
});

router.get("/:userId/followers",(req,res)=>{    
    if(!req.session.user){
        res.redirect("/login")
    } else {
        res.render("follow",{
            username:req.session.user.username
        })  
    }
})

router.get("/:userId/following",(req,res)=>{
    if(!req.session.user){
        res.redirect("/login")
    } else {
        res.render("follow",{
            username:req.session.user.username
        })  
    } 
});

router.get("/sessiondata",(req,res)=>{
    res.json(req.session)
  })  

router.get("/logout",(req,res)=>{
    req.session.destroy();
    res.render("logout")
})

router.get("/signup",(req,res)=>{
    res.render("signup")
});

router.get("/login",(req,res)=>{
    
    res.render("login");

})


router.post("/login",(req,res)=>{
    User.findOne({
        where:{
            username:req.body.username,
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

router.get("/profile",(req,res)=>{
    if(!req.session.user){
        res.redirect("/login")
    } else {
        User.findByPk(req.session.user.id,{
            include:[Follow, Posts, Likes, followedBy, followsTo]
        }).then(dbUser=>{
            const hbsUser = dbUser.toJSON();
            console.log('my hbsUsers: ',hbsUser)
            res.render("profile",{
                users:hbsUser
            })  
        }).catch(err=>{
            res.status(500).json({msg:"oh no!",err})
        })
    }
});
router.get("/:userId/chatroom",(req,res)=>{    
    if(!req.session.user){
        res.redirect("/login")
    } else {
        res.render("chatroom",{
            username:req.session.user.username
        })  
    }
})
router.get("/:userId/inbox",(req,res)=>{    
    if(!req.session.user){
        res.redirect("/login")
    } else {
        res.render("inbox",{
            username:req.session.user.username
        })  
    }
})

module.exports = router;