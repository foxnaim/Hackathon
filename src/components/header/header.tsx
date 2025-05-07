import React, { useState, useEffect } from "react";
import { Icons } from "../../ui/icons/Icons";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../api/context";
import axios from "axios";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Menu from "../menu/Menu";

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<{ username?: string; email?: string; avatar?: string | null } | null>(null);
  const [loading, setLoading] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    onMenuClick?.();
  };

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

  const toggleUserMenu = () => {
    setUserMenu(!userMenu);
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
          <span className="text-3xl font-semibold">Nexora AI</span>
          <div className="flex items-center gap-2 relative">
            {user && (
              <label className="relative cursor-pointer">
                <div
                  onClick={toggleUserMenu}
                  className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-gray-300"
                >
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
              <button
                onClick={handleLogout}
                className="w-full hover:bg-gray-200 text-start p-2 rounded-md flex justify-start items-center gap-1"
              >
                <Icons.logout className="size-6 text-gray-700" />
                Выйти
              </button>
            </div>
          )}
        </div>

      </header>
    </>
  );
};

export default Header;
