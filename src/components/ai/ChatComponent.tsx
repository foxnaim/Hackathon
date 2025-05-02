import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import Button from "../button/button";
import { Icons } from "../../ui/icons/Icons";
import { API_URL } from "../../api/context";

type MessageType = {
  id: number;
  text: string;
  sender: "user" | "bot";
  link: string | null;
};

const ChatComponent: React.FC = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const getMessages = async () => {
    try {
      const token = Cookies.get("authorization");
      const response = await axios.get(`${API_URL}/message`, {
        withCredentials: true,
        headers: { Authorization: token },
      });
      setMessages(response.data);
    } catch (error) {
      toast.error("Не удалось загрузить сообщения");
    }
  };

  const sendMessageToServer = async (newMessage: MessageType) => {
    try {
      const token = Cookies.get("authorization");
      const response = await axios.post(`${API_URL}/message`, newMessage, {
        withCredentials: true,
        headers: { Authorization: token },
      });
      const botReply: MessageType = response.data;
      setMessages((prev) => [...prev, botReply]);
    } catch (error) {
      toast.error("Ошибка при отправке сообщения");
    } finally {
      setIsLoading(false);
      setMessage("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const sendMessage = () => {
    if (message.trim()) {
      setIsLoading(true);

      const newMessage: MessageType = {
        id: Date.now(),
        text: message.trim(),
        sender: "user",
        link: null,
      };

      setMessages((prev) => [...prev, newMessage]);
      sendMessageToServer(newMessage);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="flex flex-col h-screen">
      <div
        className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#9CA3AF #E5E7EB",
        }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`p-3 rounded-lg max-w-lg whitespace-pre-wrap ${
                msg.sender === "user" ? "bg-gray-100" : ""
              }`}
            >
              {msg.text}
              {msg.link && (
                <div>
                  <a href={msg.link} className="underline text-sm">
                    Перейти
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="text-sm text-gray-500 animate-pulse">Бот печатает...</div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="p-8 rounded-xl shadow-2xl shadow-green-400 mb-5">
        <div className="flex space-x-3">
          <div>
            <textarea
              ref={textareaRef}
              placeholder="Спросите что-нибудь..."
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                handleInput();
              }}
              onKeyDown={handleKeyDown}
              className="flex-1 px-4 text-sm p-2 w-[700px] rounded-md resize-none focus:outline-none overflow-y-auto"
              style={{ minHeight: "50px", maxHeight: "150px" }}
            />
          </div>
          <Button
            variant="ghost"
            onClick={sendMessage}
            isLoading={isLoading}
            disabled={isLoading || !message.trim()}
            className="flex w-5 h-5 bg-transparent p-3 rounded-md"
          >
            <Icons.send className="w-6 h-6 text-gray-500" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
