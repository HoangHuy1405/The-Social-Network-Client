export type { PostCategory, PostAuthor, PostData, PostCardAction, PostActionConfig } from "@/types/post";

export type SidebarSectionConfig = {
  key: string;
  title: string;
  actionLabel?: string;
};

export type CreatorItem = {
  id: string;
  name: string;
  handle: string;
  followers: string;
  category: string;
  avatarUrl: string;
  isFollowing?: boolean;
};

export type HashtagItem = {
  tag: string;
  postCount: string;
};

export type PlaylistItem = {
  id: string;
  title: string;
  trackCount: number;
  thumbnailFallback: string;
};
