import React, { useContext, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  const { currUser } = useContext(AuthContext);

  const handleSearch = async (e) => {
    if (e.code === "Enter") {
      const q = query(collection(db, "users"), where("name", "==", username));

      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          console.log("selected user ", doc.data());
          setUser(doc.data());
        });
      } catch (err) {
        setError(err);
      }
    }
  };

  // this will just create a new chat
  const handleSelect = async () => {
    console.log("user ", user);
    console.log("curr user ", currUser);
    const combinedId =
      currUser?.uid > user?.uid
        ? currUser.uid + user?.uid
        : user.uid + currUser.uid;
    console.log("combined id ", combinedId);
    try {
      //check if the group chat exist or not. If not then create
      const res = await getDoc(doc(db, "chats", combinedId));
      console.log("res ", res);
      if (!res.exists()) {
        console.log("if");
        // create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
        console.log("set doc");

        //create user chats
        await updateDoc(doc(db, "userChats", currUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            name: user.name,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        console.log("res1 ");

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currUser.uid,
            name: currUser.displayName,
            photoURL: currUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        console.log("res2 ");
      }
      console.log("chat has been added");
    } catch (error) {
      console.log(error);
    }

    setUser(null);
    setUsername("");
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          onKeyDown={handleSearch}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          type="text"
          placeholder="Find a user"
        />
      </div>
      {error && <span>User not found!</span>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user?.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{user?.name}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
