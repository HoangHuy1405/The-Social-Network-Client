import { useState } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { useUserProfileSummaryApi } from "@/features/profile/hooks/useUserProfileSummaryApi";
import { AppAvatar } from "@/components/core/AppAvatar";
import AppLoading from "@/components/core/AppLoading/AppLoading";

type UserHoverCardProps = {
  userId: string;
  children: React.ReactNode;
};

export function UserHoverCard({ userId, children }: UserHoverCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading, isError } = useUserProfileSummaryApi(userId, isOpen);

  let content = null;

  if (isLoading || (!data && !isError)) {
    content = (
      <div className="flex h-32 w-full items-center justify-center">
        <AppLoading fullScreen={false} />
      </div>
    );
  } else if (isError) {
    content = <div className="text-sm text-destructive py-4 text-center">Failed to load user info</div>;
  } else if (data) {
    content = (
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <AppAvatar src={data.avatarUrl} fallback={data.username.charAt(0).toUpperCase()} size="lg" />
          <div className="flex flex-col">
            <span className="text-sm font-bold text-foreground">{data.displayName || data.username}</span>
            <span className="text-xs text-muted-foreground">@{data.username}</span>
          </div>
        </div>
        {data.bioDescription && (
          <p className="text-sm text-muted-foreground break-words line-clamp-3">{data.bioDescription}</p>
        )}
        <div className="flex items-center gap-4 pt-2">
          <div className="flex items-center gap-1">
            <span className="text-sm font-bold text-foreground">{data.followingCount}</span>
            <span className="text-xs text-muted-foreground">Following</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-sm font-bold text-foreground">{data.followersCount}</span>
            <span className="text-xs text-muted-foreground">Followers</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <HoverCard openDelay={300} onOpenChange={setIsOpen}>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent className="w-80 shadow-popup" side="bottom" align="start">
        {content}
      </HoverCardContent>
    </HoverCard>
  );
}
