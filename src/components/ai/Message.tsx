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
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} w-full`}>
      <div
        className={`max-w-[80%] p-3 rounded-xl shadow-md whitespace-pre-wrap ${
          isUser
            ? 'bg-blue-500 text-white rounded-br-none'
            : 'bg-gray-200 text-gray-800 rounded-bl-none'
        }`}
      >
        <ReactMarkdown
          components={{
            h3: ({ node, ...props }) => <h3 className="font-bold text-md mt-2 mb-1" {...props} />,
            ul: ({ node, ...props }) => <ul className="list-disc list-inside ml-2 mb-2" {...props} />,
            li: ({ node, ...props }) => <li className="mb-1" {...props} />,
            strong: ({ node, ...props }) => <strong className="font-semibold" {...props} />,
            p: ({ node, ...props }) => <p className="mb-2" {...props} />
          }}
        >
          {message.text}
        </ReactMarkdown>

        {message.link && (
          <div className="mt-3">
            <Link to={message.link} className="block group relative w-full">
              <div className="relative h-[90px] w-full rounded-lg overflow-hidden">
                <img
                  src={dashButtonImg}
                  alt="Preview"
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center">
                  <p className="text-white text-base font-medium">Посмотреть</p>
                </div>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
