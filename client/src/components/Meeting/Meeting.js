import Button from "@material-ui/core/Button";
import Peer from "simple-peer";
import io from "socket.io-client";
import { Container, Grid } from "@material-ui/core";
import { useStyles } from "./styles";
import React, { useEffect, useRef, useState } from "react";
import { List, Typography, TextField } from "@material-ui/core";
import axios from "axios";
import Chat from "../Chat/Chat";

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
          width: "300px",
          border: "1px solid #fff",
          transform: "rotateY(180deg)",
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
  const [joinChat, setJoinChat] = useState(false);
  const [muteVid, setMuteVid] = useState(false);
  const [muteMic, setMuteMic] = useState(false);
  const [isJoin, setJoin] = useState(false);
  const [peers, setPeers] = useState([]);
  const [output, setOutput] = useState([]);
  const [fullRoom, setFullRoom] = useState(false);
  const socketRef = useRef();
  const chatsocketRef = useRef();
  const peersRef = useRef([]);
  const [stream, setStream] = useState();
  const [inviteEmail, setInviteEmail] = useState("");

  // Extracting the parameters from the URL

  const roomID = props.match.params.roomID;
  const roomName = props.match.params.roomName;
  const userDetail = {
    roomName: roomName,
    email: user["email"],
    room: roomID,
    name: user["firstName"],
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
      .post("http://localhost:5000/users/send_mail", requestObj)
      .then(function (response) {
        console.log(response["data"]["msg"]);
      })
      .catch(function (error) {
        console.log(error);
        window.alert("Invalid Credenital!!");
      });
  };

  // Sending a text message through WebSocket

  const onSend = (message) => {
    if (!socketRef.current)
      socketRef.current = io.connect("http://localhost:5000/");
    const obj = {
      handle: userDetail.name,
      message: message,
      room: userDetail.room,
    };
    socketRef.current.emit("send msg", obj); // Sending the message
    socketRef.current.on("recevied msg", (data) => {
      // Receiving the message and updating the chat window
      console.log(data);
      setOutput((msgs) => [...msgs, data]);
    });
  };
  const wantsToJoin = () => {
    if (!socketRef.current)
      socketRef.current = io.connect("http://localhost:5000/"); // WebSocket connection
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
    chatsocketRef.current = io.connect("http://localhost:5000/");
    setJoinChat(true);
    chatsocketRef.current.emit("join chat room", userDetail);
  };
  const HandleAudio = () => {
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
  return (
    <Grid className={classes.root}>
      {fullRoom ? (
        <h1 style={{ color: "#fff" }}>Room is full</h1>
      ) : (
        <>
          <List style={{ width: "40%" }}>
            {isJoin && (
              <Button
                variant="contained"
                style={{ backgroundColor: "#FF2E2E", color: "white" }}
                onClick={HandleAudio}
                className={classes.btn}
              >
                <h3 className={classes.head}>Leave Stream</h3>
              </Button>
            )}
            <br />
            {isJoin && (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={muteAudio}
                  className={classes.btn}
                >
                  <h3 className={classes.head}>
                    {!muteMic ? "Mute" : "Unmute"}
                  </h3>
                </Button>
                <br />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={muteVideo}
                  className={classes.btn}
                >
                  <h3 className={classes.head}>
                    {!muteVid ? "Disable Video" : "Enable Video"}
                  </h3>
                </Button>
                <br />
                {isJoin && (
                  <>
                    <TextField
                      id="outlined-basic"
                      label="Email"
                      type="email"
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
                        marginTop: "20px",
                        marginLeft: "10px",
                        width: "300px",
                      }}
                    />
                    <br />
                    <Button
                      variant="contained"
                      color="white"
                      className={classes.btn}
                      style={{ width: "50%" }}
                      onClick={sendMail}
                    >
                      <h3 style={{ marginBottom: "0px", marginTop: "0px" }}>
                        Send an Invite
                      </h3>
                    </Button>
                  </>
                )}
                <br />
              </>
            )}
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
                  <Typography style={{ color: "#fff", fontFamily: "Poppins" }}>
                    You
                  </Typography>
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
                  onClick={HandleAudio}
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
                <Chat
                  room={roomID}
                  onSend={onSend}
                  output={output}
                  socketRef={chatsocketRef}
                  roomName={roomName}
                />
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={joinchat}
                  className={classes.btn}
                  style={{ width: "40%" }}
                >
                  <h3 style={{ marginBottom: "0px", marginTop: "0px" }}>
                    Join Chat
                  </h3>
                </Button>
              )}
            </Container>
          }
        </>
      )}
    </Grid>
  );
};

export default Meeting;
