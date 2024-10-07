import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

const Message = ({ message }) => {
  // get current user using use context
  const { currentUser } = useContext(AuthContext);
  // get user chat date by use context
  const { data } = useContext(ChatContext);
  // use ref for message shown function 
  const ref = useRef();

  // when message send every time it smoothly scroll the screen
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  
console.log(message.date.toDate());
  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt="user"
        />
        <span>{new Date(message.date.toDate()).toLocaleString().split(",")[0]}</span>
        <span>{new Date(message.date.toDate()).toLocaleString().split(",")[1]}</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="you" />}
      </div>
    </div>
  );
};

export default Message;
