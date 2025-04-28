import React from "react";
import { motion } from "framer-motion";
import { Icons } from "../../ui/icons/Icons";
import { InputProps } from "../../common.types";

const iconMap = {
  email: Icons.email,
  password: Icons.password,
  user: Icons.user,
  phone: Icons.phone,
  search: Icons.search,
};

export const Input: React.FC<InputProps & { value: string; onChange: React.ChangeEventHandler<HTMLInputElement> }> = ({
  placeholder = "Введите текст...",
  disabled = false,
  type = "text",
  icon,
  className = "",
  value,
  onChange,
}) => {
  const IconComponent = icon ? iconMap[icon] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <motion.div
        tabIndex={-1}
        whileFocus={{ scale: 1.02 }}
        whileTap={{ scale: 0.99 }}
        className="relative w-full"
      >
        {IconComponent && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <IconComponent className="text-text w-5 h-5" /> {/* Иконка останется с оригинальным цветом */}
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          className={`w-full border-2 border-gray-300 rounded-lg px-4 text-black focus:ring-2 focus:ring-primary focus:border-0 ${
            IconComponent ? "pl-12" : "pl-4"
          } py-3 text-base outline-none transition ${className}`} 
          // Заменили text-text на text-black для черного текста
        />
      </motion.div>
    </motion.div>
  );
};

export default Input;
