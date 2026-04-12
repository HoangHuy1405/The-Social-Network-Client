import type { CSSProperties } from "react";
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { AppCardProps, CardRadius, CardVariant } from "./types";

const VARIANT_CLASSES: Record<CardVariant, string> = {
  default: "bg-card text-card-foreground",
  muted: "bg-muted text-foreground border-transparent",
  accent: "bg-accent text-accent-foreground border-transparent",
  primary: "bg-primary text-primary-foreground border-transparent",
  secondary: "bg-secondary text-secondary-foreground border-transparent",
};

const RADIUS_CLASSES: Record<CardRadius, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-3xl",
};

function AppCard({
  children,
  variant = "default",
  size = "default",
  radius = "md",
  header,
  footer,
  action,
  width,
  height,
  className,
}: AppCardProps) {
  const inlineStyle: CSSProperties = {
    ...(width !== undefined && { width }),
    ...(height !== undefined && { height }),
  };

  return (
    <Card
      size={size === "lg" ? "default" : size}
      style={inlineStyle}
      className={cn(VARIANT_CLASSES[variant], RADIUS_CLASSES[radius], size === "lg" && "gap-5 py-5", className)}
    >
      {/* Render header slot only when header or action is provided */}
      {(header !== undefined || action !== undefined) && (
        <CardHeader>
          {header !== undefined && <CardTitle>{header}</CardTitle>}
          {action !== undefined && <CardAction>{action}</CardAction>}
        </CardHeader>
      )}

      <CardContent>{children}</CardContent>

      {footer !== undefined && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
}

export default AppCard;
