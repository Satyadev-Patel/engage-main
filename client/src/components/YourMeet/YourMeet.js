import React from "react";
import { useStyles } from "./styles";
import { useEffect, useState } from "react";
import Single from "./Single";
import axios from "axios";
import { AppBar, Toolbar, Container, List, Button } from "@material-ui/core";
require("dotenv").config();
const URL = "https://nanosoft-teams.herokuapp.com";

// Load all the past meetings of user

const YourMeet = (props) => {
  const classes = useStyles();
  const user = JSON.parse(window.sessionStorage.getItem("user"));
  const [allMeets, setAllMeets] = useState([]); // Data of all the meets of the current user
  const [open, setOpen] = useState(false); // Flag to toggle the Meet Data container
  const [curMeet, setCurMeet] = useState(); // To store which meet is currently selected
  useEffect(() => {
    const requestObj = { email: user["email"] };

    // API call to load the meetings from database

    axios
      .post(`${URL}/users/meetings`, requestObj)
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
        window.alert("Some error occured");
      });
  }, []);

  // Delete a meeting

  const onDelete = (id) => {
    setAllMeets(allMeets.filter((meet) => meet.meetID !== id));
    const requestObj = { meetID: id, email: user["email"] };
    axios.post(`${URL}/users/delete_meet`, requestObj);
  };

  // Display the details of the selected meeting

  const onDetails = (id) => {
    if (!open || id !== curMeet.meetID) {
      const meet = allMeets.filter((meet) => meet.meetID === id);
      const single = meet[0];
      const istDate = new Date(single.date).toString();
      single.time = istDate;
      setCurMeet(single);
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const goHome = () => {
    props.history.push("/");
  };

  // UI

  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar className={classes.appbarWrapper}>
          <h1 className={classes.appbarTitle}>
            {user["firstName"]}'s Saved Meetings
          </h1>
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
            <h1
              style={{ color: "#fff", marginLeft: "100px", marginTop: "100px" }}
            >
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
              First Time Joined At:
              <br />
              <br />
              {curMeet.time}
            </h1>
          </div>
        )}
      </Container>
    </div>
  );
};

export default YourMeet;
