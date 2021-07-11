import Button from "@material-ui/core/Button";
import Peer from "simple-peer";
import io from "socket.io-client";
import { Container, Grid, AppBar, Toolbar } from "@material-ui/core";
import { useStyles } from "./styles";
import MicIcon from "@material-ui/icons/Mic";
import React, { useEffect, useRef, useState } from "react";
import MicOffIcon from "@material-ui/icons/MicOff";
import CallEndIcon from "@material-ui/icons/CallEnd";
import SendIcon from "@material-ui/icons/Send";
import VideocamOffIcon from "@material-ui/icons/VideocamOff";
import VideocamIcon from "@material-ui/icons/Videocam";
import { List, Typography, TextField } from "@material-ui/core";
import axios from "axios";
import Chat from "../Chat/Chat";
require("dotenv").config();
const URL = process.env.REACT_APP_LOCAL_URL;

//General function for video rendering of USERS in the current room

const Video = (props) => {
  const ref = useRef();

  useEffect(() => {
    props.peer.peer.on("stream", (stream) => {
      ref.current.srcObject = stream;
    });
  });

  return (
    <Grid item>
      <video
        playsInline
        ref={ref}
        autoPlay
        style={{
          borderRadius: "5px",
          padding: "2px",
          width: "350px",
          border: "1px solid #fff",
        }}
      />
      <Typography style={{ color: "#fff", fontFamily: "Poppins" }}>
        {props.peer.name}
      </Typography>
    </Grid>
  );
};

const Meeting = (props) => {
  const classes = useStyles();
  const user = JSON.parse(window.sessionStorage.getItem("user"));
  const userVideo = useRef();
  const [joinChat, setJoinChat] = useState(false); // flag for joining the chat without joining the stream
  const [muteVid, setMuteVid] = useState(false);
  const [muteMic, setMuteMic] = useState(false);
  const [isJoin, setJoin] = useState(false); // flag for joining the video stream
  const [peers, setPeers] = useState([]); // Peers present in the room
  const [output, setOutput] = useState([]); // Output on Chat window
  const [fullRoom, setFullRoom] = useState(false); // Flag for full Room
  const socketRef = useRef(); // Websocket for video stream
  const chatsocketRef = useRef(); // Websocket for chat
  const peersRef = useRef([]);
  const [stream, setStream] = useState(); // Video of the current user
  const [inviteEmail, setInviteEmail] = useState("");

  // Extracting the parameters from the URL
  const date = new Date().toISOString();
  const roomID = props.match.params.roomID;
  const roomName = props.match.params.roomName;
  const userDetail = {
    roomName: roomName,
    email: user["email"],
    room: roomID,
    name: user["firstName"],
    date: date,
  };
  useEffect(() => {
    window.onbeforeunload = () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
      setPeers([]);
      setJoinChat(false);
    };
  });

  // API call for sending an invite link through mail

  const sendMail = () => {
    const requestObj = {
      text: roomID,
      email: inviteEmail,
      name: user["firstName"],
    };
    axios
      .post(`${URL}/users/send_mail`, requestObj)
      .then(function (response) {
        window.alert(response["data"]["msg"]);
        setInviteEmail("");
      })
      .catch(function (error) {
        window.alert("Some Error occured");
      });
  };

  // Sending a text message through WebSocket

  const onSend = (message) => {
    if (!chatsocketRef.current) chatsocketRef.current = io.connect(`${URL}/`);
    const obj = {
      handle: userDetail.name,
      message: message,
      room: userDetail.room,
    };
    chatsocketRef.current.emit("send msg", obj); // Sending the message
    chatsocketRef.current.on("recevied msg", (data) => {
      // Receiving the message and updating the chat window
      setOutput((msgs) => [...msgs, data]);
    });
  };
  const wantsToJoin = () => {
    if (!socketRef.current) socketRef.current = io.connect(`${URL}/`); // WebSocket connection
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        userVideo.current.srcObject = stream;
        setStream(stream);
        socketRef.current.emit("join room", userDetail); // This event will be listened on Server side

        // Creating peer network for the users present in the stream

        socketRef.current.on("all users", (users) => {
          const peers = [];
          users.forEach((user) => {
            const peer = createPeer(
              user.socketID,
              socketRef.current.id,
              stream
            );
            peersRef.current.push({
              peerID: user.socketID,
              peer,
              name: user.name,
            });
            peers.push(peer);
          });
          setPeers(peers);
        });

        // Adding a user to the connection

        socketRef.current.on("user joined", (payload) => {
          const peer = addPeer(payload.signal, payload.callerID, stream);
          peersRef.current.push({
            peerID: payload.callerID,
            peer,
            name: payload.name,
          });
          setPeers((users) => [...users, peer]);
        });

        socketRef.current.on("receiving returned signal", (payload) => {
          const item = peersRef.current.find((p) => p.peerID === payload.id);
          item.peer.signal(payload.signal);
        });

        // Deleting the peer

        socketRef.current.on("user left", (id) => {
          const peerObj = peersRef.current.find((p) => p.peerID === id);
          if (peerObj) {
            peerObj.peer.destroy();
          }
          let remaining = [];
          peersRef.current.forEach((row) => {
            if (row.peerID !== id) {
              remaining.push(row.peer);
            }
          });
          const peers = peersRef.current.filter((p) => p.peerID !== id);
          peersRef.current = peers;
          setPeers(remaining);
        });

        // User won't be able to join after the room reaches its max capacity(i.e 4 in this Case, Could be changed from backend)

        socketRef.current.on("room full", () => {
          setFullRoom(true);
        });
      });
  };

  // Creating the peer using simple-peer library

  const createPeer = (userToSignal, callerID, stream) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("sending signal", {
        userToSignal,
        callerID,
        signal,
        name: user["firstName"],
      });
    });

    return peer;
  };

  // Adding the peer

  const addPeer = (incomingSignal, callerID, stream) => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("returning signal", { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  };

  // Joining the chat window through WebSocket

  const joinchat = () => {
    chatsocketRef.current = io.connect(`${URL}/`);
    setJoinChat(true);
    chatsocketRef.current.emit("join chat room", userDetail);
  };

  const HandleJoin = () => {
    //Wants To Leave
    if (isJoin) {
      window.location.reload();
    }
    //Wants to Join
    else {
      wantsToJoin();
      setJoin(true);
    }
  };

  const muteVideo = () => {
    stream
      .getVideoTracks()
      .forEach((track) => (track.enabled = !track.enabled));
    setMuteVid(!muteVid);
  };

  const muteAudio = () => {
    setMuteMic(!muteMic);
    stream
      .getAudioTracks()
      .forEach((track) => (track.enabled = !track.enabled));
  };

  const goHome = () => {
    props.history.push("/");
  };

  return (
    <Grid className={classes.root}>
      {!isJoin && !fullRoom && (
        <AppBar className={classes.appbar}>
          <Toolbar className={classes.appbarWrapper}>
            <h1 className={classes.appbarTitle}>Nanosoft Teams</h1>
            <Button
              className={classes.menu}
              size="large"
              color="primary"
              onClick={goHome}
              align="center"
            >
              Home
            </Button>
          </Toolbar>
        </AppBar>
      )}
      {fullRoom ? (
        <h1 style={{ color: "#fff" }}>Room is full</h1>
      ) : (
        <>
          <List style={{ width: "40%" }}>
            <br />
            {isJoin && <></>}
            <br />
          </List>
          <Container className={classes.videoContainer}>
            {isJoin ? (
              <>
                <Grid item>
                  <video
                    playsInline
                    ref={userVideo}
                    autoPlay
                    muted
                    className={classes.videoStyle}
                  />
                  <div style={{ color: "white" }}>
                    You
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={muteAudio}
                      style={{ width: "20%" }}
                      className={classes.btn}
                    >
                      {!muteMic ? <MicIcon /> : <MicOffIcon />}
                    </Button>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#FF2E2E", color: "white" }}
                      onClick={HandleJoin}
                      className={classes.btn}
                    >
                      <CallEndIcon />
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={muteVideo}
                      className={classes.btn}
                    >
                      {!muteVid ? <VideocamIcon /> : <VideocamOffIcon />}
                    </Button>
                  </div>
                </Grid>

                {peersRef.current.map((peer, index) => {
                  return <Video key={peer.peerID} peer={peer} />;
                })}
              </>
            ) : (
              <div>
                <h1 className={classes.title}>Welcome, {user["firstName"]}</h1>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={HandleJoin}
                  className={classes.btn}
                  style={{ width: "40%" }}
                >
                  <h3 style={{ marginBottom: "0px", marginTop: "0px" }}>
                    Join Stream
                  </h3>
                </Button>
              </div>
            )}
          </Container>
          {
            // User won't be able to access the chat until and unless the join Chat button is clicked
            // It is completely independent of whether the user is present in video call or not.
            <Container>
              {joinChat ? (
                <>
                  {joinChat && (
                    <Chat
                      room={roomID}
                      onSend={onSend}
                      output={output}
                      socketRef={chatsocketRef}
                      roomName={roomName}
                    />
                  )}
                </>
              ) : (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={joinchat}
                    className={classes.btn}
                    style={{ width: "40%", marginLeft: "0px" }}
                  >
                    <h3 style={{ marginBottom: "0px", marginTop: "0px" }}>
                      Join Chat
                    </h3>
                  </Button>
                  <br />
                </>
              )}
              {isJoin && (
                <>
                  <TextField
                    id="outlined-basic"
                    label="Email"
                    type="email"
                    value={inviteEmail}
                    variant="outlined"
                    className={classes.outfield}
                    InputProps={{
                      className: classes.txtfield,
                    }}
                    InputLabelProps={{
                      className: classes.txtfield,
                    }}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    style={{
                      marginTop: "10px",
                      width: "auto",
                    }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.btn}
                    onClick={sendMail}
                    style={{
                      width: "auto",
                      padding: "13px",
                      marginLeft: "10px",
                      marginTop: "10px",
                    }}
                  >
                    <h3 style={{ margin: "0px", padding: "0px" }}>
                      Invite to Room
                    </h3>
                  </Button>
                </>
              )}
            </Container>
          }
        </>
      )}
    </Grid>
  );
};

export default Meeting;
