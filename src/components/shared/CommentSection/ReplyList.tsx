import { useState } from "react";
import { ChevronDown, Loader2 } from "lucide-react";
import { AppButton } from "@/components/core/AppButton";
import { AppAvatar } from "@/components/core/AppAvatar";
import { useGetRepliesApi } from "@/features/comment/hooks/useGetRepliesApi";
import type { CommentData } from "@/features/comment/types";
import CommentInput from "./CommentInput";

type ReplyListProps = {
  rootComment: CommentData;
  postId: string;
};

function ReplyList({ rootComment, postId }: ReplyListProps) {
  const [expanded, setExpanded] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);

  const { replies, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetRepliesApi(rootComment.id, expanded);

  const handleToggleReplies = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <div className="mt-2 ml-10">
      {rootComment.replyCount > 0 && (
        <AppButton
          variant="ghost"
          size="xs"
          className="text-primary text-xs h-6 px-0 hover:bg-transparent hover:underline"
          onClick={handleToggleReplies}
        >
          <ChevronDown
            className={`size-3 mr-1 transition-transform ${expanded ? "rotate-180" : ""}`}
          />
          {expanded ? "Hide replies" : `View ${rootComment.replyCount} ${rootComment.replyCount === 1 ? "reply" : "replies"}`}
        </AppButton>
      )}

      {expanded && (
        <div className="mt-2 flex flex-col gap-3">
          {isLoading && (
            <div className="flex items-center gap-2 text-muted-foreground text-xs py-1">
              <Loader2 className="size-3 animate-spin" />
              <span>Loading replies...</span>
            </div>
          )}

          {replies.map((reply) => (
            <div key={reply.id} className="flex items-start gap-2">
              <AppAvatar src={reply.author.avatarUrl} fallback={reply.author.username.charAt(0).toUpperCase()} size="sm" />
              <div className="flex-1 min-w-0">
                <div className="bg-muted rounded-xl px-3 py-2">
                  <span className="text-xs font-semibold text-foreground">{reply.author.username}</span>
                  <p className="text-sm text-foreground mt-0.5 break-words">{reply.content}</p>
                </div>
                <span className="text-[11px] text-muted-foreground mt-1 ml-1">{reply.createdAt}</span>
              </div>
            </div>
          ))}

          {hasNextPage && (
            <AppButton
              variant="ghost"
              size="xs"
              className="text-muted-foreground text-xs self-start px-0 hover:bg-transparent hover:underline"
              loading={isFetchingNextPage}
              onClick={() => void fetchNextPage()}
            >
              Load more replies
            </AppButton>
          )}

          <div className="mt-1">
            {!showReplyInput ? (
              <AppButton
                variant="ghost"
                size="xs"
                className="text-xs text-muted-foreground px-0 hover:bg-transparent hover:underline h-6"
                onClick={() => setShowReplyInput(true)}
              >
                Reply
              </AppButton>
            ) : (
              <CommentInput
                postId={postId}
                parentId={rootComment.id}
                placeholder={`Reply to ${rootComment.author.username}...`}
                onSuccess={() => setShowReplyInput(false)}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ReplyList;
