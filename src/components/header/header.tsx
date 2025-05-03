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
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);

  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

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
  };

  const toggleUserMenu = () => {
    setUserMenu(!userMenu);
  };

  const handleChatMenuToggle = (index: number) => {
    setOpenMenuIndex((prevIndex) => (prevIndex === index ? null : index));
  };

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
                <div onClick={toggleUserMenu} className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-gray-300">
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
            <motion.div
              className="fixed top-0 left-0 h-screen w-2/3 md:w-1/3 lg:w-1/4 bg-white z-[99] shadow-xl flex flex-col"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center p-4">
                <button onClick={toggleMenu}>
                  <Icons.close className="w-7 h-7 text-gray-700" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-4">
                <h3 className="text-lg font-semibold mb-4">Чаты</h3>
                <ul className="space-y-2">
                  {chats.map((chat, index) => (
                    <li key={chat.id} className="relative">
                      <div className="flex items-center justify-between bg-gray-100 hover:bg-gray-200 rounded-md px-3 py-2">
                        <Link to={`/conversation/${chat.id}`} className="flex-1">{chat.name || ` Твой чат`}</Link>
                        <button onClick={() => handleChatMenuToggle(index)} className="ml-2">
                          <Icons.more className="w-5 h-5 text-gray-600" />
                        </button>
                      </div>
                      {openMenuIndex === index && (
                        <div className="absolute right-0 mt-2 bg-white border rounded-md shadow-md w-36 z-10">
                          <button
                            onClick={() => navigate(`/conversation/${chat.id}/edit`)}
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
                <button onClick={handleCreateChat} className="w-full bg-green-500 hover:bg-green-600 text-white rounded-md px-3 py-2 font-medium">
                  + Новый чат
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;
