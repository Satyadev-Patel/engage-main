import { useState } from 'react';
import { useStyles } from './styles'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Button,Grid } from '@material-ui/core';
import { AppBar, Container, TextField } from '@material-ui/core';
import { Toolbar } from '@material-ui/core';

const Calendar = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [showTask,setShowTask] = useState(false);
    const [day,setDay] = useState('');
    const user = JSON.parse(window.sessionStorage.getItem("user"));
    const onCalendarClick = (newDay) => {
        if(newDay == day){
            setOpen(!open);
            setDay('');
        }
        else{
            setOpen(true);
            setDay(newDay);
        }
        setShowTask(false);
    }
    const onTaskClick = () => {
        setShowTask(!showTask);
    }
    return (
        <div className={classes.root}>
            <AppBar className={classes.appbar} elevation={0}>
                <Toolbar className={classes.appbarWrapper}>
                <h1 className={classes.appbarTitle}>
                    Calendar
                </h1>
                </Toolbar>
            </AppBar>
            <Container>
            <List >
                <ListItem>
                    <Button
                        variant = "contained"
                        onClick={() => onCalendarClick("Monday")}
                    >
                        Monday
                    </Button>
                </ListItem>
                <ListItem>
                    <Button
                        variant = "contained"
                        onClick={() => onCalendarClick("Tuesday")}
                    >
                        Tuesday
                    </Button>
                </ListItem>
                <ListItem>
                    <Button
                        variant = "contained"
                        onClick={() => onCalendarClick("Wednesday")}
                    >
                        Wednesday
                    </Button>
                </ListItem>
                <ListItem>
                    <Button
                        variant = "contained"
                        onClick={() => onCalendarClick("Thursday")}
                    >
                        Thursday
                    </Button>
                </ListItem>
                <ListItem>
                    <Button
                        variant = "contained"
                        onClick={() => onCalendarClick("Friday")}
                    >
                        Friday
                    </Button>
                </ListItem>
            </List>
            
            </Container>
            <Container>
                {open && 
                <div>
                <h1>{day}</h1>
                <br/>
                {showTask && 
                    <form className={classes.form} noValidate autoComplete="off">
                        <TextField className={classes.txtfld} id="meetName" label="Meeting Name" variant="outlined" /><br/>
                        <TextField id="meetTime" label="Meeting Time" variant="outlined" />
                    </form>
                }
                <Button
                    variant = "contained"
                    onClick={onTaskClick}
                    className={classes.btn}
                >
                    Add task
                </Button>
                </div>
                }
                
            </Container>
            
        </div>
    )
}

export default Calendar
