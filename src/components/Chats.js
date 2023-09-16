import React, { useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Chats = () => {
  const [chats, setChats] = useState([]);
  const { currUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currUser.uid), (doc) => {
        setChats(doc.data() || []);
      });

      return () => {
        unsub();
      };
    };

    currUser.uid && getChats();
  }, [currUser.uid]);

  const handleSelect = (userInfo) => {
    dispatch({ type: "CHANGE_USER", payload: userInfo });
  };

  return (
    <div className="chats">
      <div>Chats</div>
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        ?.map((chat) => (
          <div
            className="userChat"
            key={chat?.[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
          >
            <img src={chat[1]?.userInfo?.photoURL} alt="" />
            <div className="userChatInfo">
              <span>{chat[1]?.userInfo?.name}</span>
              <p>{chat[1]?.lastMessage?.text}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Chats;
