import { useId, useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { AppInputProps, InputSize, InputVariant } from "./types";

const SIZE_CLASSES: Record<InputSize, string> = {
  sm: "h-7 px-2.5 text-xs",
  default: "h-9 px-3 text-sm",
  lg: "h-11 px-4 text-base",
};

/** Overrides only the wrapper border/ring; the inner Input handles the rest */
const VARIANT_WRAPPER_CLASSES: Record<InputVariant, string> = {
  default: "border-border bg-transparent focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50",
  filled:
    "border-input bg-input-background hover:border-border focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50 transition-colors",
  ghost: "border-transparent bg-transparent focus-within:border-border focus-within:bg-background",
};

function AppInput({
  variant = "default",
  size = "default",
  label,
  helperText,
  error: externalError,
  prefix,
  suffix,
  fullWidth = false,
  id: externalId,
  className,
  containerClassName,
  wrapperClassName,
  disabled,
  validate,
  validateOnTyping = false,
  onChange,
  onBlur,
  ...props
}: AppInputProps) {
  const generatedId = useId();
  const inputId = externalId ?? generatedId;

  const [internalError, setInternalError] = useState<string | undefined>(undefined);

  const error = externalError ?? internalError;
  const hasError = Boolean(error);
  const hasPrefixOrSuffix = prefix !== undefined || suffix !== undefined;

  // Custom property to tell shadcn Input what background color to use for Chrome autofill inset shadow fix.
  const autofillStyle = {
    "--autofill-bg": variant === "filled" ? "var(--color-input-background)" : "var(--color-background)",
  } as React.CSSProperties;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (validate && validateOnTyping) {
      setInternalError(validate(e.target.value));
    }
    onChange?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (validate) {
      setInternalError(validate(e.target.value));
    }
    onBlur?.(e);
  };

  const baseInput = (
    <Input
      id={inputId}
      aria-invalid={hasError || undefined}
      aria-describedby={helperText !== undefined || hasError ? `${inputId}-helper` : undefined}
      disabled={disabled}
      onChange={handleChange}
      onBlur={handleBlur}
      className={cn(
        /* The wrapper div owns the background; inner Input must be fully transparent in all modes.
           dark:bg-transparent overrides shadcn's dark:bg-input/30 utility. */
        "h-auto w-full border-none bg-transparent dark:bg-transparent px-0 shadow-none ring-0 focus-visible:border-none focus-visible:ring-0",
        className,
      )}
      style={{ ...props.style, ...autofillStyle }}
      {...props}
    />
  );

  return (
    <div className={cn("flex flex-col gap-1", fullWidth ? "w-full" : "w-auto", containerClassName)}>
      {label !== undefined && (
        <label htmlFor={inputId} className="text-sm font-semibold text-foreground">
          {label}
        </label>
      )}

      {/* Wrapper provides unified border + ring, hosts prefix/suffix alongside the base Input */}
      {hasPrefixOrSuffix ? (
        <div
          className={cn(
            "flex items-center gap-2 rounded-lg border transition-all",
            SIZE_CLASSES[size],
            hasError ? "border-destructive ring-3 ring-destructive/20" : VARIANT_WRAPPER_CLASSES[variant],
            disabled && "pointer-events-none opacity-50",
            wrapperClassName,
          )}
        >
          {prefix !== undefined && <span className="shrink-0 text-muted-foreground">{prefix}</span>}
          {baseInput}
          {suffix !== undefined && <span className="shrink-0 text-muted-foreground">{suffix}</span>}
        </div>
      ) : (
        /* Without prefix/suffix shadcn Input can style itself — just apply size override */
        <Input
          id={inputId}
          aria-invalid={hasError || undefined}
          aria-describedby={helperText !== undefined || hasError ? `${inputId}-helper` : undefined}
          disabled={disabled}
          onChange={handleChange}
          onBlur={handleBlur}
          className={cn(
            SIZE_CLASSES[size],
            variant === "filled" && "border-input bg-input-background hover:border-border transition-colors",
            variant === "ghost" && "border-transparent bg-transparent focus-visible:border-border focus-visible:bg-background",
            fullWidth && "w-full",
            className,
          )}
          style={{ ...props.style, ...autofillStyle }}
          {...props}
        />
      )}

      {(helperText !== undefined || hasError) && (
        <p id={`${inputId}-helper`} className={cn("text-xs", hasError ? "text-destructive" : "text-muted-foreground")}>
          {error ?? helperText}
        </p>
      )}
    </div>
  );
}

export default AppInput;
