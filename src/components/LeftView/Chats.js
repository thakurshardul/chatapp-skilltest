import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { CHANGE_USER, ChatContext } from "../../context/ChatContext";
import { db } from "../../database/firebase";

const Chats = () => {
  // useState for chats
  const [chats, setChats] = useState([]);

  // usecontext for current user context with chat
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  // user effect for get current users chats
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });
      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  // when user select any chat it will appear to the screen
  const handledSelectChat = (user) => {
    dispatch({ type: CHANGE_USER , payload: user });
  };

  return (
    <div className="chats">
      {/* sort the chat acording the the dtate and time */}
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div
            className="userChat"
            key={chat[0]}
            onClick={() => handledSelectChat(chat[1].userInfo)}
          >
            <img src={chat[1].userInfo.photoURL} alt="user-chat" />
            <div className="userChatInfo">
              <span>{chat[1].userInfo.displayName}</span>
              <p>{chat[1].lastMessage?.text}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Chats;
