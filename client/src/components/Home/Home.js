import Button from "@material-ui/core/Button";
import { TextField, Grid, Container, AppBar, Toolbar } from "@material-ui/core";
import { useState } from "react";
import { useStyles } from "./styles";
import axios from "axios";
import { v1 as uuid } from "uuid";
const Home = (props) => {
  const classes = useStyles();
  const [id, setId] = useState("");
  const user = JSON.parse(window.sessionStorage.getItem("user"));
  const [name, setName] = useState("");

  //Creating a room

  function create() {
    const values = { room: name, email: user["email"] };
    let idd = uuid();

    //Checking whether the user is already present in a room with the same name
    axios
      .post("http://localhost:5000/users/find_id", values)
      .then(function (response) {
        if (response["data"]["msg"] == "fail") {
          window.alert(
            "You already have an active meeting with this name. Please access it through 'Your Meetings' Tab"
          );
        } else {
          props.history.push(`/meeting/${idd}/${name}`);
        }
      })
      .catch(function (error) {
        console.log(error);
        window.alert("Invalid Credenital!!");
      });
  }

  //Joining a room

  const join = () => {
    const values = { roomID: id };

    //Checking whether the ID exists or not
    axios
      .post("http://localhost:5000/users/find_join_id", values)
      .then(function (response) {
        if (response["data"]["msg"] == "fail") {
          window.alert("Id not found");
        } else {
          props.history.push(`/meeting/${id}/${response["data"]["name"]}`);
        }
      })
      .catch(function (error) {
        console.log(error);
        window.alert("Some error occured");
      });
  };

  const goHome = () => {
    props.history.push("/");
  };
  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar}>
        <Toolbar className={classes.appbarWrapper}>
          <h1 className={classes.appbarTitle}>Microsoft Teams</h1>
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
        <Grid container>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              margin="normal"
              className={classes.outfield}
              InputProps={{
                className: classes.txtfield,
              }}
              InputLabelProps={{
                className: classes.txtfield,
              }}
              required
              id="meetName"
              label="Meeting Name"
              name="meetName"
              autoComplete="meetName"
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <Button
              className={classes.formBtn}
              variant="contained"
              color="primary"
              onClick={create}
            >
              <h3 style={{ marginBottom: "0px", marginTop: "0px" }}>
                Create New Meeting
              </h3>
            </Button>
          </Grid>
          <h1
            style={{ color: "#fff", marginTop: "30px", marginBottom: "30px" }}
          >
            OR
          </h1>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              margin="normal"
              className={classes.outfield}
              InputProps={{
                className: classes.txtfield,
              }}
              InputLabelProps={{
                className: classes.txtfield,
              }}
              required
              id="meetID"
              label="Meeting ID"
              name="meetID"
              autoComplete="meetID"
              onChange={(e) => setId(e.target.value)}
            />
          </Grid>
          <Button
            className={classes.formBtn}
            variant="contained"
            style={{ width: "20%" }}
            onClick={join}
          >
            <h3 style={{ marginBottom: "0px", marginTop: "0px" }}>Join</h3>
          </Button>
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
