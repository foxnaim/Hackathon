import React from "react";

type Props = {
  children?: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLElement>; 

export const Header: React.FC<Props> = ({ children, className = "", ...rest }) => {
  return (
    <header className={`w-full p-4 ${className}`} {...rest}>
      {children}
    </header>
  );
};
