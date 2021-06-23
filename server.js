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

io.on("connection", (socket) => {
    socket.emit("me",socket.id)

    socket.on("disconnect", () => {
        socket.broadcast.emit("callEnded")
    })

    socket.on("callUser", (data) => {
        io.to(data.userToCall).emit("callUser",{signal: data.signalData,from: data.from, name:data.name})
    })

    socket.on("answerCall", (data) =>{
        io.to(data.to).emit("callAccepted",data.signal)
    })
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
app.get("/", (req, res) => {
    res.send("Hello");
});
app.use("/users", require("./routes/user"));
if( process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    app.get('*', (req,res) => {
        res.sendFile(path.join(__dirname,'client/build/index.html'));
    });
}
app.get("/hello",(req,res)=>{
    res.send("Success");
})
const port = process.env.PORT || 5000
server.listen(port, () => console.log(`server is running on port ${port}`));

