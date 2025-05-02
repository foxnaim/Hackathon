import React, { useState, useRef } from "react";
import Button from "../button/button"; 
import { Icons } from "../../ui/icons/Icons";

type MessageType = {
  id: number;
  text: string;
  sender: "user" | "bot";
  link: string | null;
};

const initialMessages: MessageType[] = [
  { id: 1, text: "Привет, подскажи мне самые перспективные ниши в стартапе", sender: "user", link: null },
  {
    id: 2,
    text: `Привет! Вот **топ-3 самые востребованные ниши для стартапов в 2025 году**, исходя из глобальных трендов, инвестиций и потребностей рынка:

---

### 🔹 1. **AI-сервисы для B2B**
**Почему востребовано:** Бизнесы активно внедряют ИИ для повышения эффективности. Особенно популярны:
- Автоматизация документооборота и анализа данных
- Генерация контента, email-ответов, транскрибация
- Внутренние чат-боты и агенты

**Пример:** сервис, который с помощью ИИ обрабатывает входящие письма и автоматически формирует предложения/ответы.

---

### 🔹 2. **Здоровье и Digital Health**
**Почему востребовано:** Люди всё больше заботятся о здоровье, особенно в онлайне.
- Мобильные трекеры здоровья
- Умные напоминалки о приёме лекарств
- Психологическая поддержка через чат/видео

**Пример:** приложение для мониторинга ментального состояния с ИИ-анализом настроения.

---

### 🔹 3. **EdTech с ИИ**
**Почему востребовано:** Образование становится персонализированным и гибким.
- Платформы с адаптивным обучением
- Генерация тестов и курсов на основе ИИ
- Ассистенты для студентов и учителей

**Пример:** ИИ-платформа, создающая курсы под пользователя за 5 минут.

---

Хочешь, выгружу статистику по перспективным нишам в стартапе`,
    sender: "bot",
    link: null,
  },
  { id: 3, text: "Да, скинь пожалуйста топ 3 перспективных ниш в стартапе", sender: "user", link: null },
  { id: 4, text: "Конечно! Вот актуальная статистика по трём наиболее перспективным нишам для стартапов в 2025 году:", sender: "bot", link: "/trends" },
];

const ChatComponent: React.FC = () => {
  const [messages, setMessages] = useState<MessageType[]>(initialMessages);
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

      const newMessage: MessageType = {
        id: Date.now(),
        text: message.trim(),
        sender: "user",
        link: null,
      };

      setMessages((prev) => [...prev, newMessage]);

      setTimeout(() => {
        const botReply: MessageType = {
          id: Date.now() + 1,
          text: `Спасибо за сообщение! 🚀 Я его получил: "${message.trim()}"`,
          sender: "bot",
          link: null,
        };

        setMessages((prev) => [...prev, botReply]);
        setIsLoading(false);
        setMessage("");
        if (textareaRef.current) {
          textareaRef.current.style.height = "auto";
        }
      }, 2000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-gray-100 p-4 text-lg font-semibold text-center rounded-b-md">
        💬 Чат с AI-ассистентом
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-3 rounded-md max-w-lg ${
              msg.sender === "user" ? "bg-blue-200 self-end" : "bg-gray-300 self-start"
            }`}
          >
            <div className="whitespace-pre-wrap">{msg.text}</div>
            {msg.link && (
              <a href={msg.link} className="text-blue-600 underline text-sm">
                Перейти
              </a>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="text-sm text-gray-500 animate-pulse">Бот печатает...</div>
        )}
      </div>

      {/* НЕ ТРОГАННАЯ ЧАСТЬ */}
      <div className="p-8 rounded-t-xl shadow-2xl">
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
              className="flex-1 px-4 text-sm p-2 w-[500px] bg-gary-300 rounded-md resize-none focus:outline-none overflow-y-auto"
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
