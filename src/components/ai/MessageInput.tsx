import React, { useState } from "react";
import Input from "../input/input"; 
import Button from "../button/button"; 
import { Icons } from "../../ui/icons/Icons";  // Импортируем иконки

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
    <div className="flex items-center justify-center p-8">
      <div className="flex items-center space-x-4 w-full max-w-xl">
        <Input
          type="text"
          placeholder="Введите сообщение..."
          icon="search" 
          value={message}
          onChange={(e) => setMessage(e.target.value)} 
          className="flex-1 h-12 px-4 border rounded-lg text-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <Button
          onClick={sendMessage}
          isLoading={isLoading} 
          disabled={isLoading || !message.trim()} // Отключаем кнопку, если нет текста или в процессе отправки
          variant="solid"
          className="flex-shrink-0 w-32 bg-secondary hover:bg-secondary/80 text-white">
          Отправить 
          <Icons.send className="w-5 h-5 rotate-45" /> 
        </Button>
      </div>
    </div>
  );
};

export default MessageInput;
