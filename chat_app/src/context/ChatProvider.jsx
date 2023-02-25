import axios from "axios";
import { createContext, useRef, useState } from "react";

export const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const imageUrl = "data:image/svg+xml;base64,";
  const [reciever, setReciever] = useState(null);
  const [messages, setMessages] = useState([]);
  const socket = useRef();

  const postMessage = async (item) => {
    await axios.post("https://chat-app-four.onrender.com/messages/add", item);
    socket.current.emit("send-msg", item);
    let x = { message: item.message, fromSelf: true };
    setMessages([...messages, x]);
  };
  const getChatMsg = async (item) => {
    let { data } = await axios.post(
      "https://chat-app-four.onrender.com/messages",
      item
    );
    setMessages(data);
  };

  return (
    <ChatContext.Provider
      value={{
        imageUrl,
        reciever,
        setReciever,
        socket,
        postMessage,
        getChatMsg,
        messages,
        setMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
