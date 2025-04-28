import React from 'react';

type MessageProps = {
  message: {
    text: string;
    sender: 'user' | 'bot';
  };
};

const Message: React.FC<MessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-xs p-3 rounded-xl text-white ${isUser ? 'bg-primary' : 'bg-secondary'}`}>
        {message.text}
      </div>
    </div>
  );
};

export default Message;
