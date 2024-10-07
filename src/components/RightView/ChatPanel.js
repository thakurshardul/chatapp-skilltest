import React, { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import Input from "./Input";
import Messages from "./Messages";

const Chat = () => {
  // get chat data from chat context
  const { data } = useContext(ChatContext);
  

  return (
    <div className="chatPanel">
      <div className="chatInfo">
        <span>
          {data.user ? (
            <img
              src={data.user.photoURL}
              style={data.user.photoURL ? null : { display: "none" }}
            alt="userProfile"/>
          ) : null}
          {data.user?.displayName}
        </span>
        <div className="chatIcons">
          <i className="fa-solid fa-video"></i>
          <i className="fa-solid fa-user-plus"></i>
          <i className="fa-solid fa-circle-info"></i>
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
