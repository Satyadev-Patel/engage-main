import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import { Container } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { useStyles } from "./styles";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

function Copyright() {
  return (
    <Typography style={{color:"#fff",fontFamily:"Poppins"}} variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        Microsoft Teams
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Login(props) {
  const classes = useStyles();

  const InitialValues = {
    email: "",
    password: "",
  };
  const [values, setValue] = useState(InitialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue({
      ...values,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://polar-journey-62609.herokuapp.com/users/login", values)
      .then(function (response) {
        if (response["data"]["msg"] === "success") {
          window.sessionStorage.setItem("isAuthenticate", "Yes");
          window.sessionStorage.setItem(
            "user",
            JSON.stringify(response["data"]["user"])
          );
          props.Authenticate();
        }
      })
      .catch(function (error) {
        console.log(error);
        window.alert("Invalid Credenital!!");
      });
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={5} elevation={6} square>
        <Container style={{alignItems:"center"}}>
          <h1 style={{color:"#fff", alignItems:"center", fontSize:"3rem"}}>Sign In</h1>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              required
              className={classes.outfield}
              InputProps={{
                className: classes.txtfield
              }}
              InputLabelProps={{
                  className: classes.txtfield
              }}
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              className={classes.outfield}
              InputProps={{
                className: classes.txtfield
              }}
              InputLabelProps={{
                  className: classes.txtfield
              }}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" style={{color:"#fff"}} />}
              label="Remember me"
              style ={{color:"#fff", fontFamily:"Poppins"}}
            /><br/>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.formBtn}
              onClick={onSubmit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link style={{color:"#fff",fontFamily:"Poppins"}} href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link style={{color:"#fff",fontFamily:"Poppins"}} href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </Container>
      </Grid>
    </Grid>
  );
}