import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAppSelector } from "@/store";
import { cn } from "@/lib/utils";
import type { AppAvatarProps } from "./types";

function AppAvatar({ size = "default", src, fallback, useAuthAvatar = true, className, ...props }: AppAvatarProps) {
  const authState = useAppSelector((state) => state.auth);

  const resolvedSrc = src || (useAuthAvatar ? authState.avatarUrl : null) || "";
  const resolvedFallback = fallback || (useAuthAvatar && authState.username ? authState.username.charAt(0).toUpperCase() : "?");

  return (
    <Avatar size={size} className={cn("ring-2 ring-transparent transition-all", className)} {...props}>
      <AvatarImage src={resolvedSrc} />
      <AvatarFallback className="bg-primary text-primary-foreground font-bold">{resolvedFallback}</AvatarFallback>
    </Avatar>
  );
}

export default AppAvatar;
