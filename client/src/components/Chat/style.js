import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100vh",
    fontFamily: "Poppins",
    minHeight: "100vh",
    backgroundImage: `url(${process.env.PUBLIC_URL + "/assets/2.jpg"})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  feedback: {
    color: "#aaa",
    padding: "14px 0px",
    margin: "0 20px",
  },
  chatWindow: {
    height: "300px",
    overflow: "auto",
  },
  output: {
    padding: "14px 0px",
    borderBottom: "1px solid #e9e9e9",
    color: "#fff",
  },
  feedback: {
    color: "#aaa",
    padding: "14px 0px",
    margin: "0 20px",
  },
  btn: {
    marginTop: "20px",
    width: "50%",
    alignItems: "right",
    fontFamily: "Poppins",
  },
  formBtn: {
    width: "35%",
    fontFamily: "Poppins",
  },
  head: {
    marginBottom: "0px",
    marginRight: "0px",
    padding: "0px",
    marginTop: "0px",
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
