import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style.scss";
import add from "../image/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  console.log("hello");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      // this will just create the user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // this will just get the storage reference
      const storageRef = ref(storage, name);

      // this will just upload the image to the storage and it won't give any error if we don't upload anything
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          setError(true);
        },
        () => {
          // this will throw an error if we don't upload the file
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            // this will be use to add image url to the profile details
            // this throws an error sometimes like user does not exist
            await updateProfile(res?.user, {
              displayName: name,
              photoURL: downloadURL,
            });

            // to add or update a document in a Firestore collection with name "users"
            // it is like storing in database in json format
            await setDoc(doc(db, "users", res?.user?.uid), {
              uid: res?.user?.uid,
              name,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "userChats", res?.user?.uid), {});

            navigate("/");
          });
        }
      );
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className="register-container">
      <div className="form-container">
        <h2 className="logo">Just Chat</h2>
        <h5 className="title">Sign Up</h5>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" className="" />
          <input type="email" name="email" placeholder="Email" className="" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className=""
          />
          <input style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src={add} alt="" />
            <span>Add an avatar</span>
          </label>
          <button>Sign up</button>
          {error && <span>Something went wrong</span>}
        </form>
        <p>
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
