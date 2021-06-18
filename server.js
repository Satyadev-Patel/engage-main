require("dotenv").config();
const express = require("express")
const http = require("http");
const path = require("path");
const app = express()
const cors = require("cors")
const server = http.createServer(app)
const io = require("socket.io")(server,{
    cors: {
        origin: "https://polar-journey-62609.herokuapp.com:3000",
        methods: ["GET","POST"]
    }
})
app.use(cors());
io.on("connection", (socket) => {
    console.log(`${socket.id}`);
    console.log("Success");
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

if(process.env.NODE_ENV == "production"){
    app.use(express.static(path.join(__dirname,'./client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname,'./client/build/index.html'));
    });
}

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`server is running on port ${port}`))