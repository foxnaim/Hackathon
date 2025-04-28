import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icons } from "../../ui/icons/Icons"; 
import { CheckBoxProps } from "../../common.types";

const Checkbox: React.FC<CheckBoxProps> = ({
  isChecked = false,
  onChange,
  className = "",
  rounded = false,
  onClick,
  children,
}) => {
  const [checked, setChecked] = useState(isChecked);

  const handleChange = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    if (onChange) onChange(newChecked);
  };

  const handleClick = () => {
    if (onClick) onClick();
    handleChange();
  };

  return (
    <div
      className={`flex items-center cursor-pointer ${className}`}
      onClick={handleClick}
    >
      <motion.div
        initial={false}
        animate={{
          backgroundColor: checked ? "var(--tw-color-primary)" : "var(--tw-color-background)", // primary и background из tailwind.config
          borderColor: checked ? "var(--tw-color-primary)" : "var(--tw-color-secondary)", // primary и secondary из tailwind.config
        }}
        transition={{ duration: 0.2 }}
        className={`w-6 h-6 flex items-center justify-center border-[2.5px] ${
          rounded ? "rounded-full" : "rounded-none"
        } p-1`}
      >
        <AnimatePresence>
          {checked && (
            <motion.div
              key="check"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Icons.check className="text-white w-4 h-4" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <span className="ml-2 text-accent">{children}</span> {/* Используем accent для текста */}
    </div>
  );
};

export default Checkbox;



// Пример использования:

// // Чекбокс с скругленными углами и кастомным стилем
// <Checkbox
//   isChecked={true}
//   onChange={(checked) => console.log("Checked status:", checked)}
//   rounded={true}
//   className="border-blue-500" // Кастомный класс для обводки
//   onClick={() => console.log("Checkbox clicked!")}
// />

// // Чекбокс с квадратными углами
// <Checkbox
//   isChecked={false}
//   onChange={(checked) => console.log("Checked status:", checked)}
//   rounded={false}
//   className="border-red-500"
//   onClick={() => console.log("Checkbox clicked!")}
// />
