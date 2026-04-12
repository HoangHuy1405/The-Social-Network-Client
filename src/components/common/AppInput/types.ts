import type { ComponentProps, ReactNode } from "react";

export type InputSize = "sm" | "default" | "lg";
export type InputVariant = "default" | "filled" | "ghost";

export type AppInputProps = Omit<ComponentProps<"input">, "size" | "prefix" | "suffix"> & {
  /** Visual style variant */
  variant?: InputVariant;

  /** Size preset */
  size?: InputSize;

  /** Label displayed above the input */
  label?: string;

  /** Helper / hint text below the input */
  helperText?: string;

  /** Error message — triggers error styling */
  error?: string;

  /** Icon or element rendered on the left side */
  prefix?: ReactNode;

  /** Icon or element rendered on the right side */
  suffix?: ReactNode;

  /** Make input fill full width of its container */
  fullWidth?: boolean;

  /** Extra classes applied to the outermost container div */
  containerClassName?: string;

  /** Extra classes applied to the prefix/suffix wrapper div */
  wrapperClassName?: string;

  /** Validation function. Returns an error message string if failed, or undefined if valid. */
  validate?: (value: string) => string | undefined;

  /** If true, trigger validation on every keystroke (onChange). */
  validateOnTyping?: boolean;
};
