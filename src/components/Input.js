import React, { useContext, useState } from "react";
import Img from "../image/img.png";
import Attach from "../image/attach.png";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  Timestamp,
  arrayRemove,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Input = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const { currUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    console.log("image ", image);
    if (image) {
      console.log("if");
      // this will just get the storage reference
      const storageRef = ref(storage, uuid());
      console.log("ref");
      // this will just upload the image to the storage and it won't give any error if we don't upload anything
      const uploadTask = uploadBytesResumable(storageRef, image);
      console.log("upload");
      uploadTask.on(
        (error) => {},
        () => {
          console.log("start");
          // to send image as a message
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            // add message with an image
            console.log("data ", data);
            console.log("add message", data.chatId, currUser.uid, downloadURL);
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
            console.log("added");
          });
          console.log("complete");
        }
      );
    } else {
      // add message without an image
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImage(null);
  };

  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send">
        <img src={Attach} alt="" />
        <input
          type="file"
          id="file"
          style={{ display: "none" }}
          onChange={(e) => setImage(e.target.files[0])}
        />
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <button onClick={() => handleSend()}>Send</button>
      </div>
    </div>
  );
};

export default Input;
