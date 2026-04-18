import type { ReactNode } from "react";
import { Fragment } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { AppToggle } from "@/components/core/AppToggle";
import AppSelect from "@/components/core/AppSelect/AppSelect";
import AppInput from "@/components/core/AppInput/AppInput";
import type { SettingItemConfig, SettingsSectionVariant } from "../types";

type SettingsSectionProps = {
  title: string;
  variant?: SettingsSectionVariant;
  items?: SettingItemConfig[];
  children?: ReactNode;
};

function renderItem(item: SettingItemConfig) {
  const Icon = item.icon;
  const isDangerRow = item.type === "row" && item.variant === "danger";

  const iconSlot = Icon && (
    <div
      className={cn(
        "flex items-center justify-center size-10 rounded-lg shrink-0",
        isDangerRow ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground",
      )}
    >
      <Icon className="size-5" />
    </div>
  );

  const textSlot = (
    <div className="flex flex-col min-w-0 flex-1">
      <span className={cn("text-sm font-semibold", isDangerRow ? "text-destructive" : "text-foreground")}>{item.label}</span>
      {item.description && <span className="text-xs text-muted-foreground">{item.description}</span>}
    </div>
  );

  if (item.type === "input") {
    const isTextarea = item.inputAs === "textarea";
    return (
      <div className="px-4 py-3">
        <AppInput
          as={isTextarea ? "textarea" : "input"}
          label={item.label}
          value={item.value}
          onChange={(e) => item.onChange(e.target.value)}
          placeholder={item.placeholder}
          disabled={item.disabled}
          rows={item.rows}
          prefix={item.prefix}
          variant="filled"
          fullWidth
        />
      </div>
    );
  }

  if (item.type === "toggle") {
    return (
      <div className="flex items-center gap-3 px-4 py-3">
        {iconSlot}
        {textSlot}
        <AppToggle checked={item.checked} onChange={item.onChange} />
      </div>
    );
  }

  if (item.type === "select") {
    return (
      <div className="flex items-center gap-3 px-4 py-3">
        {iconSlot}
        {textSlot}
        <AppSelect
          value={item.value}
          onValueChange={item.onValueChange}
          options={item.options}
          size="sm"
          triggerClassName="shrink-0 min-w-32"
        />
      </div>
    );
  }

  // type === "row"
  if (item.action) {
    return (
      <div className="flex items-center gap-3 px-4 py-3">
        {iconSlot}
        {textSlot}
        <div className="shrink-0">{item.action}</div>
      </div>
    );
  }

  if (item.onClick) {
    return (
      <button
        type="button"
        onClick={item.onClick}
        className={cn(
          "flex items-center gap-3 w-full px-4 py-3 text-left",
          "transition-colors duration-150 cursor-pointer",
          isDangerRow ? "hover:bg-destructive/5" : "hover:bg-accent/50",
        )}
      >
        {iconSlot}
        {textSlot}
        {item.value && <span className="text-xs text-muted-foreground shrink-0">{item.value}</span>}
        <ChevronRight className={cn("size-4 shrink-0", isDangerRow ? "text-destructive/60" : "text-muted-foreground")} />
      </button>
    );
  }

  return (
    <div className="flex items-center gap-3 px-4 py-3">
      {iconSlot}
      {textSlot}
      {item.value && <span className="text-xs text-muted-foreground shrink-0">{item.value}</span>}
    </div>
  );
}

function SettingsSection({ title, variant = "default", items, children }: SettingsSectionProps) {
  const isDanger = variant === "danger";

  return (
    <div className="flex flex-col gap-2">
      <h4
        className={cn(
          "text-xs font-semibold uppercase tracking-wider px-1",
          isDanger ? "text-destructive" : "text-muted-foreground",
        )}
      >
        {title}
      </h4>

      <div
        className={cn(
          "rounded-xl overflow-hidden border",
          isDanger ? "border-destructive/20 bg-card" : "border-border bg-card",
        )}
      >
        {items?.map((item, index) => (
          <Fragment key={item.id}>
            {index > 0 && <Separator />}
            {renderItem(item)}
          </Fragment>
        ))}

        {/* Manual children fallback (ProfileTab avatar section) */}
        {children}
      </div>
    </div>
  );
}

export default SettingsSection;
