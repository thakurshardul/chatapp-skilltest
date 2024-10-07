import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../database/firebase";

const SignIn = () => {
  // navigate for go to another page
  const navigate = useNavigate();
  // show loading screen after clicking on login
  // const [loading, setLoading] = useState(false);
  const [submit, setSubmit] = useState(false);

  // handled submit email and password
  const handleSubmit = (e) => {
    e.preventDefault();
    // setLoading(true);/
    setSubmit(true)
    const email = e.target[0].value;
    const password = e.target[1].value;

    // firebase function for sign in
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // const user = userCredential.user;
        toast.success("Successfully LogIn!...", {
          position: "top-right",
          theme: "colored",
        });

        navigate("/");
        setSubmit(false);
        // setLoading(false);
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage, {
          position: "top-right",
          theme: "colored",
        });
        // setLoading(false);
        setSubmit(false);
      });
  };

  // show loading Screen
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
        <span className="title">Sign In</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email..." required/>
          <input type="password" placeholder="Password..." required/>

          <button disabled={submit}>{submit ? "Signing in..." : "Sign in"}</button>
        </form>
        <p>
          You don't have an account? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
