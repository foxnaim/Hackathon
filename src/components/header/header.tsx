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
    <div className="w-full h-auto bg-gray-300">
      <div className="p-8 mx-auto py-1 flex justify-between items-center">
        <motion.h2
          className="font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Кнопка гамбургера */}
          <button onClick={toggleMenu} className="items-center justify-center flex">
            <Icons.menu className="w-8 h-8 text-black" />
          </button>
        </motion.h2>

        {/* Навигация для больших экранов */}
        <nav className="hidden lg:block">
          <motion.ul
            className="flex gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {ItemMenu.map((item, index) => (
              <MenuItem key={index} name={item.title} link={item.link} />
            ))}
          </motion.ul>
        </nav>

        {/* Боковое меню для мобильных устройств */}
        {isMenuOpen && (
          <motion.div
            className="fixed top-0 left-0 w-[400px] h-full bg-gray-400 text-black shadow-xl z-150"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button onClick={toggleMenu} className="text-white absolute top-4 right-4">
              <Icons.close className="w-8 h-8" />
            </button>

            {/* Разделение на 50/50: Статистики и Чаты */}
            <div className="h-full flex flex-col">
              {/* Статистики */}
              <div className="flex-1 p-4 border-b border-gray-400">
                <h3 className="text-lg font-bold mb-2">Статистики</h3>
                <ul className="space-y-4">
                  <li>Активные пользователи: 120</li>
                  <li>Чат-активность: 85%</li>
                  <li>Среднее время ответа: 3 секунды</li>
                </ul>
              </div>

              {/* Чаты */}
              <div className="flex-1 p-4">
                <h3 className="text-lg font-bold mb-2">Чаты</h3>
                <ul className="space-y-4">
                  <li>Чат 1</li>
                  <li>Чат 2</li>
                  <li>Чат 3</li>
                  <li>Создать новый чат</li>
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
