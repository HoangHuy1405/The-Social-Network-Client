import type { ReactNode, CSSProperties } from "react";

export type CardVariant = "default" | "muted" | "accent" | "primary" | "secondary";
export type CardSize = "sm" | "default" | "lg";
export type CardRadius = "none" | "sm" | "md" | "lg" | "xl" | "full";

export type AppCardProps = {
  children: ReactNode;

  /** Visual style variant — maps to project theme tokens */
  variant?: CardVariant;

  /** Predefined size preset that controls spacing */
  size?: CardSize;

  /** Border-radius preset — uses project --radius tokens */
  radius?: CardRadius;

  /** Optional header element rendered above content */
  header?: ReactNode;

  /** Optional footer element rendered below content */
  footer?: ReactNode;

  /** Optional action element placed inside the card header */
  action?: ReactNode;

  /** Inline width override, e.g. "320px" or "100%" */
  width?: CSSProperties["width"];

  /** Inline height override, e.g. "480px" or "auto" */
  height?: CSSProperties["height"];

  className?: string;
};
