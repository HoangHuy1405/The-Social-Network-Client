import type { PostData, PostCategory } from "@/types/post";
import type { FeedPostDto } from "../types/api";
import { formatEnumToLowerCase, formatRelativeTime } from "@/utils/format";

export const mapFeedPostToPostData = (dto: FeedPostDto): PostData => ({
  id: dto.id,
  author: {
    id: dto.authorId,
    username: dto.authorUsername,
    avatarUrl: dto.authorAvatarUrl ?? "",
  },
  category: formatEnumToLowerCase<PostCategory>(dto.category),
  createdAt: formatRelativeTime(dto.createdAt),
  title: dto.title,
  description: dto.description ?? undefined,
  hashtags: dto.hashtags ?? [],
  coverUrl: dto.coverUrl,
  audioUrl: dto.audioUrl ?? "",
  commentsCount: dto.commentsCount,
  likesCount: dto.likesCount,
  // TODO: implement when backend supports these fields
  listenCount: 0,
  replyCount: 0,
  repostCount: 0,
});
