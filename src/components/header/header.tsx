import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icons } from "../../ui/icons/Icons";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../api/context";
import axios from "axios";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<{ username?: string; email?: string; avatar?: string | null } | null>(null);
  const [chats, setChats] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const [activeChatMenu, setActiveChatMenu] = useState<string | null>(null);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleChatMenu = (chatId: string) => setActiveChatMenu(activeChatMenu === chatId ? null : chatId);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isMenuOpen);
    return () => document.body.classList.remove("overflow-hidden");
  }, [isMenuOpen]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = Cookies.get("authorization");
        if (!token) {
          toast.warn("Авторизация необходима. Перенаправляем...");
          navigate("/register");
          return;
        }
        const { data } = await axios.get(`${API_URL}/users/profile`, {
          withCredentials: true,
          headers: { Authorization: token },
        });
        setUser(data);
      } catch {
        toast.error("Не удалось получить профиль. Перенаправляем...");
        navigate("/register");
      }
    };

    fetchUser();
    fetchChats();
  }, [navigate]);

  /** Загружаем список чатов */
  const fetchChats = async () => {
    try {
      const token = Cookies.get("authorization");
      const { data } = await axios.get(`${API_URL}/conversation`, {
        withCredentials: true,
        headers: { Authorization: token },
      });
      setChats(data);
    } catch {
      toast.error("Не удалось загрузить чаты");
    }
  };

  /** Создание нового чата */
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

  /** Редактирование чата */
  const handleEditChat = (chatId: string) => {
    toast.info(`Редактирование чата ${chatId} пока в разработке`);
  };

  /** Удаление чата */
  const handleDeleteChat = async (chatId: string) => {
    try {
      const token = Cookies.get("authorization");
      await axios.delete(`${API_URL}/conversation/${chatId}`, {
        withCredentials: true,
        headers: { Authorization: token },
      });
      toast.success("Чат удален успешно!");
      await fetchChats();
    } catch {
      toast.error("Ошибка при удалении чата");
    }
  };

  const toogleUserMenu = () => setUserMenu(!userMenu);

  const handleLogout = () => {
    Cookies.remove("authorization");
    setUser(null);
    navigate("/register");
    toast.info("Вы вышли из аккаунта");
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <header className="w-full h-16 bg-white shadow-sm shadow-gray-200 z-50">
        <div className="relative px-4 sm:px-6 h-full flex items-center justify-between">
          <button onClick={toggleMenu} className="flex items-center">
            <Icons.menu className="w-6 h-6 text-gray-600" />
          </button>

          <div className="flex items-center gap-2 relative">
            {user && (
              <label className="relative cursor-pointer">
                <div onClick={toogleUserMenu} className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-gray-300">
                  {loading ? (
                    <div className="animate-pulse w-full h-full bg-gray-300" />
                  ) : user.avatar ? (
                    <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xl font-bold text-gray-600">
                      {user.username?.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
              </label>
            )}
          </div>
          {userMenu && (
            <div className="absolute right-6 top-20 border-2 border-gray-300 rounded-xl w-48 p-2">
              <button onClick={handleLogout} className="w-full hover:bg-gray-200 text-start p-2 rounded-md flex justify-start items-center gap-1">
                <Icons.logout className="size-6 text-gray-700" />
                Выйти
              </button>
            </div>
          )}
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div className="fixed top-0 left-0 h-screen w-2/3 bg-white z-[9999] shadow-xl flex flex-col">
              <div className="flex justify-between items-center p-4">
                <button onClick={toggleMenu}>
                  <Icons.close className="w-7 h-7 text-gray-700" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-4">
                <h3 className="text-lg font-semibold mb-4">Чаты</h3>
                <ul className="space-y-3">
                  {chats.map((chat) => (
                    <li key={chat.id} className="flex items-center justify-between bg-gray-100 hover:bg-gray-200 rounded-md px-3 py-2">
                      <Link to={`/conversation/${chat.id}`} className="flex-grow">
                        {chat.name || `Чат`}
                      </Link>
                      <button onClick={() => toggleChatMenu(chat.id)}>
                        <Icons.more className="w-5 h-5 text-gray-600" />
                      </button>
                      {activeChatMenu === chat.id && (
                        <div className="absolute mt-2 w-32 bg-white border rounded-lg shadow-md p-2">
                          <button onClick={() => handleEditChat(chat.id)} className="block w-full text-left p-2 hover:bg-gray-200">Редактировать</button>
                          <button onClick={() => handleDeleteChat(chat.id)} className="block w-full text-left p-2 hover:bg-gray-200 text-red-600">Удалить</button>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 border-t border-gray-300">
                <button onClick={handleCreateChat} className="w-full bg-green-400 hover:bg-green-500 text-white rounded-md px-3 py-2 font-medium">+ Новый чат</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;
