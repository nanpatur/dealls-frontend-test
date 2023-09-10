import React from "react";
import { ButtonProps } from "./type";

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  className = "",
  color = "primary",
}) => {
  const colorClasses = {
    primary: "text-white bg-blue-500 hover:bg-blue-600",
    secondary: "text-white bg-gray-500 hover:bg-gray-600",
    success: "text-white bg-green-500 hover:bg-green-600",
    danger: "text-white bg-red-500 hover:bg-red-600",
    warning: "text-white bg-yellow-500 hover:bg-yellow-600",
    netral:
      "bg-white hover:bg-gray-100 border border-gray-300 text-gray-500 hover:text-gray-600",
  };

  const colorClass = colorClasses[color];

  return (
    <button
      type={type}
      onClick={onClick}
      className={`font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 ${colorClass} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
