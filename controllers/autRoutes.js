const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const session = require("express-session");
const {User,Likes, Posts} = require('../models');
// require("dotenv").config();
// const exphbs = require("express-handlebars");
// const sequelize = require("./config/connection");
// const allRoutes = require("./controllers");

// const express = require("express");
// const session = require("express-session");

// const SequelizeStore = require("connect-session-sequelize")(session.Store);
// Registration route
router.post("/register", (req, res) => {
  const { username, password } = req.body;

  bcrypt.hash(password, saltRounds, (err, hash) => {});
});

//session data

router.get("/sessiondata",(req,res)=>{
  res.json(req.session)
})  


router.get("/signup",(req,res)=>{
    res.render("signup")
});

router.get("/login",(req,res)=>{
    res.render("login");
});

router.get("/logout",(req,res)=>{
    res.render("logout");
});

// Login route

router.post("/login",(req,res)=>{
    //1. find the user who is trying to login
    res.render("login");
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
// app.post("/login", (req, res) => {
//   const { username, password } = req.body;

//   bcrypt.compare(password, hashedPassword, (err, result) => {
//     if (result) {
//     } else {
//     }
//   });
// });

// const { body, validationResult } = require("express-validator");

// app.post(
//   "/register",
//   [body("username").isLength({ min: 5 }), body("password").isStrongPassword()],
//   (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//   }
// );

//---------------------------------------------------------
//app part

// const app = express();
// const PORT = process.env.PORT || 3000;
// // Requiring our models for syncing
// const sess = {
//   secret: "Super secret secret",
//   cookie: {
//     maxAge: 1000 * 60 * 60 * 2,
//   },
//   resave: false,
//   saveUninitialized: true,
//   store: new SequelizeStore({
//     db: sequelize,
//   }),
// };

// app.use(session(sess));

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// app.use(express.static("public"));

// const hbs = exphbs.create({});
// app.engine("handlebars", hbs.engine);
// app.set("view engine", "handlebars");

// app.use("/", allRoutes);

// sequelize.sync({ force: false }).then(function () {
//   app.listen(PORT, function () {
//     console.log("App listening on PORT " + PORT);
//   });
// });

//---------------------------------------------------------

// app.use(
//   session({
//     secret: "your-secret-key",
//     resave: false,
//     saveUninitialized: false,
//     store: new SequelizeStore({
//       db: sequelize,
//     }),
//   })
// );

module.exports = router;