import type { LucideIcon } from "lucide-react";

export type PostCategory = "music" | "lecture" | "podcast" | "voicenote";

export type PostAuthor = {
  id: string;
  username: string;
  handle: string;
  avatarUrl: string;
};

export type PostData = {
  id: string;
  author: PostAuthor;
  category: PostCategory;
  createdAt: string;
  caption: string;
  description?: string;
  tags: string[];
  coverUrl?: string;
  audioSrc: string;
  audioDuration: number;
  commentCount: number;
  listenCount: string;
  replyCount: number;
  repostCount: number;
  likeCount: number;
  isFollowing?: boolean;
};

export type PostCardAction = "listen" | "comment" | "repost" | "like" | "share" | "save";

type PostDataRenderableKey = {
  [K in keyof PostData]: PostData[K] extends string | number ? K : never;
}[keyof PostData];

export type PostActionConfig = {
  key: PostCardAction;
  icon: LucideIcon;
  countKey?: PostDataRenderableKey;
};

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
  avatarFallback: string;
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
