import React from 'react'
import { Button,Grid } from '@material-ui/core'

const Task = (props) => {
    const classes = props.classes
    return (
        <div>
            <Grid container spacing = {2}>
                <Grid item xs = {6} className={classes.task}>
                    <h3 className={classes.head}>{props.task.meetName}<br/>
                    {props.task.meetTime}</h3>
                </Grid>
                <Grid item xs = {6} className = {classes.task}>
                    <Button className={classes.taskBtn} onClick={()=>props.onDelete(props.task.meetTime)}>
                        <h3 className={classes.head}>Done</h3>
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default Task