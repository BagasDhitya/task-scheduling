import { FC } from "react";
import { InputProps } from "@/utils/interface/component";

const Input: FC<InputProps> = ({
  value,
  onChange,
  placeholder,
  type = "text",
  name,
  className,
}) => {
  return (
    <input
      type={type}
      value={value}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full mb-4 p-2 border rounded ${className}`}
    />
  );
};

export default Input;
