import type { PostCategory, PostVisibility } from "@/types/post";
import type { MediaType } from "@/types/media";

// Matches the mediaItems[] accepted by Feed Service (forwarded to Media Service via Feign)
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

type PostResponse = {
  id: string;
  authorId: string;
  authorUsername: string;
  authorAvatarUrl: string;
  title: string;
  description?: string;
  category: PostCategory;
  visibility: PostVisibility;
  coverUrl?: string;
  audioUrl?: string;
  hashtags: string[];
  likesCount: number;
  commentsCount: number;
  createdAt: string;
  updatedAt: string;
};

export type { MediaItem, CreatePostPayload, PostResponse };
