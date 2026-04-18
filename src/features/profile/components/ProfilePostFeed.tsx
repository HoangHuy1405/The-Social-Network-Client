import { useState, useMemo } from "react";
import { PostCard } from "@/components/shared/PostCard";
import { AppSelect } from "@/components/core/AppSelect";
import { POST_FILTER_OPTIONS } from "../constants";
import type { PostFilterOption } from "../types";
import type { PostData } from "@/types/post";

type ProfilePostFeedProps = {
  posts: PostData[];
};

function ProfilePostFeed({ posts }: ProfilePostFeedProps) {
  const [filter, setFilter] = useState<PostFilterOption>("all");

  const filteredPosts = useMemo(() => (filter === "all" ? posts : posts.filter((p) => p.category === filter)), [posts, filter]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <AppSelect
          value={filter}
          onValueChange={(v) => setFilter(v as PostFilterOption)}
          options={POST_FILTER_OPTIONS}
          placeholder="Filter by type"
        />
      </div>

      {filteredPosts.length === 0 ? (
        <div className="py-12 text-center text-muted-foreground text-sm">No posts found for this filter.</div>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProfilePostFeed;
