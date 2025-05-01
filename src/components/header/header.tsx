import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Icons } from "../../ui/icons/Icons";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../api/context";
import axios from "axios";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<{ username?: string; email?: string; avatar?: string | null } | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden", "h-screen");
    } else {
      document.body.classList.remove("overflow-hidden", "h-screen");
    }

    return () => {
      document.body.classList.remove("overflow-hidden", "h-screen");
    };
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

        const response = await axios.get(`${API_URL}/users/profile`, {
          withCredentials: true,
          headers: {
            Authorization: token,
          },
        });

        setUser(response.data);
      } catch (error) {
        toast.error("Не удалось получить профиль. Перенаправляем...");
        setUser(null);
        navigate("/register");
      }
    };

    fetchUser();
  }, [navigate]);

  const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append("avatar", file);

        try {
          setLoading(true);
          const token = Cookies.get("authorization");
          const response = await axios.post(`${API_URL}/users/upload-avatar`, formData, {
            withCredentials: true,
            headers: {
              Authorization: token,
              "Content-Type": "multipart/form-data",
            },
          });

          // Update user data with new avatar URL
          setUser((prevUser) => ({
            ...prevUser,
            avatar: response.data.avatarUrl,
          }));

          toast.success("Фото профиля обновлено");
        } catch (error) {
          toast.error("Ошибка при загрузке фото");
        } finally {
          setLoading(false);
        }
      }
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <header className="w-full h-16 bg-white shadow-sm shadow-gray-200 z-50">
        <div className="px-4 sm:px-6 h-full flex items-center justify-between">
          {/* Menu Button */}
          <button onClick={toggleMenu} className="flex items-center">
            <Icons.menu className="w-6 h-6 text-gray-600" />
          </button>

          {/* User Avatar */}
          <div className="flex items-center gap-2">
            {user && (
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt="Avatar"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300 text-gray-600 flex items-center justify-center text-xl font-bold rounded-full">
                      {user.username?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>

                {/* Avatar upload */}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="absolute bottom-0 right-0 w-6 h-6 bg-white rounded-full text-xs cursor-pointer opacity-0 hover:opacity-100"
                />
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Menu */}
        {isMenuOpen && (
          <motion.div
            className="fixed top-0 left-0 h-screen w-2/3 md:w-1/3 lg:w-1/4 bg-white z-[9999] shadow-xl flex flex-col justify-between"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
          >
            <div>
              <div className="flex justify-start p-4">
                <button onClick={toggleMenu}>
                  <Icons.close className="w-7 h-7 text-gray-700" />
                </button>
              </div>

              <div className="px-4">
                <h3 className="text-lg font-semibold my-6">Статистика</h3>
                <ul className="space-y-3">
                  <li>
                    <Link to="/trends" className="block bg-gray-100 hover:bg-gray-200 rounded-md px-3 py-2">Dashboard #1</Link>
                  </li>
                </ul>
                <div className="border border-gray-300 mt-10" />
                <h3 className="text-lg font-semibold my-6">Чаты</h3>
                <ul className="space-y-3">
                  <li>
                    <Link to="/" className="block bg-gray-100 hover:bg-gray-200 rounded-md px-3 py-2">Чат 1</Link>
                  </li>

                    <Link to="/" className="block bg-[#4ade80] text-white text-center rounded-md px-3 py-2 font-medium">+ Новый чат</Link>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </header>
    </>
  );
};

export default Header;
