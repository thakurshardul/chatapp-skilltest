import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../context/AuthContext";
import { auth } from "../../database/firebase";
import { ChatContext, NULL_USER } from "../../context/ChatContext";

const Navbar = () => {
  // get current user using use context
  const { currentUser } = useContext(AuthContext);
  // get user chat date by use context
  const { dispatch } = useContext(ChatContext);

  // clear chat after sign out
  const clearSelectChat = (user) => {
    dispatch({ type: NULL_USER, payload: user });
  };

  // it handled the sign out from function
  const onClickSignOut = () => {
    signOut(auth)
      .then(() => {
        clearSelectChat(currentUser);
        toast.success("Logout Successful!....", {
          position: "top-right",
          theme: "colored",
        });
      })
      .catch((error) => {
        // An error happened.
        toast.error(error, {
          position: "top-right",
          theme: "colored",
        });
      });
  };


  return (
    <div className="navbar">
      <span className="logo">ChatVerse</span>

      <div className="user">
        <Link to={"/profile"}>
          <img
            src={currentUser.photoURL}
            alt="user"
          />
        </Link>

        <Link to={"/profile"}>
          <span className="userName">{currentUser.displayName}</span>
        </Link>

        <button onClick={onClickSignOut}>
          <span style={{fontWeight:600}}>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
