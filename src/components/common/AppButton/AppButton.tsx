import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { AppButtonProps } from "./types";

function AppButton({
  children,
  leadingIcon,
  trailingIcon,
  loading = false,
  disabled,
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: AppButtonProps) {
  const isButtonDisabled = disabled ?? loading;

  return (
    <Button
      variant={variant}
      size={size}
      asChild={asChild}
      disabled={isButtonDisabled}
      className={cn(
        "gap-2 transition-transform duration-200",
        !isButtonDisabled && "hover:scale-[1.02] active:scale-[0.98]",
        isButtonDisabled && "disabled:pointer-events-auto disabled:cursor-not-allowed",
        className,
      )}
      {...props}
    >
      {/* Loading spinner replaces leadingIcon */}
      {loading ? <Loader2 className="animate-spin" /> : leadingIcon}
      {children}
      {!loading && trailingIcon}
    </Button>
  );
}

export default AppButton;
