import React, { useState } from "react";
import "../style.scss";
import add from "../image/addAvatar.png";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { auth, storage } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  console.log("hello");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className="login-container">
      <div className="form-container">
        <h2 className="logo">Just Chat</h2>
        <h5 className="title">Sign In</h5>
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email" className="" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className=""
          />
          <button>Sign In</button>
          {error && <span>Something went wrong</span>}
        </form>
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
