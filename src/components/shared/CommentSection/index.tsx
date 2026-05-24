import { Loader2 } from "lucide-react";
import { AppButton } from "@/components/core/AppButton";
import { AppAvatar } from "@/components/core/AppAvatar";
import { useGetCommentsApi } from "@/features/comment/hooks/useGetCommentsApi";
import CommentInput from "./CommentInput";
import ReplyList from "./ReplyList";

type CommentSectionProps = {
  postId: string;
};

function CommentSection({ postId }: CommentSectionProps) {
  const { comments, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetCommentsApi(postId);

  return (
    <div className="flex flex-col gap-4 pt-2">
      <CommentInput postId={postId} />

      <div className="flex flex-col gap-4">
        {isLoading && (
          <div className="flex items-center justify-center py-6">
            <Loader2 className="size-5 animate-spin text-muted-foreground" />
          </div>
        )}

        {!isLoading && comments.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            No comments yet. Be the first!
          </p>
        )}

        {comments.map((comment) => (
          <div key={comment.id}>
            <div className="flex items-start gap-3">
              <AppAvatar
                src={comment.author.avatarUrl}
                fallback={comment.author.username.charAt(0).toUpperCase()}
                size="sm"
              />
              <div className="flex-1 min-w-0">
                <div className="bg-muted rounded-xl px-3 py-2">
                  <span className="text-xs font-semibold text-foreground">{comment.author.username}</span>
                  <p className="text-sm text-foreground mt-0.5 break-words">{comment.content}</p>
                </div>
                <span className="text-[11px] text-muted-foreground mt-1 ml-1">{comment.createdAt}</span>
              </div>
            </div>

            <ReplyList rootComment={comment} postId={postId} />
          </div>
        ))}

        {hasNextPage && (
          <div className="flex justify-center">
            <AppButton
              variant="ghost"
              size="sm"
              className="text-muted-foreground text-xs"
              loading={isFetchingNextPage}
              onClick={() => void fetchNextPage()}
            >
              Load more comments
            </AppButton>
          </div>
        )}
      </div>
    </div>
  );
}

export default CommentSection;
