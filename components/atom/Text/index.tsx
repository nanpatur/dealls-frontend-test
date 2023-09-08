import React, { ReactNode } from "react";

interface TextProps {
  children: ReactNode;
  type?: "default" | "heading" | "subtitle" | "body";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  color?: "black" | "blue" | "red";
  weight?: "normal" | "bold";
}

const Text: React.FC<TextProps> = ({
  children,
  type = "default",
  size = "md",
  color = "black",
  weight = "normal",
}) => {
  const textClasses = `text-${size} text-${color}-500 font-${weight} ${
    type === "default" ? "" : `text-${type}`
  }`;

  return <p className={textClasses}>{children}</p>;
};

export default Text;
