import type { PostData } from "@/types/post";
import type { FeedPostDto } from "../types/api";
import { mapPostResponseToPostData } from "@/features/post/mapping";

// FeedPostDto matches PostResponse shape — delegate to the canonical mapper
export const mapFeedPostToPostData = (dto: FeedPostDto): PostData =>
  mapPostResponseToPostData(dto);

