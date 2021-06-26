import { useState } from 'react';
import { useStyles } from './styles'
import List from '@material-ui/core/List';
import axios from "axios"
import { Button,Grid } from '@material-ui/core';
import { AppBar, Container, TextField } from '@material-ui/core';
import { Toolbar } from '@material-ui/core';
import Task from './Task';
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
            const requestObj = {email:user["email"], day:day};
            axios
                .post("https://polar-journey-62609.herokuapp.com/event/events", requestObj)
                .then(function (response) {
                    if (response["data"]["msg"] === "success") {
                        let events = response["data"]["event"];
                        if(events != null){
                            events.map((event) => {
                                delete event._id;
                                delete event.email;
                                delete event.createdAt;
                                delete event.updatedAt;
                                delete event.__v;
                            });
                            events = events.filter((event)=> event.day === newDay);
                            events.map((event) => {
                                delete event.day;
                            });
                            setTasks(events);
                        }
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    window.alert("Invalid Credenital!!");
                });
        }
        setShowTask(false);
    }
    const onSubmit = () => {
        setTasks([...tasks,values]);
        const { meetName,meetTime } = values;
        const email = user["email"];
        console.log(email);
        axios
            .post("https://polar-journey-62609.herokuapp.com/event/add", {
                email,
                meetName,
                meetTime,
                day,
            })
            .then(function (response) {
                console.log("Success");
            })
            .catch(function (error) {
            console.log(error);
            });
    }
    const onTaskClick = () => {
        setShowTask(!showTask);
    }
    const onTaskDelete = (name) => {
        setTasks(tasks.filter(
            (task) => task.meetTime !== name
        ))
        const requestObj = {meetTime: name, day: day, email: user["email"]};
        axios
            .post("https://polar-journey-62609.herokuapp.com/event/delete", requestObj)
            .then(function (response) {
                if (response["data"]["msg"] === "success") {
                    console.log("Success");
                }
            })
            .catch(function (error) {
                console.log(error);
                window.alert("Invalid Credenital!!");
            });
    }

    return (
        <div className={classes.root}>
            <AppBar className={classes.appbar} elevation={0}>
                <Toolbar className={classes.appbarWrapper}>
                <h1 className={classes.appbarTitle}>
                    {user["firstName"]}'s Meetings
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
                {tasks.length > 0 ? tasks.map((task) => (
                    <Task task={task} classes={classes} onDelete={onTaskDelete}/>
                )): <h3>You have no meetings on this day.<br/></h3>}
                <Button
                    variant = "contained"
                    onClick={onTaskClick}
                    className={classes.btn}
                >
                    {!showTask ? <h3 className={classes.head}>Add Meeting</h3> : <h3 className={classes.head}>Close</h3>}
                </Button>
                </div>
                }
                </Container>
            <Container className={classes.addContainer}>
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
