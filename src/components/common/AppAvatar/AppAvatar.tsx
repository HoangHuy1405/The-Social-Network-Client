import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAppSelector } from "@/store";
import { cn } from "@/lib/utils";
import type { AppAvatarProps } from "./types";

function AppAvatar({ size = "default", className, ...props }: AppAvatarProps) {
  const { username, avatarUrl } = useAppSelector((state) => state.auth);
  const initial = username ? username.charAt(0).toUpperCase() : "?";

  return (
    <Avatar size={size} className={cn("ring-2 ring-transparent transition-all", className)} {...props}>
      <AvatarImage src={avatarUrl || ""} />
      <AvatarFallback className="bg-primary text-primary-foreground font-bold">{initial}</AvatarFallback>
    </Avatar>
  );
}

export default AppAvatar;
