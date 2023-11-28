const bcrypt = require("bcrypt");

// Registration route
app.post("/register", (req, res) => {
  const { username, password } = req.body;

  bcrypt.hash(password, saltRounds, (err, hash) => {});
});

// Login route
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  bcrypt.compare(password, hashedPassword, (err, result) => {
    if (result) {
    } else {
    }
  });
});

const { body, validationResult } = require("express-validator");

app.post(
  "/register",
  [body("username").isLength({ min: 5 }), body("password").isStrongPassword()],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  }
);
require("dotenv").config();
const sequelize = require("./config/connection");
const express = require("express");
const exphbs = require("express-handlebars");
const allRoutes = require("./controllers");
const session = require("express-session");

const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3000;
// Requiring our models for syncing
const sess = {
  secret: "Super secret secret",
  cookie: {
    maxAge: 1000 * 60 * 60 * 2,
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

const hbs = exphbs.create({});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use("/", allRoutes);

sequelize.sync({ force: false }).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});

const session = require("express-session");

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({
      db: sequelize,
    }),
  })
);

