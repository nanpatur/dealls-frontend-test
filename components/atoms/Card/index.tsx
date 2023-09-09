import React from "react";
import { CardProps } from "./type";

const Card: React.FC<CardProps> = ({
  children,
  className = "",
  shadow = "md",
  borderRadius = "md",
  padding = "p-4",
}) => {
  const cardClassName = `bg-white rounded-${borderRadius} shadow-${shadow} ${padding} ${className}`;

  return <div className={cardClassName}>{children}</div>;
};

export default Card;
