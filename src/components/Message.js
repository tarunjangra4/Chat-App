import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
  const { currUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const fomateDate = () => {
    const date = new Date(
      message.date.seconds * 1000 + message.date.nanoseconds / 1000000
    );

    // Get the time components
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Format the time as a string
    return `${hours}:${minutes}`;
  };

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currUser.uid
              ? currUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span style={{ fontSize: "12px", textAlign: "center" }}>
          {fomateDate()}
        </span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message?.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;
