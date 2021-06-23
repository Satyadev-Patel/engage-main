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
      alignItems:"right"
    },
    txtfld:{
      marginBottom:"10px"
    }
}));