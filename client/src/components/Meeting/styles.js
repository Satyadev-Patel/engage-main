import { makeStyles } from "@material-ui/styles";
{
  /* <Button variant="contained" color="primary" onClick={muteAudio} className={classes.btn}>
                   {!muteMic ? "Mute" : "Unmute"}
        </Button><br/>
        <Button variant="contained" color="primary" onClick={muteVideo} className={classes.btn}>
                   {!muteVid ? "Disable Video" : "Enable Video"}
        </Button><br/> */
}
export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontFamily: "Poppins",
    backgroundImage: `url(${process.env.PUBLIC_URL + "/assets/2.jpg"})`,
    minHeight: "100vh",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    overflow: "auto",
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
  },
  title: {
    paddingBottom: "40px",
    color: "#fff",
    fontSize: "4rem",
  },
  videoStyle: {
    borderRadius: "5px",
    padding: "2px",
    width: "350px",
    border: "1px solid #fff",
    transform: "rotateY(180deg)",
  },
  head: {
    marginBottom: "0px",
    marginTop: "0px",
  },
  container: {
    textAlign: "center",
    gridTemplateColumns: "7fr 3fr",
  },
  myId: {
    marginRight: "5rem",
    borderRadius: "5px",
    color: "#fff",
    padding: "2rem",
    display: "grid",
    justifyContent: "center",
    alignContent: "center",
  },
  videoContainer: {
    display: "grid",
    gridTemplateColumns: "2fr 2fr",
    justifyContent: "center",
    alignContent: "center",
    height: "20rem",
  },
  gridList: {
    width: "900px",
    height: "300px",
    marginLeft: "100px",
  },
  btn: {
    marginTop: "10px",
    marginBottom: "10px",
    marginLeft: "10px",
    width: "auto",
    alignItems: "right",
    fontFamily: "Poppins",
  },
  callButton: {
    textAlign: "center",
    marginTop: "2rem",
  },
  menu: {
    color: "#fff",
    fontFamily: "Poppins",
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  caller: {
    textAlign: "center",
    color: "#fff",
  },
  txtfield: {
    color: "#fff!important",
    fontFamily: "Poppins",
  },
  outfield: {
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
