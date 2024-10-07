import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import { db } from "../../database/firebase";
import Message from "./Message";

const Messages = () => {
  //  use state for message array
  const [messages, setMessages] = useState([]);
  // user chat data from chat context
  const { data } = useContext(ChatContext);

  // use effect function for gets chats data
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });
    return () => {
      unsub();
    };
  }, [data.chatId]);
  

  return (
    <div className="messages">
      {messages.map((m) => (
        // send message as props
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
};

export default Messages;
