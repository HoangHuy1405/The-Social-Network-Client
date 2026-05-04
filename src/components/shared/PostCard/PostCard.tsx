import { AppCard } from "@/components/core/AppCard";
import { AppButton } from "@/components/core/AppButton";
import { AppImage } from "@/components/core/AppImage";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { POST_ACTIONS, POST_CATEGORIES } from "@/constants/post";
import type { PostData } from "@/types/post";
import { useIsMobile } from "@/hooks/useIsMobile";
import AudioPlayer from "../AudioPlayer";
import { UserHoverCard } from "../UserHoverCard";

type PostCardProps = {
  post: PostData;
};

const LEFT_ACTION_COUNT = 2;

const HASHTAG_REGEX = /(#\w+)/g;

function StyledHashtagText({ text }: { text: string }) {
  const parts = text.split(HASHTAG_REGEX);
  return (
    <>
      {parts.map((part, i) =>
        HASHTAG_REGEX.test(part) ? (
          <span key={i} className="text-primary font-medium cursor-pointer hover:underline">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

const RICH_TEXT_STYLES = [
  "[&_p]:mb-2",
  "[&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mt-4 [&_h1]:mb-2",
  "[&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-3 [&_h2]:mb-2",
  "[&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-2",
  "[&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-2",
  "[&_blockquote]:border-l-4 [&_blockquote]:border-primary",
  "[&_blockquote]:pl-3 [&_blockquote]:italic [&_blockquote]:my-2",
].join(" ");

function PostCard({ post }: PostCardProps) {
  const isMobile = useIsMobile();
  const categoryStyle = POST_CATEGORIES[post.category];
  const leftActions = POST_ACTIONS.slice(0, LEFT_ACTION_COUNT);
  const rightActions = POST_ACTIONS.slice(LEFT_ACTION_COUNT);

  return (
    <AppCard radius="lg" className={cn("gap-0 py-0", isMobile && "rounded-none")}>
      <div className="flex items-center gap-3 pt-4 pb-3">
        <UserHoverCard userId={post.author.id}>
          <div className="cursor-pointer">
            <Avatar>
              <AvatarImage src={post.author.avatarUrl} referrerPolicy="no-referrer" />
              <AvatarFallback>{post.author.username.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
          </div>
        </UserHoverCard>

        <div className="flex flex-1 items-center gap-2 min-w-0">
          <span className="text-sm font-bold text-foreground truncate">{post.author.username}</span>
          <span className="text-xs text-muted-foreground">·</span>
          <span className="text-xs text-muted-foreground whitespace-nowrap">{post.createdAt}</span>
          <span
            className={cn("rounded-md border px-2 py-0.5 text-[10px]", "font-semibold leading-tight", categoryStyle.className)}
          >
            {categoryStyle.label}
          </span>
        </div>
      </div>

      {post.coverUrl && (
        <AppImage
          mode="auto"
          blurLevel="xl"
          brightness={0.35}
          src={post.coverUrl}
          alt={post.title}
          className="-mx-4"
          style={{ width: "calc(100% + 2rem)" }}
        />
      )}

      <div className="flex gap-3 pb-3 pt-3">
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-bold text-foreground leading-snug">
            <StyledHashtagText text={post.title} />
          </h4>
          {post.description && (
            <div
              className={cn("mt-1 text-sm text-muted-foreground leading-relaxed line-clamp-2", RICH_TEXT_STYLES)}
              dangerouslySetInnerHTML={{ __html: post.description }}
            />
          )}
        </div>
      </div>

      <div className="pb-3">
        <AudioPlayer src={post.audioUrl} />
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
