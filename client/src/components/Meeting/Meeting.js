import Button from "@material-ui/core/Button";
import Peer from "simple-peer";
import io from "socket.io-client";
import { Container, Grid } from "@material-ui/core";
import { useStyles } from "./styles";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import{ Card, List, ListItem,Typography, Divider, ListItemText} from '@material-ui/core';
import { v1 as uuid } from "uuid";

const Video = (props) => {
  const ref = useRef();

  useEffect(() => {
      props.peer.peer.on("stream", stream => { 
          ref.current.srcObject = stream;
      })
  });

  return (
      <Grid item>
          <video
          playsInline ref={ref} autoPlay style={{ borderRadius: "5px",padding: "2px",width: "300px",border: "1px solid #fff"}}/>
          <Typography style={{color : "#fff",fontFamily:"Poppins"}}>{props.peer.name}</Typography>
      </Grid>
      
  );
}

const Meeting = (props) => {
  const classes = useStyles();
  const user = JSON.parse(window.sessionStorage.getItem("user"));
  const userVideo = useRef();
  const [muteVid,setMuteVid] = useState(false)
  const [muteMic,setMuteMic] = useState(false)
  const [isAudio,setAudio]=useState(false);
  const [peers, setPeers] = useState([]);
  const socketRef = useRef();
  const peersRef = useRef([]);
  const [stream, setStream] = useState();
  const roomID = props.match.params.roomID;;
  const userDetail={
    room:roomID,
    name:user["firstName"],
}
console.log(userDetail);
  useEffect(()=>{
    window.onbeforeunload =()=>{
       if(socketRef.current){
           socketRef.current.close();
       } 
       setPeers([]);
    }
  })
  const wantsToJoin=()=>{
    socketRef.current = io.connect("https://polar-journey-62609.herokuapp.com/");
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
        userVideo.current.srcObject = stream;
        setStream(stream);
        socketRef.current.emit("join room", userDetail);
        socketRef.current.on("all users", users => {
            const peers = [];
            users.forEach(user => {
                const peer = createPeer(user.socketID, socketRef.current.id, stream);
                peersRef.current.push({
                    peerID: user.socketID,
                    peer,
                    name:user.name,
                    GID:user.GID
                })
                peers.push(peer);
            })
            setPeers(peers);
        })

        socketRef.current.on("user joined", payload => {
            const peer = addPeer(payload.signal, payload.callerID, stream);
            peersRef.current.push({
                peerID: payload.callerID,
                peer,
                name:payload.name,
                GID:payload.GID
            })

            setPeers(users => [...users, peer]);
        });

        socketRef.current.on("receiving returned signal", payload => {
            const item = peersRef.current.find(p => p.peerID === payload.id);
            item.peer.signal(payload.signal);
        });

        socketRef.current.on("user left",id=>{
            console.log("Called...");
            const peerObj=peersRef.current.find(p=>p.peerID===id);
            if(peerObj){
                peerObj.peer.destroy();
            }
            let remaining=[];
            peersRef.current.forEach(row=>{
                if(row.peerID!==id){
                    remaining.push(row.peer);
                }
            })
            const peers = peersRef.current.filter(p=>p.peerID!==id);
            peersRef.current=peers;
            setPeers(remaining);
        })

    })
  }
  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
        initiator: true,
        trickle: false,
        stream,
    });


    peer.on("signal", signal => {
        socketRef.current.emit("sending signal", { userToSignal, callerID, signal,name:user["firstName"]})
    })

    return peer;
  }
  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
        initiator: false,
        trickle: false,
        stream,
    })

    peer.on("signal", signal => {
        socketRef.current.emit("returning signal", { signal, callerID })
    })

    peer.signal(incomingSignal);

    return peer;
  }
  const HandleAudio=()=>{
    //Wants To Leave
    if(isAudio){
        window.location.reload();
    }
    //Wants to Join
    else{
        wantsToJoin();
        setAudio(true);
    }
  }
  const muteVideo = () => {
    stream.getVideoTracks().forEach(track => track.enabled = !track.enabled);
    setMuteVid(!muteVid);
  }

  const muteAudio = () => {
    setMuteMic(!muteMic);
    stream.getAudioTracks().forEach(track => track.enabled = !track.enabled);
  }
  return (
    <div className={classes.root}>
        <List>
        <Button variant="contained" color="primary" onClick={HandleAudio} className={classes.btn}>
                   {isAudio?"Leave Stream":"Join Stream"}
        </Button>
        {isAudio && <><Button variant="contained" color="primary" onClick={muteAudio} className={classes.btn}>
                   {!muteMic ? "Mute" : "Unmute"}
        </Button><br/>
        <Button variant="contained" color="primary" onClick={muteVideo} className={classes.btn}>
                   {!muteVid ? "Disable Video" : "Enable Video"}
        </Button><br/></>}
        </List>
        <Container className={classes.videoContainer}>
                {isAudio?
                    <>
                        <Grid item><video
                            playsInline
                            ref={userVideo} 
                            autoPlay 
                            style={{ borderRadius: "5px",padding: "2px",width: "300px",border: "1px solid #fff"}}/>
                            <Typography style={{color : "#fff", fontFamily:"Poppins"}}>You</Typography></Grid>
                            
                        {peersRef.current.map((peer, index) => {
                            return (
                                <Video key={peer.peerID} peer={peer} />
                            );
                        })}
                    </>
                :null}
       </Container>

   </div>
);
};

export default Meeting;
