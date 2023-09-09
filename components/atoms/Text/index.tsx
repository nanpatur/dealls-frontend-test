import React from "react";
import { TextProps } from "./type";

const Text: React.FC<TextProps> = ({
  children,
  type = "default",
  size = "md",
  color = "black",
  weight = "normal",
  className = "",
  align = "left" || "center" || "right",
  uppercase = false,
}) => {
  const typeClasses: any = {
    default: "text-black",
    primary: "text-blue-500",
    secondary: "text-gray-500",
    success: "text-green-500",
    danger: "text-red-500",
    warning: "text-yellow-500",
  };

  const sizeClasses: any = {
    sm: "text-sm",
    md: "text-md",
    lg: "text-lg",
  };

  const colorClasses: any = {
    black: "text-black",
    white: "text-white",
    gray: "text-gray-500",
  };

  const weightClasses: any = {
    normal: "font-normal",
    bold: "font-bold",
  };

  const alignClasses: any = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const typeClass = typeClasses[type];
  const sizeClass = sizeClasses[size];
  const colorClass = colorClasses[color];
  const weightClass = weightClasses[weight];
  const alignClass = alignClasses[align];

  return (
    <p
      className={`${
        uppercase ? "uppercase" : ""
      } ${typeClass} ${sizeClass} ${colorClass} ${weightClass} ${alignClass} ${className}`}
    >
      {children}
    </p>
  );
};

export default Text;
