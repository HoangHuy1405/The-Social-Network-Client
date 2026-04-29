import { useRef, useEffect, useCallback } from "react";
import { Loader2 } from "lucide-react";
import FeedCreatePostCard from "../components/FeedCreatePostCard";
import FeedPostCard from "../components/FeedPostCard";
import FeedSidebar from "../components/FeedSidebar";
import { useFeedApi } from "../hooks/useFeedApi";

function FeedPage() {
  const { posts, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useFeedApi();

  const sentinelRef = useRef<HTMLDivElement>(null);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        void fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage],
  );

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: "200px",
    });
    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [handleIntersection]);

  return (
    <div className="flex justify-center gap-4 md:gap-6 px-0 md:px-6 py-4 max-w-[1200px] mx-auto">
      <div className="w-full lg:w-[70%] flex flex-col gap-4 min-w-0">
        <FeedCreatePostCard />

        {posts.map((post) => (
          <FeedPostCard key={post.id} post={post} />
        ))}

        {!isLoading && posts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
            <p className="text-sm">No posts in your feed yet.</p>
            <p className="text-xs mt-1">Follow creators to see their posts here.</p>
          </div>
        )}

        {isFetchingNextPage && (
          <div className="flex justify-center py-4">
            <Loader2 className="size-6 animate-spin text-muted-foreground" />
          </div>
        )}

        <div ref={sentinelRef} className="h-1" />
      </div>

      <aside className="w-[30%] hidden lg:block shrink-0">
        <FeedSidebar />
      </aside>
    </div>
  );
}

export { FeedPage };
