import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import AssignmentIcon from "@material-ui/icons/Assignment";
import PhoneIcon from "@material-ui/icons/Phone";
import React, { useEffect, useRef, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Peer from "simple-peer";
import io from "socket.io-client";
import { makeStyles, Grid } from "@material-ui/core";
import { useStyles } from "./styles";


//const socket = io.connect("http://localhost:5000");
const socket = io("https://polar-journey-62609.herokuapp.com/");

const Meeting = () => {
  const classes = useStyles();
  const user = JSON.parse(window.sessionStorage.getItem("user"));
  const [muteVid,setMuteVid] = useState(false)
  const [muteMic,setMuteMic] = useState(false)
  const [me, setMe] = useState("");
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState(user["firstName"]);

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        setStream(stream);
        myVideo.current.srcObject = stream;
      });

    socket.on("me", (id) => {
      console.log(`${id}`)
      setMe(id);
    });

    socket.on("callUser", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    });
  }, []);

  const callUser = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name: name,
      });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });
    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: caller });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
  };

  const muteVideo = () => {
    stream.getVideoTracks().forEach(track => track.enabled = !track.enabled);
    setMuteVid(!muteVid);
  }

  const muteAudio = () => {
    setMuteMic(!muteMic);
    stream.getAudioTracks().forEach(track => track.enabled = !track.enabled);
  }
  
  return (
    <Grid className={classes.root}>
        <div className={classes.videoContainer}>
          <div className="video">
            {stream && (
              <video
                playsInline
                muted
                ref={myVideo}
                autoPlay
                style={{ borderRadius: "5px",
                  padding: "2px",
                  width: "450px",
                  border: "1px solid #fff"}}
              />
            )}
          </div>
          <div className="video">
            {callAccepted && !callEnded ? (
              <video
                playsInline
                ref={userVideo}
                autoPlay
                style={{ borderRadius: "5px",
                  padding: "2px",
                  width: "450px",
                  border: "1px solid #fff"}}
              />
            ) : null}
          </div>
        </div>
        <div className={classes.myId}>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            className={classes.outfield}
            InputProps={{
              className: classes.txtfield
            }}
            InputLabelProps={{
              className: classes.txtfield
            }}
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ marginBottom: "20px" }}
          />
          <CopyToClipboard text={me} style={{ marginBottom: "20px", fontFamily:"Poppins" }}>
            <Button
              variant="contained"
              color="white"
              startIcon={<AssignmentIcon fontSize="large" />}
            >
              Copy ID
            </Button>
          </CopyToClipboard>

          <TextField
            id="outlined-basic"
            label="ID to call"
            variant="outlined"
            className={classes.outfield}
            InputProps={{
              className: classes.txtfield
            }}
            InputLabelProps={{
              className: classes.txtfield
            }}
            value={idToCall}
            onChange={(e) => setIdToCall(e.target.value)}
            style={{ marginBottom: "20px" }}
          />
          <Button variant="contained" color="secondary" onClick={muteVideo} style={{ marginBottom: "10px", fontFamily:"Poppins" }}>
                {!muteVid ? "Disable Video" : "Enable Video"}
          </Button>
          <Button variant="contained" color="secondary" onClick={muteAudio} style={{ fontFamily:"Poppins" }}>
                {!muteMic ? "Mute Audio" : "Unmute"}
          </Button>
          <div className={classes.callButton}>
            {callAccepted && !callEnded ? (
              <div>
              <Button variant="contained" color="secondary" onClick={leaveCall}>
                End Call
              </Button>
              
            </div>
            ) : (
              <IconButton
                aria-label="call"
                color="primary"
                onClick={() => callUser(idToCall)}
              >
                <PhoneIcon fontSize="large" />
              </IconButton>
            )}
             
          </div>
        </div>
        <br/>
        <div>
          {receivingCall && !callAccepted ? (
            <div className={classes.caller}>
              <h1>{name} is calling...</h1>
              <Button variant="contained" color="white" onClick={answerCall} style={{ marginBottom: "10px", fontFamily:"Poppins" }}>
                Answer
              </Button>
              <br/>
              <Button variant="contained" color="white">
                Reject
              </Button>
            </div>
          ) : null}
        </div>
    </Grid>
  );
};

export default Meeting;
