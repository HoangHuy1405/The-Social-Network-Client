import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export type ProfileData = {
  id: string;
  username: string;
  displayName: string | null;
  bioDescription: string | null;
  avatarUrl: string;
  coverUrl: string;
  location: string | null;
  gender: string | null;
  socialLinks: string[];
  followersCount: number;
  followingCount: number;
  createdAt: string;
  isFollowing: boolean;
  isOwner: boolean;
};

export type PostFilterOption = "all" | "music" | "podcast" | "lecture" | "voicenote";

export type ProfileDetailItem = {
  key: string;
  icon: LucideIcon | ReactNode;
  label: string;
  value: string;
  isLink?: boolean;
};
