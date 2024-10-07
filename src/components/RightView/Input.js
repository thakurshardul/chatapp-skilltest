import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../database/firebase";
import { toast } from "react-toastify";
import Picker, { Emoji, SkinTones } from "emoji-picker-react";
import SendIcon from "../../assets/images/sendIcon.png";
import ImageIcon from "../../assets/images/image.png";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [sendingImage, setSendingImage] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handledSendMessage = async () => {
    const trimmedText = text.trim();

    if (!trimmedText && !img) {
      console.log("No text or image selected!");
      return;
    }

    let messageContent = trimmedText;

    if (!messageContent && img) {
      messageContent = img.name;
    }

    console.log("img:",img);
    console.log("sendingImage Before if statement:",sendingImage);

    if (img && !sendingImage) {
      console.log("sendingImage After if statement:", !sendingImage);
      setSendingImage(true);

      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on(
        (error) => {
          toast.error(error, {
            position: "top-right",
            theme: "colored",
          });
          setSendingImage(false); // Reset sendingImage state if there's an error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            const imageName = img.name;
            const messageContent = trimmedText || `${imageName}`;

            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text: messageContent,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
            setSendingImage(false); // Reset sendingImage state after sending
          });
        }
      );
    } else {
      const imageName = img ? img.name : "";
      const messageContent = trimmedText || `${imageName}`;

      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text: messageContent,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text: trimmedText,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text: trimmedText,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handledSendMessage();
    }
  };

  const handleEmojiClick = (emojiData, event) => {
    const { unified } = emojiData;
    const emoji = String.fromCodePoint(`0x${unified}`);

    setText(text + emoji);
    setSelectedEmoji(emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something...."
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        value={text}
      />
      {/* Emoji picker */}
      {selectedEmoji ? (
        <Emoji
          emoji={selectedEmoji}
          native={true}
          onClick={handleEmojiClick}
        />
      ) : null}

      {showEmojiPicker && (
        <Picker
          onEmojiClick={handleEmojiClick}
          disableAutoFocus={true}
          groupNames={{ smileys_people: "PEOPLE" }}
          native={true}
          SkinTone={SkinTones.NONE}
        />
      )}

      <div className="send">
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />

        <label htmlFor="file">
          <img
            src={ImageIcon}
            alt="img-logo"
          />
        </label>

        {/* Emoji picker toggle button */}
        <button
          className="emojiButton"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        >
          <i
            className={
              showEmojiPicker
                ? "fa-solid fa-face-smile"
                : "fa-regular fa-face-smile"
            }
          ></i>
        </button>
        <button onClick={handledSendMessage}>
          <img src={SendIcon} alt="send" />
        </button>
      </div>
    </div>
  );
};

export default Input;
