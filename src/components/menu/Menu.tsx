import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icons } from "../../ui/icons/Icons";
import { Link, useNavigate, useParams } from "react-router-dom";
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
  const [search, setSearch] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const navigate = useNavigate();
  const { conversationId } = useParams();

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

  // Фильтрация чатов по поиску
  const filteredChats = chats.filter(chat =>
    chat.name?.toLowerCase().includes(search.toLowerCase())
  );

  const menuContent = (
    <div className="h-full flex flex-col rounded-2xl shadow-xl p-6 my-4 md:my-6 w-full max-w-xs min-w-[260px] text-gray-900">
      {/* Логотип и название */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 shadow-md" />
        <span className="text-2xl font-extrabold tracking-tight text-gray-900 select-none font-mono">Nexora AI</span>
      </div>

      {/* Поиск */}
      <div className="bg-gray-100 rounded-2xl flex items-center px-4 py-3 mb-6">
        <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input
          className="bg-transparent outline-none w-full text-gray-900 placeholder-gray-400 text-base"
          placeholder="Поиск..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Список чатов */}
      <div className="mb-2 text-xs font-bold text-gray-400 tracking-widest uppercase">Мои чаты</div>
      <ul className="space-y-2">
        <AnimatePresence>
          {chats.map((chat, index) => {
            const isActive = conversationId === chat.id;
            return (
              <motion.li
                key={chat.id}
                className="relative group"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.18, type: "tween" }}
              >
                <motion.div
                  className="flex items-center justify-between bg-gray-100 hover:bg-gray-200 rounded-xl px-4 py-3 transition-colors duration-150 relative"
                  whileHover={{ scale: 1.02, boxShadow: "0 2px 16px 0 rgba(34,211,238,0.08)" }}
                  transition={{ type: "tween", duration: 0.18 }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Side bar/line only on hover */}
                  {hoveredIndex === index && (
                    <motion.div
                      className="absolute left-2 top-2 bottom-2 w-1 rounded-full"
                      style={{
                        background: "linear-gradient(180deg, #22d3ee 0%, #818cf8 100%)",
                        boxShadow: "0 0 8px 2px #a5f3fc66",
                      }}
                      initial={{ opacity: 0, scaleY: 0.7 }}
                      animate={{ opacity: 1, scaleY: 1 }}
                      exit={{ opacity: 0, scaleY: 0.7 }}
                      transition={{ duration: 0.18, type: 'tween' }}
                    />
                  )}
                  {/* Glow effect on hover */}
                  <motion.span
                    className="absolute left-1 top-1/2 -translate-y-1/2 w-2 h-8 rounded-full pointer-events-none"
                    style={{background: "radial-gradient(circle at 50% 50%, #a5f3fc 60%, transparent 100%)"}}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0 }}
                    whileHover={{ opacity: 1, scale: 1.1 }}
                    transition={{ duration: 0.18, type: "tween" }}
                  />
                  {/* Dot if active */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.span
                        className="mr-2 w-3 h-3 rounded-full bg-gradient-to-br from-cyan-400 to-blue-400 shadow-md"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.18, type: "spring", stiffness: 300 }}
                      />
                    )}
                  </AnimatePresence>
                  {editIndex === index ? (
                    <input
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onBlur={() => saveEditChat(index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className="flex-1 bg-transparent outline-none"
                    />
                  ) : (
                    <Link to={`/conversation/${chat.id}`} className="flex-1 flex items-center">
                      {chat.name || "Без названия"}
                    </Link>
                  )}
                  <button onClick={() => handleChatMenuToggle(index)} className="ml-2">
                    <Icons.more className="w-5 h-5 text-gray-600" />
                  </button>
                </motion.div>
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
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>

      {/* Кнопка + */}
      <div className="mt-auto flex justify-start mb-5">
        <motion.button
          initial="rest"
          whileHover="hover"
          animate="rest"
          variants={{
            rest: { width: 48, backgroundColor: "#fff", boxShadow: "0 2px 8px 0 rgba(80,80,120,0.08)" },
            hover: { width: 224, backgroundColor: "#fff", boxShadow: "0 4px 24px 0 rgba(80,80,120,0.16)" },
          }}
          transition={{ type: "tween", duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
          className="relative flex items-center rounded-xl overflow-hidden group transition-all border border-gray-200 shadow"
          style={{ height: 48, minWidth: 48 }}
          onClick={handleCreateChat}
        >
          {/* Светящаяся подсветка */}
          <motion.div
            variants={{
              rest: { opacity: 0, scale: 0.8 },
              hover: { opacity: 1, scale: 1.18 },
            }}
            transition={{ duration: 0.18, type: "tween", ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0 rounded-xl pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at 50% 80%, #e0e7ff 0%, transparent 80%)",
              zIndex: 0,
            }}
          />
          {/* Иконка */}
          <motion.span
            className="z-10 flex items-center justify-center text-2xl"
            variants={{
              rest: { color: "#18181b", x: 0 },
              hover: { color: "#18181b", x: 0 },
            }}
            transition={{ duration: 0.12 }}
            style={{ width: 48, minWidth: 48, justifyContent: "center" }}
          >
            +
          </motion.span>
          {/* Текст выезжает при ховере */}
          <motion.span
            variants={{
              rest: { x: 20, opacity: 0, color: "#18181b" },
              hover: { x: 0, opacity: 1, color: "#18181b" },
            }}
            transition={{ duration: 0.18, type: "tween", ease: [0.4, 0, 0.2, 1] }}
            className="z-10 text-base font-normal whitespace-nowrap pl-2"
            style={{ pointerEvents: "none" }}
          >
            Создать чат
          </motion.span>
        </motion.button>
      </div>
    </div>
  );

  // Мобильная версия — выезжающее меню
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

  return menuContent;
};

export default Menu;
