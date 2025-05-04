import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import Button from "../button/button";
import { Icons } from "../../ui/icons/Icons";
import { API_URL } from "../../api/context";
import { useParams } from "react-router-dom";
import { useScrollToBottom } from "../../hook/ScrollBar";

type MessageType = {
  content: string;
  role: "user" | "assistant";
  conversationId?: string;
};

const ChatComponent: React.FC = () => {
  const { conversationId } = useParams();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useScrollToBottom([messages, isLoading]);

  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
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

  const sendMessage = async () => {
    if (!message.trim()) return;

    const newMessage: MessageType = {
      content: message.trim(),
      role: "user",
      conversationId,
    };

    setMessages((prev) => [...prev, newMessage]);
    setIsLoading(true);

    await sendMessageToServer(newMessage);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchMessages = async () => {
      try {
        const token = Cookies.get("authorization");
        const response = await axios.get(`${API_URL}/conversation/${conversationId}`, {
          withCredentials: true,
          headers: { Authorization: token },
          signal: controller.signal,
        });

        if (response.data?.length > 0) {
          setMessages(response.data[0].messages);
        }
      } catch (error: any) {
        if (axios.isCancel(error)) {
          console.log("Request canceled:", error.message);
        } else {
          console.error(error);
          toast.error("Не удалось загрузить сообщения с сервера");
        }
      }
    };

    fetchMessages();

    return () => controller.abort();
  }, [conversationId]);

  return (
    <div className="flex flex-col h-screen">
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-hide"
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-3 rounded-lg max-w-lg whitespace-pre-wrap break-words ${
                msg.role === "user" ? "bg-gray-100" : "bg-gray-200"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="text-sm text-gray-500 animate-pulse">
              Бот печатает...
            </div>
          </div>
        )}
      </div>

      <div className="p-8 border-2 border-gray-200 rounded-xl shadow-2xl mb-5">
        <div className="flex justify-between items-start gap-2">
          <textarea
            ref={textareaRef}
            placeholder="Спросите что-нибудь..."
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              handleInput();
            }}
            onKeyDown={handleKeyDown}
            className="px-4 text-sm w-full rounded-md resize-none focus:outline-none"
            style={{ minHeight: "50px", maxHeight: "150px" }}
          />
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
