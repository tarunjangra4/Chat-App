import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { currUser } = useContext(AuthContext);
  const nvaigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth);
    nvaigate("/login");
  };

  return (
    <div className="navbar">
      <span className="logo">Just Chat</span>
      <div className="user">
        <img src={currUser?.photoURL} alt="" />
        <span>{currUser?.name}</span>
        <button onClick={handleSignOut}>logout</button>
      </div>
    </div>
  );
};

export default Navbar;
