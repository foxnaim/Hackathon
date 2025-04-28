import React from 'react';
import MessageInput from './MessageInput';
import MessageList from './MessageList';


const ChatContainer: React.FC = () => {
  return (
    <div className="flex flex-col w-full h-screen bg-background text-text">
      <MessageList />
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
