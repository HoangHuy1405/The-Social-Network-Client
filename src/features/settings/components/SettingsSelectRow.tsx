import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type SettingsSelectRowProps = {
  icon?: LucideIcon;
  label: string;
  description?: string;
  value: string;
  onValueChange: (value: string) => void;
  options: { value: string; label: string }[];
};

function SettingsSelectRow({ icon: Icon, label, description, value, onValueChange, options }: SettingsSelectRowProps) {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      {Icon && (
        <div className="flex items-center justify-center size-10 rounded-lg shrink-0 bg-muted text-muted-foreground">
          <Icon className="size-5" />
        </div>
      )}

      <div className="flex flex-col min-w-0 flex-1">
        <span className="text-sm font-semibold text-foreground">{label}</span>
        {description && <span className="text-xs text-muted-foreground">{description}</span>}
      </div>

      <select
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        className={cn(
          "text-xs font-medium px-3 py-1.5 rounded-lg",
          "bg-muted border border-border text-foreground",
          "cursor-pointer transition-colors",
          "hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring/30",
        )}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SettingsSelectRow;
