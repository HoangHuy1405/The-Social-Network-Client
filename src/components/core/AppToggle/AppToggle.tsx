import { cn } from "@/lib/utils";
import type { AppToggleProps } from "./types";

function AppToggle({ checked, onChange, disabled = false, className }: AppToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 rounded-full",
        "transition-colors duration-200",
        "focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-ring focus-visible:ring-offset-2",
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
        checked ? "bg-primary" : "bg-switch-background",
        className,
      )}
    >
      <span
        className={cn(
          "pointer-events-none inline-block size-5 rounded-full",
          "bg-white shadow-md transform transition-transform duration-200",
          "translate-y-0.5",
          checked ? "translate-x-5.5" : "translate-x-0.5",
        )}
      />
    </button>
  );
}

export { AppToggle };
