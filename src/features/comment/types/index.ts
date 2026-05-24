import type { PaginationParams } from "@/types/pagination";

type CommentResponse = {
  id: string;
  postId: string;
  authorId: string;
  authorUsername: string;
  authorAvatarUrl: string | null;
  parentId: string | null;
  rootId: string | null;
  depth: number;
  content: string;
  replyCount: number;
  createdAt: string;
  updatedAt: string;
};

type CreateCommentPayload = {
  content: string;
  parentId?: string | null;
};

type GetCommentsParams = PaginationParams;

type GetRepliesParams = PaginationParams;

// UI model — mapped from CommentResponse
type CommentData = {
  id: string;
  postId: string;
  author: {
    id: string;
    username: string;
    avatarUrl: string;
  };
  parentId: string | null;
  rootId: string | null;
  depth: number;
  content: string;
  replyCount: number;
  createdAt: string;
};

export type {
  CommentResponse,
  CreateCommentPayload,
  GetCommentsParams,
  GetRepliesParams,
  CommentData,
};
