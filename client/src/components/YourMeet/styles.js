import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "left",
    alignItems: "center",
    fontFamily: "Poppins",
    minHeight: "100vh",
    backgroundImage: `url(${process.env.PUBLIC_URL + "/assets/2.jpg"})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    overflow: "auto",
  },
  container: {
    maxWidth: "800px",
    height: "400px",
    overflow: "auto",
    marginTop: "100px",
  },
  appbar: {
    background: "none",
  },
  appbarWrapper: {
    width: "80%",
    margin: "0 auto",
  },
  appbarTitle: {
    flexGrow: "4",
    color: "#fff",
    fontSize: "2rem",
  },
  form: {
    paddingBottom: "10px",
  },
  btn: {
    marginTop: "20px",
    alignItems: "right",
    fontFamily: "Poppins",
  },
  formBtn: {
    width: "35%",
    fontFamily: "Poppins",
  },
  task: {
    alignItems: "right",
    width: "100px",
    margin: "0px",
    padding: "10px 100px",
  },
  head: {
    marginBottom: "0px",
    marginRight: "0px",
    padding: "0px",
    marginTop: "0px",
  },
  taskBtn: {
    alignItems: "right",
    marginLeft: "50px",
    fontFamily: "Poppins",
    h3: {
      marginTop: "0px",
    },
  },
  txtfield: {
    color: "#fff!important",
    fontFamily: "Poppins",
  },
  outfield: {
    marginBottom: "10px",
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "white",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
    },
    "& label.Mui-disabled": {
      color: "red",
    },
  },
}));
