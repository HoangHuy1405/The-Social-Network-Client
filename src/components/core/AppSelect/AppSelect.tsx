import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { AppSelectOption, AppSelectProps } from "./type";

function AppSelect({
  value,
  defaultValue,
  onValueChange,
  options,
  groups,
  placeholder = "Select...",
  disabled,
  required,
  name,
  size = "default",
  triggerClassName,
  contentClassName,
  open,
  defaultOpen,
  onOpenChange,
}: AppSelectProps) {
  const renderOptions = (items: AppSelectOption[]) =>
    items.map((opt) => (
      <SelectItem key={opt.value} value={opt.value} disabled={opt.disabled}>
        {opt.icon}
        {opt.label}
      </SelectItem>
    ));

  return (
    <Select
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      disabled={disabled}
      required={required}
      name={name}
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      <SelectTrigger
        size={size}
        className={cn(
          "bg-background border-input shadow-sm text-foreground",
          "hover:bg-accent hover:text-accent-foreground transition-all duration-200 cursor-pointer",
          "focus:ring-2 focus:ring-ring/30 focus:border-ring",
          triggerClassName,
        )}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent
        position="popper"
        className={cn(
          "bg-popover border-border text-popover-foreground shadow-md rounded-md",
          "w-[unset] min-w-[var(--radix-select-trigger-width)]",
          "max-h-[300px]",
          contentClassName,
        )}
      >
        {options !== undefined && renderOptions(options)}

        {groups !== undefined &&
          groups.map((group, i) => (
            <SelectGroup key={group.label ?? i}>
              {group.label !== undefined && <SelectLabel className="font-semibold">{group.label}</SelectLabel>}
              {renderOptions(group.options)}
            </SelectGroup>
          ))}
      </SelectContent>
    </Select>
  );
}

export default AppSelect;
