import { ReactNode } from "react";

export interface TextProps {
  children: ReactNode;
  type?: "default" | "heading" | "subtitle" | "body";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  color?: "black" | "blue" | "red" | "gray" | "green" | "yellow" | "white";
  weight?: "normal" | "bold";
  className?: string;
  align?: "left" | "center" | "right";
  uppercase?: boolean;
}
