import { createContext, useContext, useReducer } from "react";
import { AuthContext } from "./AuthContext";

// export ChatContext
export const ChatContext = createContext();

// action type
export const CHANGE_USER = "CHANGE_USER";
export const NULL_USER = "NULL_USER";

// chat context provider
export const ChatContextprovider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };

  // chat reducer
  const chatReducer = (state, action) => {
    switch (action.type) {
      case CHANGE_USER:
        return {
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        };
      case NULL_USER:
        return {
          chatId: "null",
          user: {},
        };
      default:
        return state;
    }
  };

  // create usereducer
  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
