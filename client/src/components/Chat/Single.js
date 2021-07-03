import React from 'react'

const Single = (props) => {
    return (
        <div style={{color:"#fff", marginBottom:"10px", display:"inline",maxWidth:"100px"}}>
            <h3 style ={{marginBottom:"0px", marginTop:"0px",marginLeft:"0px"}}>{props.user}</h3>
            <div style={{marginBottom:"10px",width:"250px"}}>{props.chat}</div>
        </div>
    )
}

export default Single
