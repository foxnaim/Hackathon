import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icons } from "../../ui/icons/Icons";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../api/context";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
  user: { username?: string; email?: string; avatar?: string | null } | null;
}

const Menu: React.FC<MenuProps> = ({ isOpen, onClose, user }) => {
  const [chats, setChats] = useState<any[]>([]);
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isOpen);
    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const token = Cookies.get("authorization");
      const { data } = await axios.get(`${API_URL}/conversation`, {
        withCredentials: true,
        headers: { Authorization: token },
      });
      setChats(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Не удалось загрузить чаты");
    }
  };

  const handleCreateChat = async () => {
    try {
      const token = Cookies.get("authorization");
      if (!token) {
        toast.warn("Требуется авторизация");
        return;
      }
      const { data } = await axios.post(`${API_URL}/conversation`, {}, {
        withCredentials: true,
        headers: { Authorization: token },
      });
      await fetchChats();
      navigate(`/conversation/${data}`);
      toast.success("Чат создан успешно!");
    } catch {
      toast.error("Ошибка при создании чата");
    }
  };

  const handleDeleteChat = async (chatId: string) => {
    try {
      const token = Cookies.get("authorization");
      await axios.delete(`${API_URL}/conversation/${chatId}`, {
        withCredentials: true,
        headers: { Authorization: token },
      });
      setChats((prevChats) => prevChats.filter((chat) => chat.id !== chatId));
      toast.success("Чат успешно удален!");
    } catch {
      toast.error("Ошибка при удалении чата");
    }
    setOpenMenuIndex(null);
  };

  const handleEditChat = (index: number) => {
    setEditIndex(index);
    setEditText(chats[index].name || "");
    setOpenMenuIndex(null);
  };

  const saveEditChat = (index: number) => {
    if (editText.trim() === "") {
      setEditText(chats[index].name || "Твой чат");
      return;
    }

    const updatedChats = [...chats];
    updatedChats[index].name = editText.trim();
    setChats(updatedChats);
    setEditIndex(null);
    setOpenMenuIndex(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Enter") {
      saveEditChat(index);
    }
  };

  const handleChatMenuToggle = (index: number) => {
    setOpenMenuIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const menuContent = (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center p-4 md:hidden">
        <button onClick={onClose}>
          <Icons.close className="w-7 h-7 text-gray-700" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4">
        <h3 className="text-lg font-semibold mb-4">Чаты</h3>
        <ul className="space-y-2">
          {chats.map((chat, index) => (
            <li key={chat.id} className="relative">
              <div className="flex items-center justify-between bg-gray-100 hover:bg-gray-200 rounded-md px-3 py-2">
                {editIndex === index ? (
                  <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onBlur={() => saveEditChat(index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="flex-1 bg-transparent outline-none"
                  />
                ) : (
                  <Link to={`/conversation/${chat.id}`} className="flex-1">
                    {chat.name || "Без названия"} 
                  </Link>
                )}
                <button onClick={() => handleChatMenuToggle(index)} className="ml-2">
                  <Icons.more className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              {openMenuIndex === index && (
                <div className="absolute right-0 mt-2 bg-white border rounded-md shadow-md w-52 z-10">
                  <button
                    onClick={() => handleEditChat(index)}
                    className="flex items-center gap-2 w-full text-left px-3 py-2 hover:bg-gray-200"
                  >
                    <Icons.edit className="w-5 h-5 text-gray-600" />
                    <span>Редактировать</span>
                  </button>
                  <div className="border-t" />
                  <button
                    onClick={() => handleDeleteChat(chat.id)}
                    className="flex items-center gap-2 w-full text-left px-3 py-2 text-red-600 hover:bg-gray-100"
                  >
                    <Icons.delete className="w-5 h-5 text-red-600" />
                    <span>Удалить</span>
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="p-4 border-t border-gray-300">
        <button
          onClick={handleCreateChat}
          className="w-full bg-green-500 hover:bg-green-600 text-white rounded-md px-3 py-2 font-medium"
        >
          + Новый чат
        </button>
      </div>
    </div>
  );

  // Для мобильной версии используем анимированное выдвижное меню
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed top-0 left-0 h-screen w-2/3 bg-white z-[99] shadow-xl"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
          >
            {menuContent}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  // Для десктопной версии просто рендерим контент
  return menuContent;
};

export default Menu;
