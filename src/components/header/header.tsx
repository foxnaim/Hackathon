import React, { useState, useEffect } from "react";
import { Icons } from "../../ui/icons/Icons";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../api/context";
import axios from "axios";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<{ username?: string; email?: string; avatar?: string | null } | null>(null);
  const [loading, setLoading] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const [logoutConfirm, setLogoutConfirm] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
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
      <header className="w-full h-16 bg-gray-50 shadow-xl z-50">
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
            <div
              className="absolute right-6 top-16 border-2 border-gray-300 w-48 p-2 flex flex-col items-center transition-all duration-300 rounded-xl bg-white"
              style={{
                background: isHovered
                  ? "linear-gradient(180deg, transparent 95%, rgb(255, 0, 43) 100%)"
                  : "",
                borderRadius: "0 0 0.75rem 0.75rem",
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <AnimatePresence>
                {!logoutConfirm && (
                  <motion.button
                    key="logout"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.18 }}
                    onClick={() => setLogoutConfirm(true)}
                    className="w-full flex items-center gap-2 justify-start text-black text-start p-2 rounded-md font-medium relative group"
                    style={{ overflow: "hidden" }}
                    whileHover="hover"
                  >
                    <motion.div
                      className="absolute left-0 right-0 bottom-0 h-1 pointer-events-none"
                      variants={{
                        hover: { opacity: 1 },
                        initial: { opacity: 0 },
                      }}
                      initial="initial"
                      animate="initial"
                      transition={{ duration: 0.18 }}
                      style={{
                        background: "linear-gradient(180deg, transparent 0%, #f43f5e 100%)",
                        borderRadius: "0 0 0.75rem 0.75rem",
                      }}
                    />
                    <Icons.logout className="size-6 z-10" />
                    <span className="z-10">Выйти</span>
                  </motion.button>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {logoutConfirm && (
                  <motion.div
                    key="confirm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.18 }}
                    className="flex items-center gap-4 px-6 py-3 rounded-lg bg-transparent text-black border-none relative"
                    style={{
                      minWidth: 180,
                      overflow: "hidden",
                    }}
                  >
                    <div className="absolute left-0 right-0 bottom-0 h-1 pointer-events-none" />
                    <button
                      onClick={() => {
                        setLogoutConfirm(false);
                        handleLogout();
                      }}
                      className="flex items-center gap-1 text-black hover:text-green-400 transition"
                    >
                      <span>✓</span> Yes(Y)
                    </button>
                    <span className="text-gray-500">|</span>
                    <button
                      onClick={() => setLogoutConfirm(false)}
                      className="flex items-center gap-1 text-black hover:text-red-400 transition"
                    >
                      <span>✗</span> No(n)
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
