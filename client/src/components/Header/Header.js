import React, { useEffect, useState } from "react";
import {
  AppBar,
  ListItem,
  Toolbar,
  SwipeableDrawer,
  List,
  Slide,
} from "@material-ui/core";
import { useStyles } from "./styles";
import { Button } from "@material-ui/core";

//Home Page
export default function Header(props) {
  const user = JSON.parse(window.sessionStorage.getItem("user"));
  const classes = useStyles();
  const [checked, setChecked] = useState(false); // For transition of title
  const [state, setState] = useState({
    right: false, // For transition of Menu Drawer
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }

  // Menu drawer

  const list = (anchor) => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItemLink href="/home">
          <h3>Join or Create a Meeting</h3>
        </ListItemLink>
        <ListItemLink href="/calendar">
          <h3>Your Week's Calendar</h3>
        </ListItemLink>
        <ListItemLink href="/yourmeet">
          <h3>Your Meetings</h3>
        </ListItemLink>
        <ListItem button key="Logout" onClick={Logout}>
          <h3>Logout</h3>
        </ListItem>
      </List>
    </div>
  );
  const Logout = () => {
    window.sessionStorage.clear();
    props.Authenticate();
    props.history.push("/");
  };
  useEffect(() => {
    setChecked(true);
  }, []);
  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar className={classes.appbarWrapper}>
          <h1 className={classes.appbarTitle}>Nanosoft Teams</h1>
          <React.Fragment key="right">
            <Button
              className={classes.menu}
              onClick={toggleDrawer("right", true)}
              size="large"
              color="primary"
              align="center"
            >
              Menu
            </Button>
            <SwipeableDrawer
              anchor="right"
              open={state["right"]}
              onClose={toggleDrawer("right", false)}
              onOpen={toggleDrawer("right", true)}
            >
              {list("right")}
            </SwipeableDrawer>
          </React.Fragment>
        </Toolbar>
      </AppBar>

      <div className={classes.container}>
        <Slide
          direction="right"
          in={checked}
          {...(checked ? { timeout: 1000 } : {})}
          mountOnEnter
          unmountOnExit
        >
          <h1 className={classes.title}>
            Welcome to Teams,
            <br /> {user["firstName"]}
          </h1>
        </Slide>
        <Slide
          direction="left"
          in={checked}
          {...(checked ? { timeout: 1000 } : {})}
          mountOnEnter
          unmountOnExit
        >
          <h4 style={{ margin: "0px", color: "red" }}>
            Click Menu for more options
          </h4>
        </Slide>
      </div>
    </div>
  );
}
