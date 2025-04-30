import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Icons } from "../../ui/icons/Icons";
import { Link, useNavigate } from "react-router-dom"; // ⬅️ импорт useNavigate
import { API_URL } from "../../api/context";
import axios from "axios";
import Cookies from "js-cookie";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<{ username?: string; email?: string } | null>(null);
  const navigate = useNavigate(); // ⬅️ инициализация навигации

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
          navigate("/register"); // ⬅️ если токена нет — на регистрацию
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
        console.error("Ошибка при получении профиля:", error);
        setUser(null);
        navigate("/register"); // ⬅️ если ошибка — на регистрацию
      }
    };

    fetchUser();
  }, [navigate]);

  return (
    <header className="w-full h-16 bg-gray-100 shadow-sm shadow-gray-400 z-50">
      <div className="px-4 sm:px-6 mx-auto py-3 flex justify-between items-center">
        {/* Бургер-кнопка */}
        <button onClick={toggleMenu} className="flex items-center">
          <Icons.menu className="w-7 h-7 text-gray-600" />
        </button>

        {/* Иконка профиля + имя */}
        <div className="flex items-center space-x-2">
          <Icons.user className="w-7 h-7 text-gray-600" />
          {user && <span className="text-sm text-gray-700">{user.username || user.email}</span>}
        </div>

        {/* Мобильное меню */}
        {isMenuOpen && (
          <motion.div
            className="fixed top-0 left-0 h-screen w-2/3 md:w-1/3 lg:w-1/4 bg-white z-[9999] shadow-xl shadow-gray-700 flex flex-col justify-between"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
          >
            <div>
              <div className="flex justify-end p-4">
                <button onClick={toggleMenu}>
                  <Icons.close className="w-8 h-8 text-gray-700" />
                </button>
              </div>

              <div className="px-4">
                <h3 className="text-lg font-bold mb-2">Статистики</h3>
                <ul className="space-y-3">
                  <li>
                    <Link to="/trends" className="block bg-gray-200 rounded-md px-3 py-2">
                      Dashboard #1
                    </Link>
                  </li>
                  <li className="block bg-gray-200 rounded-md px-3 py-2">Dashboard #2</li>
                  <li className="block bg-gray-200 rounded-md px-3 py-2">Dashboard #3</li>
                </ul>

                <h3 className="text-lg font-bold mt-6 mb-2 p-2">Чаты</h3>
                <ul className="flex flex-col space-y-4">
                  <Link to="/"><li className="block bg-gray-200 rounded-md px-3 py-2">Чат 1</li></Link>
                  <Link to="/"><li className="block bg-gray-200 rounded-md px-3 py-2">Чат 2</li></Link>
                  <Link to="/"><li className="block bg-gray-200 rounded-md px-3 py-2">Чат 3</li></Link>
                  <Link to="/"><li className="block bg-gray-300 rounded-md px-3 py-2 text-center">+ Новый чат</li></Link>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;

