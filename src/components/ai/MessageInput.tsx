import React, { useState, useRef } from "react";
import Button from "../button/button"; 
import { Icons } from "../../ui/icons/Icons";

const MessageInput: React.FC = () => {
  const [message, setMessage] = useState<string>(""); // Текстовое состояние
  const [isLoading, setIsLoading] = useState<boolean>(false); // Индикация загрузки
  const textareaRef = useRef<HTMLTextAreaElement>(null); // Ссылка на textarea

  // Функция для автоматического расширения textarea
  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Сбрасываем высоту
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Устанавливаем высоту в зависимости от контента
    }
  };

  const sendMessage = () => {
    if (message.trim()) {
      setIsLoading(true);
      console.log("Message Sent:", message);

      // Эмулируем отправку сообщения
      setTimeout(() => {
        setIsLoading(false);
        setMessage(""); // Очищаем текстовое поле
      }, 2000); 
    }
  };

  return (
    <div className="flex items-end justify-center max-h-screen p-4">
      {/* Поле для ввода сообщения */}
      <div className="flex flex-col items-center space-y-3 pb-4 bg-gray-300 rounded-xl shadow-md w-full p-2">
        <div className="flex items-center space-x-3 w-full">
          <textarea
            ref={textareaRef}
            placeholder="Спросите что-нибудь..." 
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              handleInput(); // Вызываем обработчик при изменении текста
            }} 
            className="flex-1 max-h-26 w-full px-4 text-sm p-4 bg-gray-300 text-background rounded-md resize-none focus:outline-none overflow-hidden"
            style={{ minHeight: "8rem" }} // Устанавливаем минимальную высоту
          />
          <Button
            onClick={sendMessage}
            isLoading={isLoading}
            disabled={isLoading || !message.trim()} 
            className="bg-gray-300 hover:bg-gray-300 w-11 px-3 py-2 rounded-md flex items-center"
          >
            <Icons.send className="w-8 h-8 text-black"/>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MessageInput;
