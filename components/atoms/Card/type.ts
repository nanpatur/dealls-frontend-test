import { ReactNode } from "react";

export interface CardProps {
  children: ReactNode;
  className?: string;
  shadow?: "none" | "sm" | "md" | "lg" | "xl";
  borderRadius?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  padding?: string;
}
