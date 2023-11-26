const allRoutes = require('./controllers');
const session = require("express-session");

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
// these two line are for socket.io you can coment them if you want 
const http = require('http').createServer(app);
const io=require('socket.io')(http);


const PORT = process.env.PORT || 3000;

// this like is also for socket.io setups 
io.on("connection", function(socket){
    io.emit("user connected");
    socket.on("message", function(msg){
        io.emit("message", msg);
    });
});

const { User,Likes, Posts} = require('./models');

// you can change secret or move it to env file if you want 
const sess = {
    secret: 'Super secret secret',
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


const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use('/',allRoutes);

// if you are about to comment socket.io part please change http to app here 
sequelize.sync({ force: false }).then(function() {
    http.listen(PORT, function() {
        console.log('App listening on PORT ' + PORT);
    });
});