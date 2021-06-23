import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontFamily: 'Poppins',
      backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/3.jpg'})`,
      minHeight:'100vh',
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover"
    },
    container: {
      textAlign: 'center',
      gridTemplateColumns: "7fr 3fr",
    },
    myId: {
      marginRight: "5rem",
      borderRadius: "5px",
      color: "#fff",
      padding: "2rem",
      display: "grid",
      justifyContent: "center",
      alignContent: "center"
    },
    videoContainer:{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      justifyContent: "center",
      alignContent: "center",
      marginLeft: "10rem",
      height:"20rem"
    },
    callButton: {
      textAlign: "center",
      marginTop: "2rem"
    },
    caller: {
      textAlign: "center",
      color: "#fff"
    },
    txtfield:{
      color:"#fff"
    }
    
  }));