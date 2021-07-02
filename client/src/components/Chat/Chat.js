import React from 'react'
import Message from './Message';
import { useState,useEffect,useRef } from 'react';
import { useStyles } from './style'
import { Button,TextField,List,ListItem } from '@material-ui/core';
import io from "socket.io-client";
const Chat = (props) => {
    const classes = useStyles();
    const [message,setMessage] = useState("");
    const [output,setOutput] = useState([]);
    const socketRef = useRef();
    const user = JSON.parse(window.sessionStorage.getItem("user"));
    const userDetail={
        room:props.roomID,
        name:user["firstName"]
    }

    useEffect(() => {
       

        socketRef.current=io.connect("http://localhost:5000/");
        socketRef.current.emit("join chat room",userDetail);

        socketRef.current.on('recevied msg',(data)=>{
            setOutput((msgs)=>[...msgs,data]);
        });

    },[]);

    const onSend = () => {
        const obj={
            handle:userDetail.name,
            message:message,
            room:props.roomID
        }
        socketRef.current.emit('send msg',obj);
    }

    return (
        <div style={{color:"#fff"}}>
            <h2>Chat</h2>
            <List className={classes.chatWindow}>
                    {
                        output.length > 0 ? (
                            <ListItem><Message texts={output} /></ListItem>
                        ): (
                            "No messages"
                        )                        
                    }
            </List>
            <TextField
                id="outlined-basic"
                label="Message"
                type="text"
                variant="outlined"
                className={classes.outfield}
                InputProps={{
                    className: classes.txtfield
                }}
                InputLabelProps={{
                    className: classes.txtfield
                }}
                onChange={(e) => setMessage(e.target.value)}
                style={{ marginTop: "30px", width:"300px" }}
            /><br/>
            <Button
                variant="contained"
                color="white"
                className={classes.btn}
                onClick={onSend}
                style={{width:"20%",marginBottom:"10px", marginTop:"0px"}}
                >
                <h3 style ={{marginBottom:"0px", marginTop:"0px"}}>Send</h3>
            </Button>
        </div>
    )
}

export default Chat
