import { useId, useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { AnyAppInputProps, InputSize, InputVariant } from "./types";

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

const VARIANT_TEXTAREA_CLASSES: Record<InputVariant, string> = {
  default: "border-border bg-transparent focus:border-ring focus:ring-3 focus:ring-ring/50",
  filled:
    "border-input bg-input-background hover:border-border focus:border-ring focus:ring-3 focus:ring-ring/50 transition-colors",
  ghost: "border-transparent bg-transparent focus:border-border focus:bg-background",
};

function AppInput(props: AnyAppInputProps) {
  const {
    as = "input",
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
    ...rest
  } = props;

  const generatedId = useId();
  const inputId = externalId ?? generatedId;

  const [internalError, setInternalError] = useState<string | undefined>(undefined);

  const error = externalError ?? internalError;
  const hasError = Boolean(error);

  // Custom property to tell shadcn Input what background color to use for Chrome autofill inset shadow fix.
  const autofillStyle = {
    "--autofill-bg": variant === "filled" ? "var(--color-input-background)" : "var(--color-background)",
  } as React.CSSProperties;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (validate && validateOnTyping) {
      setInternalError(validate(e.target.value));
    }
    (onChange as React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>)?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (validate) {
      setInternalError(validate(e.target.value));
    }
    (onBlur as React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>)?.(e);
  };

  // ── Textarea branch ──────────────────────────────────────────────────────────
  if (as === "textarea") {
    const { rows = 3, ...textareaRest } = rest as React.ComponentProps<"textarea"> & { rows?: number };
    return (
      <div className={cn("flex flex-col gap-1", fullWidth ? "w-full" : "w-auto", containerClassName)}>
        {label !== undefined && (
          <label htmlFor={inputId} className="text-sm font-semibold text-foreground">
            {label}
          </label>
        )}
        <textarea
          id={inputId}
          rows={rows}
          disabled={disabled}
          aria-invalid={hasError || undefined}
          aria-describedby={helperText !== undefined || hasError ? `${inputId}-helper` : undefined}
          onChange={handleChange as React.ChangeEventHandler<HTMLTextAreaElement>}
          onBlur={handleBlur as React.FocusEventHandler<HTMLTextAreaElement>}
          className={cn(
            "w-full rounded-lg border px-3 py-2 text-sm text-foreground resize-none",
            "placeholder:text-muted-foreground outline-none",
            "focus:ring-2 transition-colors",
            hasError ? "border-destructive ring-2 ring-destructive/20" : VARIANT_TEXTAREA_CLASSES[variant],
            disabled && "pointer-events-none opacity-50",
            className,
          )}
          {...textareaRest}
        />
        {(helperText !== undefined || hasError) && (
          <p id={`${inputId}-helper`} className={cn("text-xs", hasError ? "text-destructive" : "text-muted-foreground")}>
            {error ?? helperText}
          </p>
        )}
      </div>
    );
  }

  // ── Input branch ─────────────────────────────────────────────────────────────
  const hasPrefixOrSuffix = prefix !== undefined || suffix !== undefined;

  const baseInput = (
    <Input
      id={inputId}
      aria-invalid={hasError || undefined}
      aria-describedby={helperText !== undefined || hasError ? `${inputId}-helper` : undefined}
      disabled={disabled}
      onChange={handleChange as React.ChangeEventHandler<HTMLInputElement>}
      onBlur={handleBlur as React.FocusEventHandler<HTMLInputElement>}
      className={cn(
        /* The wrapper div owns the background; inner Input must be fully transparent in all modes.
           dark:bg-transparent overrides shadcn's dark:bg-input/30 utility. */
        "h-auto w-full border-none bg-transparent dark:bg-transparent px-0 shadow-none ring-0 focus-visible:border-none focus-visible:ring-0",
        className,
      )}
      style={{ ...(rest as React.ComponentProps<"input">).style, ...autofillStyle }}
      {...(rest as React.ComponentProps<"input">)}
    />
  );

  return (
    <div className={cn("flex flex-col gap-1", fullWidth ? "w-full" : "w-auto", containerClassName)}>
      {label !== undefined && (
        <label htmlFor={inputId} className="text-sm font-semibold text-foreground">
          {label}
        </label>
      )}

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
        <Input
          id={inputId}
          aria-invalid={hasError || undefined}
          aria-describedby={helperText !== undefined || hasError ? `${inputId}-helper` : undefined}
          disabled={disabled}
          onChange={handleChange as React.ChangeEventHandler<HTMLInputElement>}
          onBlur={handleBlur as React.FocusEventHandler<HTMLInputElement>}
          className={cn(
            SIZE_CLASSES[size],
            variant === "filled" && "border-input bg-input-background hover:border-border transition-colors",
            variant === "ghost" && "border-transparent bg-transparent focus-visible:border-border focus-visible:bg-background",
            fullWidth && "w-full",
            className,
          )}
          style={{ ...(rest as React.ComponentProps<"input">).style, ...autofillStyle }}
          {...(rest as React.ComponentProps<"input">)}
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
