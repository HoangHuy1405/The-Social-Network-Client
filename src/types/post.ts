import type { LucideIcon } from "lucide-react";

export type PostCategory = "music" | "lecture" | "podcast" | "voicenote";
export type PostVisibility = "everyone" | "follows" | "private";

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
