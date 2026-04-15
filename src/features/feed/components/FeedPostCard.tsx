import { PostCard } from "@/components/shared/PostCard";
import type { PostData } from "@/types/post";

type FeedPostCardProps = {
  post: PostData;
};

function FeedPostCard({ post }: FeedPostCardProps) {
  return <PostCard post={post} />;
}

export default FeedPostCard;
