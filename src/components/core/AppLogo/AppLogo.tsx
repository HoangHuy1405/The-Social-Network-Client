import { cn } from "@/lib/utils";

type LogoSize = "sm" | "md" | "lg" | "xl";

type AppLogoProps = {
  size?: LogoSize;
  className?: string;
};

const SIZE_CLASSES: Record<LogoSize, string> = {
  sm: "text-base",
  md: "text-lg",
  lg: "text-2xl",
  xl: "text-5xl",
};

function AppLogo({ size = "md", className }: AppLogoProps) {
  return (
    <span className={cn("font-bold text-foreground leading-none", SIZE_CLASSES[size], className)}>
      Echo<span className="text-primary">Wave</span>
    </span>
  );
}

export default AppLogo;
