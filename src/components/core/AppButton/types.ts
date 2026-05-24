import type { ComponentProps } from "react";
import type { VariantProps } from "class-variance-authority";
import type { buttonVariants } from "@/components/ui/button";

export type ButtonVariant = "default" | "outline" | "secondary" | "ghost" | "destructive" | "link";

export type ButtonSize = "default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg";

export type AppButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    /** Render as child element via Radix Slot */
    asChild?: boolean;

    /** Icon placed before button label */
    leadingIcon?: React.ReactNode;

    /** Icon placed after button label */
    trailingIcon?: React.ReactNode;

    /** Show loading spinner and disable interactions */
    loading?: boolean;
  };
