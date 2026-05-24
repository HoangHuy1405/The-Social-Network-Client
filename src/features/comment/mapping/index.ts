import { formatRelativeTime } from "@/utils/format";
import type { CommentData, CommentResponse } from "../types";

export const mapCommentResponseToCommentData = (dto: CommentResponse): CommentData => ({
  id: dto.id,
  postId: dto.postId,
  author: {
    id: dto.authorId,
    username: dto.authorUsername,
    avatarUrl: dto.authorAvatarUrl ?? "",
  },
  parentId: dto.parentId,
  rootId: dto.rootId,
  depth: dto.depth,
  content: dto.content,
  replyCount: dto.replyCount,
  createdAt: formatRelativeTime(dto.createdAt),
});
