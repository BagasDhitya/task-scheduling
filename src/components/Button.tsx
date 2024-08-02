import { FC } from "react";
import { ButtonProps } from "@/utils/interface/component";

const Button: FC<ButtonProps> = ({ onClick, className, children }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-emerald-500 hover:bg-emerald-600 text-white p-2 rounded ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
