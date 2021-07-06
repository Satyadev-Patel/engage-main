import React from "react";
import Message from "./Message";
import { useState, useEffect } from "react";
import { useStyles } from "./style";
import axios from "axios";
import { Button, TextField, Container } from "@material-ui/core";
const Chat = (props) => {
  const classes = useStyles();
  const user = JSON.parse(window.sessionStorage.getItem("user"));
  const [output, setOutput] = useState([]);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const requestObj = { roomID: props.room };

    // Loading the previous chat data

    axios
      .post("http://localhost:5000/chats/chat_data", requestObj)
      .then(function (response) {
        if (response["data"]["msg"] === "success") {
          let allChats = response["data"]["allChats"];
          if (allChats != null) {
            allChats.map((chat) => {
              delete chat._id;
              delete chat.createdAt;
              delete chat.updatedAt;
              delete chat.__v;
            });
            setOutput(allChats);
          }
        }
      })
      .catch(function (error) {
        console.log(error);
        window.alert("Invalid Credenital!!");
      });

    // Receiving message from the user present in room through WebSockets
    props.socketRef.current.on("recevied msg", (data) => {
      setOutput((msgs) => [...msgs, data]);
    });
  }, []);
  const userDetail = {
    room: props.room,
    name: user["firstName"],
  };
  const onSend = () => {
    const obj = {
      handle: userDetail.name,
      message: message,
      room: userDetail.room,
      roomName: props.roomName,
    };

    //Sending the message with the help of WebSocket
    props.socketRef.current.emit("send msg", obj);
    setMessage("");
  };
  return (
    <div style={{ color: "#fff" }}>
      <Container style={{ borderRadius: "5px", border: "1px solid #fff" }}>
        <h2>Chat</h2>
        <div
          className={classes.chatWindow}
          style={{
            marginTop: "15px",
            marginBottom: "15px",
            maxWidth: "inherit",
          }}
        >
          {output.length > 0 ? <Message texts={output} /> : "No messages"}
        </div>
      </Container>
      <TextField
        id="outlined-basic"
        label="Message"
        type="text"
        variant="outlined"
        className={classes.outfield}
        InputProps={{
          className: classes.txtfield,
        }}
        InputLabelProps={{
          className: classes.txtfield,
        }}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ marginTop: "30px", width: "300px" }}
      />
      <br />
      <Button
        variant="contained"
        color="white"
        className={classes.btn}
        onClick={onSend}
        style={{ width: "20%", marginBottom: "10px", marginTop: "0px" }}
      >
        <h3 style={{ marginBottom: "0px", marginTop: "0px" }}>Send</h3>
      </Button>
    </div>
  );
};

export default Chat;
