import type { LucideIcon } from "lucide-react";

export type PostCategory = "music" | "lecture" | "podcast" | "voicenote";
export type PostVisibility = "everyone" | "follows" | "private";

export type PostAuthor = {
  id: string;
  username: string;
  avatarUrl: string;
};

export type PostData = {
  id: string;
  author: PostAuthor;
  category: PostCategory;
  createdAt: string;
  title: string;
  description?: string;
  hashtags: string[];
  coverUrl?: string | null;
  audioUrl: string;
  // TODO: implement when backend supports these fields
  listenCount: number;
  replyCount: number;
  repostCount: number;
  commentsCount: number;
  likesCount: number;
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
