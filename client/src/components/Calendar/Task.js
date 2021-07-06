import React from "react";
import { Button, Grid, ListItem } from "@material-ui/core";

const Task = (props) => {
  const classes = props.classes;
  return (
    <ListItem>
      <Grid container spacing={2}>
        <Grid item xs={6} className={classes.task}>
          <h3 className={classes.head} style={{ color: "#fff" }}>
            {props.task.meetName}
            <br />
            {props.task.meetTime}
          </h3>
        </Grid>
        <Grid item xs={6} className={classes.task}>
          <Button
            variant="contained"
            className={classes.taskBtn}
            onClick={() => props.onDelete(props.task.meetTime)}
          >
            <h3 className={classes.head} style={{ color: "#000" }}>
              Done
            </h3>
          </Button>
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default Task;
