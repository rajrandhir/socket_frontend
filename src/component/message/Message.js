import React from 'react';
import "../message/Message.css";

const Message = ({ user, message, dynamicClass }) => {
  let time = new Date().toLocaleTimeString('en-us', {hour:"numeric", minute:"numeric", hour12:true})
  return (
    (user ?
      <div className={`messageBox ${dynamicClass}`}>
        {`${user}: ${message}`}
        <span>{time}</span>
      </div>
      :
      <div className={`messageBox ${dynamicClass}`}>
        {`you: ${message}`}
        <span>{time}</span>
      </div>
    )
  )
}

export default Message;
