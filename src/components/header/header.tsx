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
  const [loading, setLoading] = useState(false);
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
  }, [navigate]);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("avatar", file);
      try {
        setLoading(true);
        const token = Cookies.get("authorization");
        const { data } = await axios.post(`${API_URL}/users/upload-avatar`, formData, {
          withCredentials: true,
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        });
        setUser((prev) => ({ ...prev, avatar: data.avatarUrl }));
        toast.success("Фото профиля обновлено");
      } catch {
        toast.error("Ошибка при загрузке фото");
      } finally {
        setLoading(false);
      }
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
      navigate(`/conversation/${data}`);
      toast.success("Чат создан успешно!");
    } catch {
      toast.error("Ошибка при создании чата");
    }
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
        <div className="px-4 sm:px-6 h-full flex items-center justify-between">
          <button onClick={toggleMenu} className="flex items-center">
            <Icons.menu className="w-6 h-6 text-gray-600" />
          </button>

          <div className="flex items-center gap-2 relative">
            {user && (
              <label className="relative cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-gray-300">
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
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                  disabled={loading}
                />
              </label>
            )}
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="fixed top-0 left-0 h-screen w-2/3 md:w-1/3 lg:w-1/4 bg-white z-[9999] shadow-xl flex flex-col"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-end p-4">
                <button onClick={toggleMenu}>
                  <Icons.close className="w-7 h-7 text-gray-700" />
                </button>
              </div>

              <nav className="px-4 flex-1">
                <h3 className="text-lg font-semibold my-4">Статистика</h3>
                <ul className="space-y-3">
                  <li>
                    <Link to="/trends" className="block bg-gray-100 hover:bg-gray-200 rounded-md px-3 py-2">
                      Dashboard #1
                    </Link>
                  </li>
                </ul>

                <div className="border border-gray-300 my-6" />

                <h3 className="text-lg font-semibold my-4">Чаты</h3>
                <ul className="space-y-3">
                  <li>
                    <Link to="/" className="block bg-gray-100 hover:bg-gray-200 rounded-md px-3 py-2">
                      Чат 1
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleCreateChat}
                      className="w-full bg-green-400 hover:bg-green-500 text-white text-center rounded-md px-3 py-2 font-medium"
                    >
                      + Новый чат
                    </button>
                  </li>
                </ul>
              </nav>

              <div className="p-4 border-t border-gray-300">
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-500 hover:bg-red-600 text-white rounded-md px-3 py-2 font-medium"
                >
                  Выйти
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
