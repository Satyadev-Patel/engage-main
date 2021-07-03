import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "./styles";
import Container from "@material-ui/core/Container";
import axios from "axios";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center" style ={{fontFamily:"Poppins", color:"#fff", marginTop:"20px"}}>
      {"Copyright © "}
      <Link color="inherit" href="#">
        Microsoft Teams
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignUp(props) {
  const classes = useStyles();

  const InitialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    cnfpassword: "",
    mobile: "",
    CheckB: "",
  };

  const [values, setValue] = useState(InitialValues);
  const [errors, setError] = useState({});

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("firstName" in fieldValues) {
      temp.firstName = fieldValues.firstName ? "" : "This field is required.";
    }
    if ("lastName" in fieldValues) {
      temp.lastName = fieldValues.lastName ? "" : "This field is required.";
    }
    if ("email" in fieldValues) {
      temp.email = fieldValues.email ? "" : "This field is required.";
      temp.email = /.+@.+..+/.test(fieldValues.email)
        ? ""
        : "Email is not valid.";
    }
    if ("mobile" in fieldValues) {
      temp.mobile =
        fieldValues.mobile.length > 9 ? "" : "Minimum 10 numbers required.";
    }
    if ("password" in fieldValues) {
      temp.password =
        fieldValues.password.length > 5 ? "" : "Minimum 6 numbers required.";
    }
    if ("cnfpassword" in fieldValues) {
      temp.cnfpassword =
        fieldValues.cnfpassword.length > 5 ? "" : "Minimum 6 numbers required.";
    }
    setError({
      ...temp,
    });

    if (fieldValues === values) {
      if (values.password !== values.cnfpassword) {
        temp.cnfpassword = "Confirm password doesn't match!!";
        setError({
          ...temp,
        });
      }
      return Object.values(temp).every((x) => x === "");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue({
      ...values,
      [name]: value,
    });
    validate({ [name]: value });
  };

  const onSubmit = () => {
    if (validate()) {
      console.log(values);
      const { firstName, lastName, email, password, mobile } = values;
      axios
        .post("http://localhost:5000/users/register", {
          firstName,
          lastName,
          email,
          password,
          mobile,
        })
        .then(function (response) {
          if(response["data"] === "Email already registred!!"){
              window.alert(response["data"]);
          }
          else{
            window.alert(response["data"]);
            window.sessionStorage.setItem("isAuthenticate", "Yes");
            window.sessionStorage.setItem(
                "user",
                JSON.stringify(values)
            );
            props.Authenticate();
            setValue({});
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <div className={classes.root}>
    <Container component="main" maxWidth="xs" backgroundColor="#fff">
      <CssBaseline />
      <div className={classes.paper}>
        <h1 style={{color:"#fff", alignItems:"center", fontSize:"3rem"}}>Sign Up</h1>
        <form className={classes.form} noValidate>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <TextField
                className={classes.outfield}
                InputProps={{
                  className: classes.txtfield
                }}
                InputLabelProps={{
                    className: classes.txtfield
                }}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={handleChange}
                {...(errors.firstName && {
                  error: true,
                  helperText: errors.firstName,
                })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                className={classes.outfield}
                InputProps={{
                  className: classes.txtfield
                }}
                InputLabelProps={{
                    className: classes.txtfield
                }}
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={handleChange}
                {...(errors.lastName && {
                  error: true,
                  helperText: errors.lastName,
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                className={classes.outfield}
                InputProps={{
                  className: classes.txtfield
                }}
                InputLabelProps={{
                    className: classes.txtfield
                }}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
                {...(errors.email && {
                  error: true,
                  helperText: errors.email,
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                className={classes.outfield}
                InputProps={{
                  className: classes.txtfield
                }}
                InputLabelProps={{
                    className: classes.txtfield
                }}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
                {...(errors.password && {
                  error: true,
                  helperText: errors.password,
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="cnfpassword"
                label="Confirm Password"
                className={classes.outfield}
                InputProps={{
                  className: classes.txtfield
                }}
                InputLabelProps={{
                    className: classes.txtfield
                }}
                type="password"
                id="cnfpassword"
                autoComplete="current-password"
                onChange={handleChange}
                {...(errors.cnfpassword && {
                  error: true,
                  helperText: errors.cnfpassword,
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                className={classes.outfield}
                InputProps={{
                  className: classes.txtfield
                }}
                InputLabelProps={{
                    className: classes.txtfield
                }}
                name="mobile"
                label="Mobile"
                type="number"
                id="mobile"
                autoComplete="mobile"
                onChange={handleChange}
                {...(errors.mobile && {
                  error: true,
                  helperText: errors.mobile,
                })}
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.formBtn}
            onClick={onSubmit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2" style ={{fontFamily:"Poppins", color:"#fff",marginBottom:"10px"}}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
        <Copyright />
    </Container>
    </div>
  );
}