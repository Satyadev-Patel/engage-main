import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { ListItemText } from '@material-ui/core';
import { AppBar, ListItem, Toolbar, SwipeableDrawer,List } from '@material-ui/core';
import { useStyles } from './styles';
import Grow from '@material-ui/core/Grow';
import { Button } from '@material-ui/core';


export default function Header(props) {
  const user = JSON.parse(window.sessionStorage.getItem("user"));
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  const [state, setState] = React.useState({
    right: false
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }
  const list = (anchor) => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItemLink href="/meeting">
          <h3>Join or Create a Meeting</h3>
        </ListItemLink>
        <ListItemLink href="/calendar">
          <h3>Your Week's Calendar</h3>
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
  }
  useEffect(() => {
    setChecked(true);
  }, []);
  return (
    <div className={classes.root} id="header">
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar className={classes.appbarWrapper}>
          <h1 className={classes.appbarTitle}>
              Microsoft Teams
          </h1>
          <React.Fragment key="right">
            <Button className={classes.menu} onClick={toggleDrawer("right", true)} size="large" color = "primary" align = "center">Menu</Button>
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

      <Grow
        in={checked}
        {...(checked ? { timeout: 3000 } : {})}
      >
        <div className={classes.container}>
          <h1 className={classes.title}>
            Welcome to Teams, {user["firstName"]}
          </h1>
        </div>
      </Grow>
    </div>
  );
}