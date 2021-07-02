import React from 'react'

const Single = (props) => {
    return (
        <div style={{color:"#fff"}}>
            {<h4 style ={{marginBottom:"0px", marginTop:"0px"}}>{props.user}</h4>}
            <div style={{marginBottom:"10px"}}>{props.chat}</div>
        </div>
    )
}

export default Single
