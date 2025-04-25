import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ButtonProps } from "../../common.types";
import { Icons } from "../../ui/icons/Icons";

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "solid",
  isLoading = false,
  disabled = false,
  onClick,
  className = "",
}) => {
  const baseStyles =
    "w-full flex justify-center items-center gap-2 rounded-full px-6 py-3 font-semibold transition-all";

  const variants: Record<string, string> = {
    solid:
      "bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed",
    outline:
      "border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 disabled:border-gray-300 disabled:text-gray-400",
    ghost:
      "text-indigo-600 hover:bg-indigo-50 disabled:text-gray-400 disabled:bg-transparent",
  };

  const SpinnerIcon = Icons.spinner;

  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      <AnimatePresence initial={false} mode="wait">
        {isLoading ? (
          <motion.div
            key="spinner"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <SpinnerIcon className="animate-spin w-5 h-5" />
          </motion.div>
        ) : (
          <motion.span
            key="children"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default Button;


// Пример использования:
// <Button variant="solid">Войти</Button>                     // Стандартный вариант
// <Button isLoading>Войти</Button>                           // Спиннер загрузки
// <Button disabled>Войти</Button>                            // Кнопка неактивна
// <Button variant="outline" className="border-violet-1 text-violet-1 hover:bg-violet-2"> Войти </Button> // Кнопка с обводкой
// <Button variant="outline" isLoading>Войти</Button>         // Кнопка с обводкой и спиннером
// <Button variant="ghost">Войти</Button>                     // Кнопка без фона
// <Button variant="ghost" isLoading>Войти</Button>           // Кнопка без фона и спиннер загрузки
