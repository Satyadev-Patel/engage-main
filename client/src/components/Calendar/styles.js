import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontFamily: 'Poppins',
      minHeight:'100vh',
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover"
    },
    container:{
      width:"600px",
      height:"300px",
      marginRight:"300px"
    },
    appbar: {
        background: 'none',
      },
      appbarWrapper: {
        width: '80%',
        margin: '0 auto',
      },
      appbarTitle: {
        flexGrow: '4',
        color:'#000',
        fontSize: "4rem"
      },
    form:{
      paddingBottom:"10px"
    },
    btn:{
      alignItems:"right",
      fontFamily:"Poppins"
    },
    formBtn:{
      width:"35%",
      fontFamily:"Poppins"
    },
    task: {
      alignItems:"right",
      background: "#f4f4f4",
      margin: "5px",
      padding: "10px 100px",
      'h3':{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      },
    },
    taskBtn:{
      marginLeft:"100px",
      alignItems:"right",
      fontFamily:"Poppins"
    },
    txtfield:{
      color:"#000!important",
      fontFamily:"Poppins"
    },
    outfield:{
      marginBottom:"10px",
      '& label.Mui-focused': {
        color: 'black',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'black',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'black',
        },
        '&:hover fieldset': {
          borderColor: 'black',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'black',
        },
      },
      '& label.Mui-disabled': {
        color: 'red',
      },
    }
}));