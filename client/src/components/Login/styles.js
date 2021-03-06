import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontFamily: "Poppins",
    minHeight: "100vh",
    backgroundImage: `url(${process.env.PUBLIC_URL + "/assets/2.jpg"})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    overflow: "auto",
  },
  glogin: {
    paddingRight: "10 px",
  },
  txtfield: {
    color: "#fff!important",
    fontFamily: "Poppins",
    width: "auto",
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
  formBtn: {
    fontFamily: "Poppins",
    marginBottom: "20px",
    marginTop: "10px",
  },
}));
