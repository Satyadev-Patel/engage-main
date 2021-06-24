import React from 'react'
import { Button } from '@material-ui/core'

const Task = (props) => {
    const classes = props.classes
    return (
        <div>
            <h3>{props.task.meetName}<br/>{props.task.meetTime} 
            <Button className={classes.taskBtn} onClick={()=>props.onDelete(props.task.meetName)}>Done</Button>
            </h3>
        </div>
    )
}

export default Task
