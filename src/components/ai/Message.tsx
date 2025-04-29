import React from 'react';
import ReactMarkdown from "react-markdown";
import { Link } from 'react-router-dom';
import dashButtonImg from '../../../public/dashbutton.jpeg';

type MessageProps = {
  message: {
    text: string;
    sender: 'user' | 'bot';
    link: string | null;
  };
};

const Message: React.FC<MessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  
  return (
    <>
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-full p-3 rounded-xl text-sm ${isUser ? 'bg-gray-300' : ''}`}>
      <ReactMarkdown>{message.text}</ReactMarkdown>
      </div>
    </div>
    {message.link ? (
      <div className="relative w-full ml-3">
      <Link to={message.link} className="p-3 rounded-lg text-sm">
        <div className="relative h-[90px] w-full md:w-1/2 lg:w-1/3 rounded-lg overflow-hidden">
          <img
            src={dashButtonImg}
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 backdrop-blur-lg bg-[rgba(0,0,0,0.2)] flex items-center justify-center">
            <p className="text-lg text-gray-100">Посмотреть</p>
          </div>
        </div>
      </Link>
    </div>    
    
    ) : null}
    </>
  );
};

export default Message;
