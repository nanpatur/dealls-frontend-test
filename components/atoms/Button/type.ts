import { ReactNode } from "react";

export interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  color?: "primary" | "secondary" | "success" | "danger" | "warning" | "netral";
}
