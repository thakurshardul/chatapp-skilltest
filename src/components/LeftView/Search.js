import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db } from "../../database/firebase";
import { AuthContext } from "../../context/AuthContext";

const Search = () => {
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const handledSearch = async () => {
    if (userName === currentUser.displayName) {
      setErr(true);
      toast.warn("You can't add yourself as a friend", {
        position: "top-right",
        theme: "colored",
      });
      return;
    }

    const q = query(
      collection(db, "users"),
      where("displayName", "==", userName)
    );

    try {
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setErr(true);
        console.log("No documents found.");
        return;
      }
      setErr(false);

      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        if (userData) {
          console.log("User data:", userData);
          setUser(userData);
        } else {
          console.log("Document data is empty or not an object:", doc.data());
          setErr(true);
        }
      });
    } catch (err) {
      console.error("Error fetching user data:", err);
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handledSearch();
  };

  const handledSelectChat = async () => {
    const combineId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combineId));
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combineId), { messages: [] });

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combineId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combineId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combineId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combineId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      console.error("Error while adding user as friend:", err);
    }
    setUser(null);
    setUserName("");
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find your friend..."
          onKeyDown={handleKey}
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
        />
      </div>
      {err && <span>User not found!</span>}
      {user && (
        <div className="userChat" onClick={handledSelectChat}>
          <img src={user.photoURL} alt="user-chat" />
          <div className="userChatinfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
