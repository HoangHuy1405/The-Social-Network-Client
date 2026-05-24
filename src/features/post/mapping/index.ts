import type { PostData, PostCategory } from "@/types/post";
import type { PostResponse } from "../types";
import { formatEnumToLowerCase, formatRelativeTime } from "@/utils/format";

export const mapPostResponseToPostData = (dto: PostResponse): PostData => ({
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
  listenCount: 0,
  replyCount: 0,
  repostCount: 0,
});
