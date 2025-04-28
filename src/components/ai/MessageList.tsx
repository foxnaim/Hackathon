import React from "react";
import Message from "./Message";

type MessageType = {
  id: number;
  text: string;
  sender: "user" | "bot";
};

const messages: MessageType[] = [
  { id: 1, text: "Hello! How can I help you?", sender: "bot" },
  { id: 2, text: "I'm looking for information on AI trends.", sender: "user" },
  { id: 3, text: "Sure! Here are some articles...", sender: "bot" },
  { id: 4, text: "Here's another helpful resource...", sender: "bot" },
  { id: 1, text: "Hello! How can I help you?", sender: "bot" },
  { id: 2, text: "I'm looking for information on AI trends.", sender: "user" },
  { id: 3, text: "Sure! Here are some articles...", sender: "bot" },
  { id: 4, text: "Here's another helpful resource...", sender: "bot" },
  { id: 1, text: "Hello! How can I help you?", sender: "bot" },
  { id: 2, text: "I'm looking for information on AI trends.", sender: "user" },
  { id: 3, text: "Sure! Here are some articles...", sender: "bot" },
  { id: 4, text: "Here's another helpful resource...", sender: "bot" },
];

const MessageList: React.FC = () => {
  return (
    <div className="flex flex-col space-y-4 p-5">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
};

export default MessageList;
