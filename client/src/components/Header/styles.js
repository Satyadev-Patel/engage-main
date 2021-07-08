import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontFamily: "Poppins",
    backgroundImage: `url(${process.env.PUBLIC_URL + "/assets/2.jpg"})`,
    minHeight: "100vh",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    overflowX: "hidden",
  },
  list: {
    width: 250,
    fontFamily: "Poppins",
    backgroundColor: "#fff",
  },
  fullList: {
    width: "auto",
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
  icon: {
    color: "#fff",
    fontSize: "2rem",
  },
  colorText: {
    color: "#5AFF3D",
  },
  container: {
    textAlign: "center",
  },
  title: {
    paddingBottom: "40px",
    color: "#fff",
    fontSize: "4rem",
  },
  goDown: {
    color: "#fff",
    fontSize: "4rem",
  },
  logout: {
    color: "inherit",
    fontFamily: "Poppins",
    background: "#333",
    variant: "outlined",
    fontSize: "1rem",
  },
  grid: {
    paddingBottom: "0px",
  },
  menu: {
    color: "#fff",
    fontFamily: "Poppins",
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
}));
