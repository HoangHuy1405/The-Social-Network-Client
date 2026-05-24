import type { ComponentProps } from "react";

export type AvatarSize = "sm" | "default" | "lg";

export type AppAvatarProps = {
  size?: AvatarSize;
  src?: string;
  fallback?: string;
  useAuthAvatar?: boolean;
  className?: string;
} & Omit<ComponentProps<"span">, "children">;
