import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, IconButton, Toolbar, Collapse } from '@material-ui/core';
import SortIcon from '@material-ui/icons/Sort';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
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
    color: '#fff',
    fontSize: '4.5rem',
  },
  goDown: {
    color: '#fff',
    fontSize: '4rem',
  },
}));
export default function Header() {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  const [expand,setExpand] = useState(false);
  const onExpand = () => {
      setExpand(!expand)
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
          <IconButton>
            <SortIcon className={classes.icon} />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Collapse
        in={checked}
        {...(checked ? { timeout: 2000 } : {})}
        collapsedHeight={0}
      >
        <div className={classes.container}>
          <h1 className={classes.title}>
            Welcome to Teams,
          </h1>
            <IconButton>
              {expand ? <ExpandLessIcon className = {classes.goDown} onClick ={onExpand} />
              : '' }
              {!expand ? <ExpandMoreIcon className = {classes.goDown} onClick ={onExpand} /> : ''}
              {expand ? <Button href = "/meeting" variant ="contained" color = "primary" align = "center">
                    Join or create a meeting
                </Button> : ''}
            </IconButton>
        </div>
      </Collapse>
    </div>
  );
}