import { Music } from "lucide-react";
import { PostCard } from "@/components/shared/PostCard";
import { AppButton } from "@/components/core/AppButton";
import { useUserPostsTab } from "./useUserPostsTab";

type UserPostsTabProps = {
  authorId: string;
};

function UserPostsTab({ authorId }: UserPostsTabProps) {
  const { posts, meta, isLoading, page, setPage } = useUserPostsTab(authorId);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-36 rounded-xl bg-muted animate-pulse" />
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-muted-foreground gap-3">
        <Music className="size-10 opacity-30" />
        <p className="text-sm font-medium">No posts yet.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {meta && meta.pages > 1 && (
        <div className="flex items-center justify-center gap-3 pt-2">
          <AppButton
            variant="outline"
            size="sm"
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </AppButton>
          <span className="text-sm text-muted-foreground">
            Page {page + 1} of {meta.pages}
          </span>
          <AppButton
            variant="outline"
            size="sm"
            disabled={page >= meta.pages - 1}
            onClick={() => setPage(page + 1)}
          >
            Next
          </AppButton>
        </div>
      )}
    </div>
  );
}

export default UserPostsTab;
