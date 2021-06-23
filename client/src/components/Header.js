import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, IconButton, Toolbar, Collapse } from '@material-ui/core';
import SortIcon from '@material-ui/icons/Sort';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Grow from '@material-ui/core/Grow';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontFamily: 'Poppins',
    minHeight:'100vh',
    backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/2.jpg'})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  },
  appbar: {
    background: 'none',
  },
  appbarWrapper: {
    width: '80%',
    margin: '0 auto',
  },
  appbarTitle: {
    flexGrow: '4',
    color:'#fff'
  },
  icon: {
    color: '#fff',
    fontSize: '2rem',
  },
  colorText: {
    color: '#5AFF3D',
  },
  container: {
    textAlign: 'center',
  },
  title: {
    paddingBottom:"40px",
    color: '#fff',
    fontSize: '4rem',
  },
  goDown: {
    color: '#fff',
    fontSize: '4rem',
  },
  logout:{
    color: "inherit",
    fontFamily: 'Poppins',
    background: "#333",
    variant:"outlined",
    fontSize: "1rem"
  },
  grid:{
    paddingBottom:"0px"
  }
}));
export default function Header(props) {
  const user = JSON.parse(window.sessionStorage.getItem("user"));
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  const [expand,setExpand] = useState(false);
  const onExpand = () => {
      setExpand(!expand)
  }
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
          <Button className = {classes.logout} onClick = {Logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Grow
        in={checked}
        {...(checked ? { timeout: 2000 } : {})}
      >
        <div className={classes.container}>
          <h1 className={classes.title}>
            Welcome to Teams, {user["firstName"]}
          </h1>
            <Grid container className={classes.grid}>
            <Grid item xs={6}>
              <Button href = "/meeting" variant ="contained" color = "primary" align = "center">
                Join or create a meeting
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button href = "/calendar" variant ="contained" color = "primary" align = "center">
              Week's Calendar
              </Button>
            </Grid>
            </Grid>
        </div>
      </Grow>
    </div>
  );
}