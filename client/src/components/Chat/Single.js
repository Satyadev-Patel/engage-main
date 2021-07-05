import React from 'react'

const Single = (props) => {
    return (
        <div style={{color:"#fff", marginBottom:"10px"}}>
            <h3 style ={{marginBottom:"0px", marginTop:"0px",marginLeft:"0px"}}>{props.user}</h3>
            <p style={{marginBottom:"10px",marginTop:"0px",wordBreak:"break-word"}}>{props.chat}</p>
        </div>
    )
}

export default Single
