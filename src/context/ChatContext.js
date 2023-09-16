import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const INITIALSTATE = {
    chatId: "null",
    user: {},
  };

  const { currUser } = useContext(AuthContext);

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          chatId:
            currUser?.uid > action.payload?.uid
              ? currUser.uid + action.payload?.uid
              : action.payload?.uid + currUser.uid,
          user: action.payload,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIALSTATE);

  // console.log(state);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
