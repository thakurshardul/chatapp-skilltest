import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth, db, storage } from "../database/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
  // use state function for image submit button and loading screen
  const [img, setImg] = useState(null);
  // const [loading, setLoading] = useState(false);
  const [submit, setSubmit] = useState(false);
  // navigate for page movement
  const navigate = useNavigate();
  // default url for user if no avatar uploaded
  const defaultURL = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";


  // handled submit for  for new user sign in
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmit(true);
    const displayName = e.target[0].value?.trim();
    const email = e.target[1].value?.trim();
    const password = e.target[2].value?.trim();
    const confirmPassword = e.target[3].value?.trim();
    // const file = e.target[4].files[0];
    if (password !== confirmPassword) {
      return toast.warn("Password and confirmPassword not matched!...", {
        position: "top-right",
        theme: "colored",
      });
    }
    if (password.length < 8) {
      return toast.warn("Password will be at least 8 letter...", {
        position: "top-right",
        theme: "colored",
      });
    }
    try {
      // setLoading(true);
      // firebase new user create function
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // if user set his avatar this function will handled this
      if (img) {
        const date = new Date().getTime();
        const storageRef = ref(storage, `${displayName + date}`);

        await uploadBytesResumable(storageRef, img).then(() => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
              //Update profile
              await updateProfile(res.user, {
                displayName,
                photoURL: downloadURL,
              });
              //create user on firestore
              await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                displayName,
                email,
                photoURL: downloadURL,
              });

              //create empty user chats on firestore
              await setDoc(doc(db, "userChats", res.user.uid), {});
              toast.success("Signup Successfully!...", {
                position: "top-right",
                theme: "colored",
              });
              navigate("/");
              // setLoading(false);
            } catch (err) {
              toast.error(err, {
                position: "top-right",
                theme: "colored",
              });

              // setLoading(false);
            }
            // Signed in
          });
        });
      } else {
        try {
          //Update profile
          await updateProfile(res.user, {
            displayName,
            photoURL: defaultURL,
          });
          //create user on firestore
          await setDoc(doc(db, "users", res.user.uid), {
            uid: res.user.uid,
            displayName,
            email,
            photoURL: defaultURL,
          });

          //create empty user chats on firestore
          await setDoc(doc(db, "userChats", res.user.uid), {});
          toast.success("Signup Successfully!...", {
            position: "top-right",
            theme: "colored",
          });
          navigate("/");
          // setLoading(false);
        } catch (err) {
          toast.error(err, {
            position: "top-right",
            theme: "colored",
          });

          // setLoading(false);
        }
      }
    } catch (err) {
      toast.error(err, {
        position: "top-right",
        theme: "colored",
      });

      // setLoading(false);
    }
  };

  // during process of sign in this function will appear the as loading screen
  // if (loading) {
  //   return (
  //     <div className="loaderWapper">
  //       <div className="loader"></div>
  //     </div>
  //   );
  // }

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">ChatVerse</span>
        <span className="title">Sign Up</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Your Name..." required/>
          <input type="email" placeholder="Email..." required/>
          <input
            type="password"
            placeholder="Password...(use at least 8 letter)"
            required
          />
          <input type="password" placeholder="Confirm Password..." required/>
          <input
            type="file"
            id="file"
            onChange={(e) => setImg(e.target.files[0])}
          />
          <label htmlFor="file">
            <img
              src="https://cdn-icons-png.flaticon.com/128/4675/4675250.png"
              alt="img-logo"
            />
            <span>Add Profile</span>
          </label>
          <button disabled={submit}>{submit ? "Signing up..." : "Sign up"}</button>
        </form>
        <p>
          You do have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
