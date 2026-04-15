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
          "bg-card border-border text-foreground",
          "hover:bg-muted transition-colors cursor-pointer",
          triggerClassName,
        )}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent className={cn("bg-card border-border text-card-foreground", contentClassName)}>
        {options !== undefined && renderOptions(options)}

        {groups !== undefined &&
          groups.map((group, i) => (
            <SelectGroup key={group.label ?? i}>
              {group.label !== undefined && <SelectLabel>{group.label}</SelectLabel>}
              {renderOptions(group.options)}
            </SelectGroup>
          ))}
      </SelectContent>
    </Select>
  );
}

export default AppSelect;
