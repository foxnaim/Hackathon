import { useState, useEffect } from "react";
import { Icons } from "../../../ui/icons/Icons";
import { motion, AnimatePresence } from "framer-motion";

const HeaderInfo = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        menuOpen &&
        !(event.target as HTMLElement).closest("#mobile-menu") &&
        !(event.target as HTMLElement).closest("#burger-button")
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [menuOpen]);

  return (
    <header className="w-full my-5 h-16 relative">
      <div className="px-5 h-16 rounded-xl flex justify-between items-center shadow-2xl">
        <span className="text-3xl font-semibold">Nexora AI</span>
        <button
          id="burger-button"
          className="md:hidden text-3xl"
          onClick={toggleMenu}
        >
          <Icons.menu className="text-xl" />
        </button>
        <nav className="hidden md:flex space-x-6 text-gray-600 ">
          <a href="#about-us" className="hover:text-green-600">
            О нас
          </a>
          <a href="#how-to-use" className="hover:text-green-600">
            Как использовать
          </a>
          <a href="#problem-solving" className="hover:text-green-600">
            Решение проблем
          </a>
        </nav>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white p-5 shadow-lg absolute top-20 rounded-xl left-0 w-full z-10"
          >
            <nav>
              <ul className="space-y-3 text-gray-600">
                <li>
                  <a
                    href="/about-us"
                    className="block hover:text-green-600"
                    onClick={() => setMenuOpen(false)}
                  >
                    О нас
                  </a>
                </li>
                <li>
                  <a
                    href="#how-to-use"
                    className="block hover:text-green-600"
                    onClick={() => setMenuOpen(false)}
                  >
                    Как использовать
                  </a>
                </li>
                <li>
                  <a
                    href="#problem-solving"
                    className="block hover:text-green-600"
                    onClick={() => setMenuOpen(false)}
                  >
                    Решение проблем
                  </a>
                </li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default HeaderInfo;
