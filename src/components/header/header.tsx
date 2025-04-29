import React, { useState } from "react";
import { motion } from "framer-motion";
import { ItemMenu } from "./data/Menu"; // Импортируем данные
import MenuItem from "./MenuItem"; // Импортируем компонент меню
import { Icons } from "../../ui/icons/Icons";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Состояние для открытия/закрытия меню

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => {
      console.log("Menu state: ", !prevState); // Проверка состояния
      return !prevState; // Переключение состояния меню
    });
  };

  return (
    <div className=" w-full h-16 bg-gray-100 shadow-sm shadow-gray-400">
      <div className="px-6 mx-auto py-3 flex justify-between items-center">
        <motion.h2
          className="font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Кнопка гамбургера */}
          <button onClick={toggleMenu} className="items-center justify-center flex">
            <Icons.menu className="w-8 h-8 text-gray-600" />
          </button>
        </motion.h2>

        {/* Навигация для больших экранов */}
        <nav className="">
         <Icons.user className="w-8 h-8 text-gray-600" />
        </nav>

        {/* Боковое меню для мобильных устройств */}
        {isMenuOpen && (
          <motion.div
            className="fixed top-0 left-0 w-1/5 h-full bg-slate-200 text-black shadow-xl shadow-gray-700 z-150"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button onClick={toggleMenu} className="text-gray-600">
              <Icons.close className="w-8 h-8 mx-5 mt-4" />
            </button>

            {/* Разделение на 50/50: Статистики и Чаты */}
            <div className="h-full flex flex-col">
              {/* Статистики */}
              <div className=" ml-2  p-4 border-b border-gray-400">
                <h3 className="text-lg font-bold text-gray-700 mb-2">Статистики</h3>
                <ul className="space-y-4 mb-4">
                  <li className="px-3 py-2 bg-gray-300 rounded-md cursor-pointer flex justify-between items-center">
                    Dashboard #1
                    <span><Icons.arrow className="size-4 text-gray-700"/></span>
                  </li>
                  <li className="px-3 py-2 bg-gray-300 rounded-md cursor-pointer flex justify-between items-center">
                    Dashboard #2
                    <span><Icons.arrow className="size-4 text-gray-700"/></span>
                  </li>
                  <li className="px-3 py-2 bg-gray-300 rounded-md cursor-pointer flex justify-between items-center">
                    Dashboard #3
                    <span><Icons.arrow className="size-4 text-gray-700"/></span>
                  </li>
                </ul>
              </div>

              {/* Чаты */}
              <div className="flex-1 p-4 ml-2">
                <h3 className="text-lg font-bold text-gray-700 mb-2">Чаты</h3>
                <ul className="space-y-4">
                <li className="px-3 py-2 bg-gray-300 rounded-md cursor-pointer flex justify-between items-center">
                Чат 1
                    <span><Icons.arrow className="size-4 text-gray-700"/></span>
                  </li>
                  <li className="px-3 py-2 bg-gray-300 rounded-md cursor-pointer flex justify-between items-center">
                  Чат 2
                    <span><Icons.arrow className="size-4 text-gray-700"/></span>
                  </li>
                  <li className="px-3 py-2 bg-gray-300 rounded-md cursor-pointer flex justify-between items-center">
                  Чат 3
                    <span><Icons.arrow className="size-4 text-gray-700"/></span>
                  </li>
                  <li className="px-3 py-2 bg-gray-300 rounded-md cursor-pointer">Создать новый чат</li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Header;
