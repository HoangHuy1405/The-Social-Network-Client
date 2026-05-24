import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

type SettingsRowProps = {
  id: string;
  icon?: LucideIcon | React.ComponentType<{ className?: string }>;
  label: string;
  description?: string;
  valueType: "display" | "toggle" | "action" | "select";
  value?: string;
  onClick?: () => void;
  action?: ReactNode;
  variant?: "default" | "danger";
};

function SettingsRow({
  id,
  icon: Icon,
  label,
  description,
  valueType,
  value,
  onClick,
  action,
  variant = "default",
}: SettingsRowProps) {
  const isDanger = variant === "danger";

  const iconSlot = Icon && (
    <div
      className={cn(
        "flex items-center justify-center size-10 rounded-lg shrink-0",
        isDanger ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground",
      )}
    >
      <Icon className="size-5" />
    </div>
  );

  const textSlot = (
    <div className="flex flex-col min-w-0 flex-1">
      <span className={cn("text-sm font-semibold", isDanger ? "text-destructive" : "text-foreground")}>{label}</span>
      {description && <span className="text-xs text-muted-foreground truncate">{description}</span>}
    </div>
  );

  const chevron = (valueType === "display" || (valueType === "action" && !action)) && (
    <ChevronRight className={cn("size-4 shrink-0", isDanger ? "text-destructive/60" : "text-muted-foreground")} />
  );

  const displayValue = valueType === "display" && value && (
    <span className="text-xs text-muted-foreground shrink-0">{value}</span>
  );

  // When there's an action slot (a button), the row itself must NOT be a button.
  // We use a div with a separate pressable area for the icon+label.
  if (action) {
    return (
      <div className={cn("flex items-center gap-3 px-4 py-3", isDanger ? "hover:bg-destructive/5" : "")}>
        {iconSlot}
        {textSlot}
        <div className="shrink-0">{action}</div>
      </div>
    );
  }

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "flex items-center gap-3 w-full px-4 py-3 text-left",
          "transition-colors duration-150 hover:cursor-pointer",
          isDanger ? "hover:bg-destructive/5" : "hover:bg-accent/50",
        )}
      >
        {iconSlot}
        {textSlot}
        {displayValue}
        {chevron}
      </button>
    );
  }

  return (
    <div id={id} className="flex items-center gap-3 px-4 py-3">
      {iconSlot}
      {textSlot}
      {displayValue}
    </div>
  );
}

export default SettingsRow;
