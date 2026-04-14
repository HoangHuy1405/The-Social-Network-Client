import type { ComponentProps } from "react";

export type AvatarSize = "sm" | "default" | "lg";

export type AppAvatarProps = {
  size?: AvatarSize;
  className?: string;
} & Omit<ComponentProps<"span">, "children">;
