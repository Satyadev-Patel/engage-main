import React, { useEffect, useState } from 'react';
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
    flexGrow: '1',
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
    paddingBottom:"0 px",
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

      <Collapse
        in={checked}
        {...(checked ? { timeout: 2000 } : {})}
        collapsedHeight={0}
      >
        <div className={classes.container}>
          <h1 className={classes.title}>
            Welcome to Teams, {user["email"]}
          </h1>
            {expand ? 
              <Grow
                in={checked}
                {...(checked ? { timeout: 1000 } : {})}
              >
              <Button href = "/meeting" variant ="contained" color = "primary" align = "center">
                Join or create a meeting
              </Button>
              </Grow> 
              :
              <IconButton>
              <Grow
                in={checked}
                {...(checked ? { timeout: 1000 } : {})}
              >
              <ExpandMoreIcon className = {classes.goDown} onClick ={onExpand} />
              </Grow>
              </IconButton>}
            <br/>
            <IconButton>
              {!expand ? 
              '' 
              : 
              <Grow
                in={checked}
                style={{ transformOrigin: '0 0 0' }}
                {...(checked ? { timeout: 1000 } : {})}
              >
              <ExpandLessIcon className = {classes.goDown} onClick ={onExpand} />
              </Grow>}
            </IconButton>
        </div>
      </Collapse>
    </div>
  );
}