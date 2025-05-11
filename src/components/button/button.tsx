import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ButtonProps } from "../../common.types";
import { Icons } from "../../ui/icons/Icons";

const Button: React.FC<ButtonProps & {
  whileHover?: any;
  whileTap?: any;
}> = ({
  children,
  variant = "solid",
  isLoading = false,
  disabled = false,
  onClick,
  className = "",
  icon,
  whileHover,
  whileTap,
}) => {
  const baseStyles =
    "flex justify-center items-center gap-2 rounded-lg px-6 py-3 font-semibold transition-all";

  const variants: Record<string, string> = {
    solid: "text-white disabled:bg-green-300 disabled:cursor-not-allowed",
    outline: "border-2 border-primary text-primary disabled:border-gray-300 disabled:text-gray-400",
    ghost: "text-white disabled:bg-transparent disabled:cursor-not-allowed ",
  };

  const SpinnerIcon = Icons.spinner;

  const loadingClass = isLoading ? "text-gray-500" : "bg-dray-500";

  return (
    <motion.button
      whileTap={{ scale: 0.96, ...whileTap }}
      whileHover={whileHover}
      className={`${baseStyles} ${variants[variant]} ${loadingClass} ${className}`}
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
            <SpinnerIcon className="animate-spin w-8 h-8" />
          </motion.div>
        ) : (
          <motion.span
            key="children"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="flex justify-center items-center gap-1.5"
          >
            {icon && <span>{icon}</span>}
            {children}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default Button;
