import type { PostCategory, PostVisibility } from "@/types/post";
import type { MediaType } from "@/types/media";
import type { PaginationParams } from "@/types/pagination";

// Matches the mediaItems[] accepted by Feed Service
type MediaItem = {
  url: string;
  publicId: string;
  mediaType: MediaType;
};

type CreatePostPayload = {
  title: string;
  visibility: PostVisibility;
  category: PostCategory;
  description?: string;
  mediaItems?: MediaItem[];
};

type UpdatePostPayload = {
  title?: string;
  description?: string;
  visibility?: PostVisibility;
  category?: PostCategory;
};

type PostResponse = {
  id: string;
  authorId: string;
  authorUsername: string;
  authorAvatarUrl: string | null;
  title: string;
  description: string | null;
  category: string;
  visibility: string;
  coverUrl: string | null;
  audioUrl: string | null;
  hashtags: string[];
  likesCount: number;
  commentsCount: number;
  createdAt: string;
  updatedAt: string;
};

type LikeResponse = {
  id: string;
  postId: string;
  userId: string;
  createdAt: string;
};

type GetPostsByUserParams = PaginationParams;

type SearchPostsParams = {
  q?: string;
  hashtag?: string;
  page?: number;
  size?: number;
};

export type {
  MediaItem,
  CreatePostPayload,
  UpdatePostPayload,
  PostResponse,
  LikeResponse,
  GetPostsByUserParams,
  SearchPostsParams,
};

