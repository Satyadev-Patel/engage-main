import React from 'react'
import { useStyles } from './styles'
import { useEffect,useState } from 'react';
import axios from "axios"
import { AppBar,Toolbar } from '@material-ui/core';

const YourMeet = () => {
    const classes = useStyles();
    const user = JSON.parse(window.sessionStorage.getItem("user"));
    const [allMeets,setAllMeets] = useState([]);
    useEffect(() => {
        const requestObj = {email:user["email"]};
        axios
            .post("http://localhost:5000/users/meetings", requestObj)
            .then(function (response) {
                if (response["data"]["msg"] === "success") {
                    let meets = response["data"]["meetings"];
                    if(meets != null){
                        meets.map((event) => {
                            delete event._id;
                            delete event.email;
                            delete event.createdAt;
                            delete event.updatedAt;
                            delete event.__v;
                        });
                        setAllMeets(meets);
                    }
                }
            })
            .catch(function (error) {
                console.log(error);
                window.alert("Invalid Credenital!!");
            });
    }, [])
    return (
        <div className={classes.root}>
            <AppBar className={classes.appbar} elevation={0}>
                <Toolbar className={classes.appbarWrapper}>
                <h1 className={classes.appbarTitle}>
                    {user["firstName"]}'s Saved Meetings
                </h1>
                </Toolbar>
            </AppBar>
            {console.log(allMeets)}
        </div>
        
    )
}

export default YourMeet
