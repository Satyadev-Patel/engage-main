import { makeStyles } from '@material-ui/styles';
{/* <Button variant="contained" color="primary" onClick={muteAudio} className={classes.btn}>
                   {!muteMic ? "Mute" : "Unmute"}
        </Button><br/>
        <Button variant="contained" color="primary" onClick={muteVideo} className={classes.btn}>
                   {!muteVid ? "Disable Video" : "Enable Video"}
        </Button><br/> */}
export const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontFamily: 'Poppins',
      backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/2.jpg'})`,
      minHeight:'100vh',
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover" 
    },
    title: {
      paddingBottom:"40px",
      color: '#fff',
      fontSize: '4rem',
    },
    head:{
      marginBottom:"0px", 
      marginTop:"0px"
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
      gridTemplateColumns: "2fr 2fr",
      justifyContent: "center",
      alignContent: "center",
      marginLeft: "50px",
      height:"20rem", 
    },
    gridList:{
      width:"900px",
      height:"300px",
      marginLeft:"100px"
    },
    btn:{
      marginTop:"10px",
      marginBottom:"10px",
      marginLeft:"10px",
      width:"50%",
      alignItems:"right",
      fontFamily:"Poppins"
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
      color:"#fff!important",
      fontFamily:"Poppins"
    },
    outfield:{

      '& label.Mui-focused': {
        color: 'white',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'white',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'white',
        },
        '&:hover fieldset': {
          borderColor: 'white',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'white',
        },
      },
      '& label.Mui-disabled': {
        color: 'red',
      },
    }
    
  }));