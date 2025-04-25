import{ ReactNode } from "react";

 //button.tsx
 export  type ButtonProps = {
  children: ReactNode;
  variant?: "solid" | "outline" | "ghost";
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
};
