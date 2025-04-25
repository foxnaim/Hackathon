import React from "react";
import { ButtonProps } from "../../common.types";
import { Icons } from "../../ui/icons/Icons"; // путь укажи правильно

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
  <button
   className={`${baseStyles} ${variants[variant]} ${className}`}
   onClick={onClick}
   disabled={disabled || isLoading}
  >
   {isLoading ? (
    <SpinnerIcon className="animate-spin w-5 h-5" />
   ) : (
    children
   )}
  </button>
 );
};

export default Button;
