import type { LucideIcon } from "lucide-react";

export type ProfileData = {
  id: string;
  username: string;
  handle: string;
  bio: string;
  avatarUrl: string;
  coverUrl: string;
  websiteUrl?: string;
  location?: string;
  joinedAt: string;
  specialty?: string;
  totalPosts: number;
  followers: number;
  following: number;
  likes: number;
  totalListenTime: string;
  isOwner: boolean;
};

export type PostFilterOption = "all" | "music" | "podcast" | "lecture" | "voicenote";

export type ProfileDetailItem = {
  key: string;
  icon: LucideIcon;
  label: string;
  value: string;
  isLink?: boolean;
};
