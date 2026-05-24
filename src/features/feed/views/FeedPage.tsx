import { Loader2 } from "lucide-react";
import FeedCreatePostCard from "../components/FeedCreatePostCard";
import FeedPostCard from "../components/FeedPostCard";
import FeedSidebar from "../components/FeedSidebar";
import { useFeedPage } from "../hooks/useFeedPage";

function FeedPage() {
  const {
    posts,
    isLoading,
    isFetchingNextPage,
    searchQuery,
    isSearchMode,
    sentinelRef,
  } = useFeedPage();

  return (
    <div className="flex justify-center gap-4 md:gap-6 px-0 md:px-6 py-4 max-w-[1200px] mx-auto">
      <div className="w-full lg:w-[70%] flex flex-col gap-4 min-w-0">
        {!isSearchMode && <FeedCreatePostCard />}

        {isSearchMode && posts.length > 0 && (
          <div className="text-sm font-semibold text-muted-foreground px-1">
            Search results for: <span className="text-foreground">"{searchQuery}"</span>
          </div>
        )}

        {posts.map((post) => (
          <FeedPostCard key={post.id} post={post} />
        ))}

        {isLoading && (
          <div className="flex justify-center py-8">
            <Loader2 className="size-8 animate-spin text-muted-foreground" />
          </div>
        )}

        {!isLoading && posts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground text-center">
            {isSearchMode ? (
              <>
                <p className="text-sm font-medium">No results found for "{searchQuery}"</p>
                <p className="text-xs mt-1">Try a different keyword or hashtag.</p>
              </>
            ) : (
              <>
                <p className="text-sm">No posts in your feed yet.</p>
                <p className="text-xs mt-1">Follow creators to see their posts here.</p>
              </>
            )}
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

