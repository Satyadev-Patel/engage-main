const express = require("express");
const http = require("http");
const app = express();
const Chat = require("./Models/Chat");
const Meetings = require("./Models/Meetings");
const server = http.createServer(app);
const cors = require("cors");
const passport = require("passport");
const dotnev = require("dotenv");
const connectDB = require("./config/db.js");
const path = require("path");
const bodyParser = require("body-parser");
dotnev.config({ path: "./config/config.env" });
app.use(cors());

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const users = {};
const roomToName = {};
const chat_users = {};
const chat_socketToRoom = {};
const socketToRoom = {};

io.on("connection", (socket) => {
  // Listener for sending a message to all the users present in the room

  socket.on("send msg", (data) => {
    const obj = {
      meetID: data["room"],
      message: data["message"],
      handle: data["handle"],
    };
    Chat.create(obj);

    // Sending the message to all the users

    chat_users[chat_socketToRoom[socket.id]].forEach((element) => {
      io.to(element.socketID).emit("recevied msg", data);
    });
  });

  // For event when user wants to join only the chat room

  socket.on("join chat room", (userDetail) => {
    roomID = userDetail.room;
    const info = {
      socketID: socket.id,
      name: userDetail.name,
    };

    // storing the info of user's socket in the room he is trying to join

    if (chat_users[roomID]) {
      chat_users[roomID].push(info);
    } else {
      chat_users[roomID] = [info];
    }

    // Storing which socket corresponds to which room

    chat_socketToRoom[socket.id] = roomID;
    roomToName[roomID] = userDetail.roomName;

    // Once the user joins the room. Storing its info to the database.
    // This will be used to access user's past meetings

    Meetings.find({ email: userDetail.email, meetID: userDetail.room }).then(
      (meeting) => {
        if (meeting.length == 0) {
          Meetings.create({
            email: userDetail.email,
            meetName: userDetail.roomName,
            meetID: userDetail.room,
          });
        }
      }
    );
  });

  // above event listener was for the case where user just wants to join the chat
  // but not the video stream
  // below is for joining the video stream

  socket.on("join room", (userDetail) => {
    roomID = userDetail.room;
    const info = {
      socketID: socket.id,
      name: userDetail.name,
    };
    if (users[roomID]) {
      const length = users[roomID].length;
      if (length === 4) {
        socket.emit("room full");
        return;
      }
      users[roomID].push(info);
    } else {
      users[roomID] = [info];
    }
    Meetings.find({ email: userDetail.email, meetID: userDetail.room }).then(
      (meeting) => {
        if (meeting.length == 0) {
          Meetings.create({
            email: userDetail.email,
            meetName: userDetail.roomName,
            meetID: userDetail.room,
          });
        }
      }
    );
    socketToRoom[socket.id] = roomID;
    roomToName[roomID] = userDetail.roomName;
    const usersInThisRoom = users[roomID].filter(
      (X) => X.socketID !== socket.id
    );
    socket.emit("all users", usersInThisRoom);
  });

  socket.on("sending signal", (payload) => {
    io.to(payload.userToSignal).emit("user joined", {
      signal: payload.signal,
      callerID: payload.callerID,
      name: payload.name,
      GID: payload.GID,
    });
  });

  socket.on("returning signal", (payload) => {
    io.to(payload.callerID).emit("receiving returned signal", {
      signal: payload.signal,
      id: socket.id,
    });
  });

  // deleting the info of user from the objects that we created
  // earlier for reference

  socket.on("disconnect", () => {
    const roomID = socketToRoom[socket.id];
    let room = users[roomID];
    if (room) {
      room = room.filter((row) => row.socketID !== socket.id);
      users[roomID] = room;
    }
    const roomID2 = chat_socketToRoom[socket.id];
    room = chat_users[roomID2];
    if (room) {
      room = room.filter((row) => row.socketID !== socket.id);
      chat_users[roomID2] = room;
    }
    socket.broadcast.emit("user left", socket.id);
  });
});

require("./config/passport")(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
connectDB();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, PUT, POST, DELETE, PATCH"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type Authorization");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// using the routes

app.use("/users", require("./routes/user"));
app.use("/chats", require("./routes/chats"));
app.use("/event", require("./routes/event"));

// deployment code

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
  });
}
const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`server is running on port ${port}`));
