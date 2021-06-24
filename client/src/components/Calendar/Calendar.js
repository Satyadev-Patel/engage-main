import { useState } from 'react';
import { useStyles } from './styles'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Button,Grid } from '@material-ui/core';
import { AppBar, Container, TextField } from '@material-ui/core';
import { Toolbar } from '@material-ui/core';
import Task from '../Task';
import Day from './Day';

const Calendar = () => {
    const classes = useStyles();
    const InitialValues = {
        meetName: "",
        meetTime: "",
    };
    const [open, setOpen] = useState(false);
    const [values,setValue] = useState(InitialValues);
    const [tasks,setTasks] = useState([]);
    const [showTask,setShowTask] = useState(false);
    const [day,setDay] = useState('');
    const user = JSON.parse(window.sessionStorage.getItem("user"));
    const handleChange = (e) => {
        const { id, value } = e.target;
        setValue({
          ...values,
          [id]: value,
        });
    };
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
    const onSubmit = () => {
        if(tasks.length == 0){
            setTasks([values]);
        }
        else setTasks([...tasks,values]);
    }
    const onTaskClick = () => {
        setShowTask(!showTask);
    }
    const onTaskDelete = (name) => {
        setTasks(tasks.filter(
            (task) => task.meetName !== name
        ))
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
                <Day day={day} onCalendarClick={onCalendarClick} name="Monday"/>
                <Day day={day} onCalendarClick={onCalendarClick} name="Tuesday"/>
                <Day day={day} onCalendarClick={onCalendarClick} name="Wednesday"/>
                <Day day={day} onCalendarClick={onCalendarClick} name="Thursday"/>
                <Day day={day} onCalendarClick={onCalendarClick} name="Friday"/>
            </List>
            
            </Container>
            <Container className={classes.container}>
                {open && 
                <div>
                <h1>{day}</h1>
                {tasks.map((task) => (
                    <Task task={task} classes={classes} onDelete={onTaskDelete}/>
                ))}
                <Button
                    variant = "contained"
                    onClick={onTaskClick}
                    className={classes.btn}
                >
                    {!showTask ? "Add task" : "Close"}
                </Button>
                </div>
                }
                
            </Container>
            <Container>
            {showTask && 
                    <form className={classes.form} noValidate>
                        <TextField 
                            className={classes.outfield} 
                            id="meetName" 
                            label="Meeting Name" 
                            variant="outlined"
                            InputProps={{
                                className: classes.txtfield
                            }}
                            InputLabelProps={{
                                className: classes.txtfield
                            }}
                            onChange={handleChange} />
                        <br/>
                        <TextField 
                            className={classes.outfield} 
                            InputProps={{
                                className: classes.txtfield
                            }}
                            InputLabelProps={{
                                className: classes.txtfield
                            }}
                            id="meetTime" 
                            label="Meeting Time" 
                            variant="outlined"
                            onChange={handleChange} />
                        <br/>
                        <Button
                            className={classes.formBtn}
                            variant="contained"
                            color="primary"
                            onClick={onSubmit}
                            >
                            Add
                        </Button>
                    </form>
                }
            </Container>
            
        </div>
    )
}

export default Calendar
