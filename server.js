const allRoutes = require('./controllers');
const session = require("express-session");
const express = require("express");
// const publicPath = require("./public");
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/connection');
const app = express();
const exphbs = require('express-handlebars');
// these two line are for socket.io you can coment them if you want 
const http = require('http').createServer(app);
const io=require('socket.io')(http);
const PORT = process.env.PORT || 3000;
const Room = require("./room");


app.use(express.static('public'));

// this like is also for socket.io setups 
const room = new Room();

io.on("connection", async (socket) => {
  const roomID = await room.joinRoom();
  socket.join(roomID);

  // Emit the list of usernames to the client when they join
  io.to(socket.id).emit("user-list", room.getUsernames(roomID));

  // Emit the list of usernames to all clients in the room
  io.to(roomID).emit("user-list", room.getUsernames(roomID));
  console.log("Emitted User List:", room.getUsernames(roomID));

  const username = "Guest" + Math.floor(Math.random() * 1000);
  room.addUserToRoom(roomID, username);

  socket.on("send-message", ({ text, sender }) => {
    socket.to(roomID).emit("receive-message", { text, sender });
  });

  socket.on("disconnect", () => {
    const userRoomID = room.joinRoom(socket.id);
    if (userRoomID) {
      room.leaveRoom(userRoomID);
      room.removeUserFromRoom(userRoomID, username);
      io.to(userRoomID).emit("user-list", room.getUsernames(userRoomID));
    }
  });
});

const { User,Likes, Posts} = require('./models');

// you can change secret or move it to env file if you want 
const sess = {
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge:1000*60*60*2
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};
app.use(session(sess));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const hbs = exphbs.create({
    helpers: {
      processTitle: function (title) {
        console.log('Title:', title);
        if (typeof title === 'string' && title.trim() !== '') {
          const words = title.split(" ");
          return words.map(word => {
            return {
              word: word,
              isHashTag: word.startsWith('#')
            };
          });
          } else {
            return [];
          }
        }
      }
    });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use('/',allRoutes);

// if you are about to comment socket.io part please change http to app here 
sequelize.sync({ force: false }).then(function() {
    http.listen(PORT, function() {
        console.log('App listening on PORT ' + PORT);
    });
});