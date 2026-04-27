import { AppCard } from "@/components/core/AppCard";
import { AppButton } from "@/components/core/AppButton";
import { AppImage } from "@/components/core/AppImage";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { POST_ACTIONS, POST_CATEGORIES } from "@/constants/post";
import type { PostData } from "@/types/post";
import { useIsMobile } from "@/hooks/useIsMobile";
import AudioPlayer from "../AudioPlayer";

type PostCardProps = {
  post: PostData;
};

const LEFT_ACTION_COUNT = 2;

function PostCard({ post }: PostCardProps) {
  const isMobile = useIsMobile();
  const categoryStyle = POST_CATEGORIES[post.category];
  const leftActions = POST_ACTIONS.slice(0, LEFT_ACTION_COUNT);
  const rightActions = POST_ACTIONS.slice(LEFT_ACTION_COUNT);

  return (
    <AppCard radius="lg" className={cn("gap-0 py-0", isMobile && "rounded-none")}>
      <div className="flex items-center gap-3 pt-4 pb-3">
        <Avatar>
          <AvatarImage src={post.author.avatarUrl} />
          <AvatarFallback>{post.author.username.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>

        <div className="flex flex-1 items-center gap-2 min-w-0">
          <span className="text-sm font-bold text-foreground truncate">{post.author.username}</span>
          <span className="text-xs text-muted-foreground truncate">{post.author.handle}</span>
          <span className="text-xs text-muted-foreground">·</span>
          <span className="text-xs text-muted-foreground whitespace-nowrap">{post.createdAt}</span>
          <span
            className={cn("rounded-md border px-2 py-0.5 text-[10px]", "font-semibold leading-tight", categoryStyle.className)}
          >
            {categoryStyle.label}
          </span>
        </div>

        <AppButton variant={post.isFollowing ? "outline" : "default"} size="sm" className="shrink-0 text-xs h-8">
          {post.isFollowing ? "✓ Following" : "✦ Follow"}
        </AppButton>
      </div>

      {post.coverUrl && (
        <AppImage
          mode="auto"
          blurLevel="xl"
          brightness={0.35}
          src={post.coverUrl}
          alt={post.caption}
          className="-mx-4"
          style={{ width: "calc(100% + 2rem)" }}
        />
      )}

      <div className="flex gap-3 pb-3 pt-3">
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-bold text-foreground leading-snug">{post.caption}</h4>
          {post.description && (
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed line-clamp-2">{post.description}</p>
          )}
          {post.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-primary font-medium
                    cursor-pointer hover:underline"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="pb-3">
        <AudioPlayer src={post.audioSrc} />
      </div>

      <div
        className="flex items-center justify-between border-t
          border-border/50 py-2"
      >
        <div className="flex items-center gap-1">
          {leftActions.map((action) => {
            const count = action.countKey ? post[action.countKey] : undefined;
            const Icon = action.icon;
            return (
              <AppButton
                key={action.key}
                variant="ghost"
                size="sm"
                className="gap-1.5 text-muted-foreground
                  hover:text-foreground h-8 px-2"
              >
                <Icon className="size-4" />
                {count !== undefined && <span className="text-xs">{count}</span>}
              </AppButton>
            );
          })}
        </div>

        <div className="flex items-center gap-1">
          {rightActions.map((action) => {
            const count = action.countKey ? post[action.countKey] : undefined;
            const Icon = action.icon;
            return (
              <AppButton
                key={action.key}
                variant="ghost"
                size="sm"
                className="gap-1.5 text-muted-foreground
                  hover:text-foreground h-8 px-2"
              >
                <Icon className="size-4" />
                {count !== undefined && <span className="text-xs">{count}</span>}
              </AppButton>
            );
          })}
        </div>
      </div>
    </AppCard>
  );
}

export default PostCard;
