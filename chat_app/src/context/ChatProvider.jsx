import { createContext } from "react";

export const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const One = "Working";
  const Two = "Perfectly";
  return (
    <ChatContext.Provider value={{ One, Two }}>{children}</ChatContext.Provider>
  );
};

export default ChatProvider;
