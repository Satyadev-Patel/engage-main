const express = require("express")
const http = require("http")
const app = express()
const server = http.createServer(app)
const cors = require("cors")
const passport = require("passport");
const dotnev = require("dotenv");
const connectDB = require("./config/db.js");
const path = require("path");
const bodyParser = require("body-parser");
dotnev.config({ path: "./config/config.env" });
app.use(cors());

const io = require("socket.io")(server,{
    cors: { 
        origin: "*",
        methods: ["GET","POST"]
    }
})

const users = {};

const socketToRoom = {};

io.on("connection", (socket) => {
    console.log(users);
    socket.on("join room", userDetail => {
        roomID=userDetail.room;
        const info={
            socketID:socket.id,
            name:userDetail.name,
        }
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
        socketToRoom[socket.id] = roomID;
        const usersInThisRoom = users[roomID].filter((X) => X.socketID !== socket.id);
        socket.emit("all users", usersInThisRoom);
    });

    socket.on("sending signal", payload => {
        io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID, name:payload.name, GID: payload.GID });
    });

    socket.on("returning signal", payload => {
        io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
    });

    socket.on('disconnect', () => {
        //console.log("Called....");
        const roomID = socketToRoom[socket.id];
        let room = users[roomID];
        if (room) {
            room = room.filter((row) => row.socketID !== socket.id);
            users[roomID] = room;
        }
        socket.broadcast.emit('user left',socket.id);
    });
})

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
app.post("/find_id",(req,res,next)=>{
    if (!req.is("application/json")) {
        return next(new errors.InvalidContentError("Expects 'application/json'"));
    }
    try {
    const data = req.body;
        if(users[data["roomID"]]){
            res.send(201);
        }
        else res.send("ID not found");
    } catch (err) {
        res.render("error/500");
    }
})
app.use("/users", require("./routes/user"));
app.use("/event", require("./routes/event"));
if( process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    app.get('*', (req,res) => {
        res.sendFile(path.join(__dirname,'client/build/index.html'));
    });
}
const port = process.env.PORT || 5000
server.listen(port, () => console.log(`server is running on port ${port}`));

