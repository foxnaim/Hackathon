import React, { useState } from "react";
import Input from "../input/input"; 
import Button from "../button/button"; 

const MessageInput: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false); 

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

  return (
    <div className="p-4 bg-background">
      <div className="flex items-center space-x-4">
        <Input
          type="text"
          placeholder="Введите сообщение..."
          icon="search" 
          value={message}
          onChange={(e) => setMessage(e.target.value)} 
          className="flex-1"
        />
        <Button
          onClick={sendMessage}
          isLoading={isLoading} 
          disabled={isLoading || !message.trim()} // Отключаем кнопку, если нет текста или в процессе отправки
          variant="solid"
          className="flex-shrink-0 w-28 bg-secondary hover:bg-secondary/80 text-white">
          Отправить
        </Button>
      </div>
    </div>
  );
};

export default MessageInput;
