import React, { useState, useRef } from "react";
import Button from "../button/button"; 
import { Icons } from "../../ui/icons/Icons";

const MessageInput: React.FC = () => {
  const [message, setMessage] = useState<string>(""); 
  const [isLoading, setIsLoading] = useState<boolean>(false); 
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const sendMessage = () => {
    if (message.trim()) {
      setIsLoading(true);
      console.log("Message Sent:", message);

      setTimeout(() => {
        setIsLoading(false);
        setMessage(""); 
      }, 2000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Чтобы не было переноса строки
      sendMessage();
    }
  };

  return (
    <div className="flex items-end justify-center max-h-screen p-4">
      <div className="flex flex-col items-center space-y-3 pb-4 bg-gray-300 rounded-xl shadow-2xl w-full p-2">
        <div className="flex w-full space-x-3">
          <textarea
            ref={textareaRef}
            placeholder="Спросите что-нибудь..."
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              handleInput();
            }}
            onKeyDown={handleKeyDown}
            className="flex-1 w-full px-4 text-sm p-4 bg-gray-300 text-background rounded-md resize-none focus:outline-none overflow-y-auto"
            style={{ minHeight: "100px", maxHeight: "150px" }}
          />
          <div className="flex flex-col">
            <Button
              onClick={sendMessage}
              isLoading={isLoading}
              disabled={isLoading || !message.trim()}
              className="bg-gray-300 hover:bg-gray-300 p-3 rounded-md "
            >
              <Icons.send className="w-8 h-8 text-black mt-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageInput;
