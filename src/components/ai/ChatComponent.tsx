import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import Button from "../button/button";
import { Icons } from "../../ui/icons/Icons";
import { API_URL } from "../../api/context";
import { useParams } from "react-router-dom";

type MessageType = {
  content: string;
  role: "user" | "assistant";
};

const ChatComponent: React.FC = () => {
  let { conversationId } = useParams();
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

  /** Загружаем сообщения с сервера */
  const fetchMessages = async () => {
    if (!conversationId) return;

    try {
      const token = Cookies.get("authorization");
      const response = await axios.get(`${API_URL}/conversation/${conversationId}`, {
        withCredentials: true,
        headers: { Authorization: token },
      });

      setMessages(response.data.messages ?? []);
    } catch (error) {
      toast.error("Не удалось загрузить сообщения");
      setMessages([]); // fallback
    }
  };

  /** Отправляем сообщение на сервер */
  const sendMessageToServer = async (newMessage: MessageType) => {
    try {
      const token = Cookies.get("authorization");

      const response = await axios.post(
        `${API_URL}/message/`,
        {
          ...newMessage,
          conversationId,
        },
        {
          withCredentials: true,
          headers: { Authorization: token },
        }
      );

      setMessages((prev) => [...prev, response.data]);
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

  /** Локально добавляем сообщение и отправляем его */
  const sendMessage = () => {
    if (message.trim()) {
      setIsLoading(true);

      const newMessage: MessageType = {
        content: message.trim(),
        role: "user",
      };

      // Локально добавляем сообщение
      setMessages((prev) => [...prev, newMessage]);

      // Отправляем сообщение на сервер
      sendMessageToServer(newMessage);
    }
  };

  /** Отправка по Enter */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  
  useEffect(() => {
    fetchMessages();
  }, [conversationId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`p-3 rounded-lg max-w-lg whitespace-pre-wrap bg-gray-100`}>
              {msg.content}
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

      <div className="p-4 md:p-8 rounded-xl shadow-2xl shadow-pink-200 mb-5">
        <div className="flex space-x-3">
          <textarea
            ref={textareaRef}
            placeholder="Спросите что-нибудь..."
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              handleInput();
            }}
            onKeyDown={handleKeyDown}
            className="flex-1 px-4 text-sm p-2 w-full md:w-[700px] rounded-md resize-none focus:outline-none"
            style={{ minHeight: "50px", maxHeight: "150px" }}
          />
          <Button
            variant="ghost"
            onClick={sendMessage}
            isLoading={isLoading}
            disabled={isLoading || !message.trim()}
            className="flex w-10 h-10 bg-transparent p-3 rounded-md"
          >
            <Icons.send className="w-6 h-6 text-gray-500" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
