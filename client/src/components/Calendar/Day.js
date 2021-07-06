import React from "react";
import { Button, ListItem } from "@material-ui/core";

const Day = (props) => {
  return (
    <ListItem>
      {props.day === props.name ? (
        <Button
          variant="contained"
          color="primary"
          style={{ fontFamily: "Poppins" }}
          onClick={() => props.onCalendarClick(props.name)}
        >
          <h3>{props.name}</h3>
        </Button>
      ) : (
        <Button
          variant="contained"
          style={{ fontFamily: "Poppins" }}
          onClick={() => props.onCalendarClick(props.name)}
        >
          <h3 style={{ marginBottom: "0px", padding: "0px", marginTop: "0px" }}>
            {props.name}
          </h3>
        </Button>
      )}
    </ListItem>
  );
};

export default Day;
