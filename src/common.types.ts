import{ ReactNode } from "react";

 //button.tsx
 export  type ButtonProps = {
  children: ReactNode;
  variant?: "solid" | "outline" | "ghost";
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  icon?: ReactNode | string;
};


// CheckBox
export type CheckBoxProps = {
  isChecked?: boolean; 
  onChange?: (checked: boolean) => void;
  className?: string; 
  rounded?: boolean; 
  onClick?: () => void;
  children?: ReactNode;
};

export type ChBoxProps = {
  isChecked?: boolean; 
  onChange?: (checked: boolean) => void;
  className?: string; 
  rounded?: boolean; 
  onClick?: () => void;
  children?: ReactNode;
};



//Input
export type InputProps = {
  placeholder?: string;
  disabled?: boolean;
  type?: string;
  icon?: "email" | "password" | "user" | "phone" | "search";
  className?: string;
};


//Header
export interface MenuItemProps {
  name: string;
  link: string;
}
