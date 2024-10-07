import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ChatContext, NULL_USER } from "../context/ChatContext";
import { signOut } from "firebase/auth";
import { auth } from "../database/firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  // current user details from use context
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  // clear chat after logout
  const clearSelectChat = (user) => {
    dispatch({ type: NULL_USER, payload: user });
  };

  // logout function using firebase signOut method
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
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">ChatVerse</span>
        <img className="profileImg" src={currentUser.photoURL} alt="user" />
        <h4>{currentUser.displayName}</h4>
        <h5>{currentUser.email}</h5>
        <button onClick={onClickSignOut}>
          <i className="fa-solid fa-right-from-bracket"></i>
          Logout
        </button>
        <p>
          Go to Home page? <Link to="/">Home</Link>
        </p>
      </div>
    </div>
  );
};

export default Profile;
