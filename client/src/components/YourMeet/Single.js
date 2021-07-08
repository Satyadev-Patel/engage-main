import React from "react";
import { useStyles } from "./styles";
import { Grid, Button, ListItem } from "@material-ui/core";
import axios from "axios";

const Single = (props) => {
  const classes = useStyles();

  // url for redirecting the user to a selected meeting

  const url = "/meeting/" + props.meetID + "/" + props.name + "/";
  return (
    <ListItem>
      <Grid container spacing={2} style={{ margin: "5px" }}>
        <Grid item xs={4} className={classes.task}>
          <h1 className={classes.head} style={{ color: "#fff" }}>
            {props.name}
            <br />
          </h1>
        </Grid>
        <Grid item className={classes.task}>
          <Button variant="contained" className={classes.taskBtn} href={url}>
            <h3 className={classes.head} style={{ color: "#000" }}>
              Join
            </h3>
          </Button>
        </Grid>
        <Grid item className={classes.task}>
          <Button
            variant="contained"
            color="secondary"
            className={classes.taskBtn}
            onClick={() => props.onDelete(props.meetID)}
          >
            <h3 className={classes.head} style={{ color: "#000" }}>
              Delete
            </h3>
          </Button>
        </Grid>
        <Grid item className={classes.task}>
          <Button
            variant="contained"
            color="primary"
            className={classes.taskBtn}
            style={{ marginLeft: "70px" }}
            onClick={() => props.onDetails(props.meetID)}
          >
            <h3 className={classes.head} style={{ color: "#000" }}>
              Details
            </h3>
          </Button>
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default Single;
