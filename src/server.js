// // load .env data into process.env
// require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = require('./environment');
const express    = require("express");
const bodyParser = require("body-parser");
const app        = express();
const morgan     = require('morgan');
const passport = require('passport');
const cookieSession = require('cookie-session');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const cors = require('cors');
app.use(cors({credentials: true, origin: process.env.CLIENT_URL}));


// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

require('./services/passport')(db);

app.use(
  cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000,
      keys: ['xiutbgisergnpserigun']
  })
);

app.use(passport.initialize());

app.use(passport.session());

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const roomsRoutes = require("./routes/rooms");
const friendsRoutes = require("./routes/friends");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/users", usersRoutes(db));
app.use("/rooms", roomsRoutes(db));
app.use("/friends", friendsRoutes(db));
// app.use("/auth", authRoutes(db));
// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  res.send("{hello: world}");
});

io.on("connection", socket => {
  console.log("a user connected");

  let chatRoom;
  socket.on('room', (room) => {
    socket.join(room.roomId);
    chatRoom = room.roomId;

    io.of('/').in(chatRoom).clients((err, clients) => {
      console.log("number of people in room "+ chatRoom + " : " + clients.length);
    })
    // io.sockets.in(chatRoom).emit('play');
  })

  socket.on("play", () => {
    console.log(`socket ${socket.id} sent the play command`);
    // io.sockets.in(chatRoom).emit('play');
    socket.broadcast.to(chatRoom).emit('play');
  });

  socket.on('pause', () => {
    // io.sockets.in(chatRoom).emit('pause');
    socket.broadcast.to(chatRoom).emit('pause');
  })

  socket.on('seek', (time) => {
    // io.sockets.in(chatRoom).emit('seek', time);
    socket.broadcast.to(chatRoom).emit('seek', time);
  })

  socket.on('plays', () => {
    console.log("plays");
    socket.broadcast.to(chatRoom).emit('plays');
    // io.sockets.in(chatRoom).emit('plays');
  })

  socket.on('pauses', () => {
    console.log("pauses");
    // socket.broadcast.to(chatRoom).emit('pause');
    // io.sockets.in(chatRoom).emit('pauses');
    socket.broadcast.to(chatRoom).emit('pauses');
  })

  socket.on('test', () => {
    console.log("test");
    socket.broadcast.to(chatRoom).emit('test');
  })
});


server.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT} in ${ENV}`);
});
