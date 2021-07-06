import React from "react";
import Single from "./Single";

const Message = (props) => {
  return (
    <div>
      {props.texts.map((task) => (
        <Single chat={task.message} user={task.handle} />
      ))}
    </div>
  );
};

export default Message;
