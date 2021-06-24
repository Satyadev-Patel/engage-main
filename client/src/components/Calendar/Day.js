import React from 'react'
import { Button, ListItem } from '@material-ui/core'

const Day = (props) => {
    return (
        <ListItem>
            {props.day === props.name ? <Button
                variant = "contained"
                color="primary"
                onClick={() => props.onCalendarClick(props.name)}
            >
                <h3>{props.name}</h3>
            </Button> 
            
            : <Button
                variant = "contained"
                onClick={() => props.onCalendarClick(props.name)}
            >
                {props.name}
            </Button> }
            
        </ListItem>
    )
}

export default Day
