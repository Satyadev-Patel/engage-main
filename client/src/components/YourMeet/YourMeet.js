import React from "react";
import { useStyles } from "./styles";
import { useEffect, useState } from "react";
import Single from "./Single";
import axios from "axios";
import {
  AppBar,
  Toolbar,
  Container,
  Grid,
  List,
  ListItem,
} from "@material-ui/core";
import { set } from "mongoose";

const YourMeet = () => {
  const classes = useStyles();
  const user = JSON.parse(window.sessionStorage.getItem("user"));
  const [allMeets, setAllMeets] = useState([]);
  const [open, setOpen] = useState(false);
  const [curMeet, setCurMeet] = useState();
  useEffect(() => {
    const requestObj = { email: user["email"] };
    axios
      .post("http://localhost:5000/users/meetings", requestObj)
      .then(function (response) {
        if (response["data"]["msg"] === "success") {
          let meets = response["data"]["meetings"];
          if (meets != null) {
            meets.map((event) => {
              delete event._id;
              delete event.email;
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
  }, []);
  const onDelete = (id) => {
    setAllMeets(allMeets.filter((meet) => meet.meetID !== id));
    const requestObj = { meetID: id, email: user["email"] };
    axios.post("http://localhost:5000/users/delete_meet", requestObj);
  };
  const onDetails = (id) => {
    if (!open || id !== curMeet.meetID) {
      const meet = allMeets.filter((meet) => meet.meetID === id);
      const single = meet[0];
      single.date = single.createdAt.substr(0, single.createdAt.length - 14);
      single.time = single.createdAt.substr(11);
      single.time = single.time.substr(0, single.time.length - 5);
      setCurMeet(single);
      setOpen(true);
    } else {
      setOpen(false);
    }
  };
  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar className={classes.appbarWrapper}>
          <h1 className={classes.appbarTitle}>
            {user["firstName"]}'s Saved Meetings
          </h1>
        </Toolbar>
      </AppBar>
      <Container className={classes.container}>
        <List>
          {allMeets.length > 0 ? (
            allMeets.map((meet) => (
              <Single
                name={meet.meetName}
                meetID={meet.meetID}
                onDelete={onDelete}
                onDetails={onDetails}
              />
            ))
          ) : (
            <h1 style={{ color: "#fff", marginLeft: "100px" }}>
              No meetings to Show
            </h1>
          )}
        </List>
      </Container>
      <Container style={{ width: "500px" }}>
        {open && (
          <div>
            <h1 style={{ color: "steelblue", fontSize: "3rem" }}>
              {curMeet.meetName}
            </h1>
            <h1 style={{ color: "#fff", fontSize: "1.5rem" }}>
              Created At:
              <br />
              <br />
              Date: {curMeet.date}
              <br />
              Time: {curMeet.time}
            </h1>
          </div>
        )}
      </Container>
    </div>
  );
};

export default YourMeet;
