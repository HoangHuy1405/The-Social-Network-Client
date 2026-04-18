import FeedCreatePostCard from "../components/FeedCreatePostCard";
import FeedPostCard from "../components/FeedPostCard";
import FeedSidebar from "../components/FeedSidebar";
import { mockPosts } from "../mocks";

function FeedPage() {
  return (
    <div className="flex justify-center gap-4 md:gap-6 px-0 md:px-6 py-4 max-w-[1200px] mx-auto">
      <div className="w-full lg:w-[70%] flex flex-col gap-4 min-w-0">
        <FeedCreatePostCard />
        {mockPosts.map((post) => (
          <FeedPostCard key={post.id} post={post} />
        ))}
      </div>

      <aside className="w-[30%] hidden lg:block shrink-0">
        <FeedSidebar />
      </aside>
    </div>
  );
}

export { FeedPage };
