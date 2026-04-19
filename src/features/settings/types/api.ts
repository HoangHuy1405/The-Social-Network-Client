import type { SocialLinkEntry } from "./index";

export type UserRole = "USER" | "ADMIN";

export type UserStatus = "ACTIVE" | "INACTIVE" | "BANNED";

export type FollowVisibility = "EVERYONE" | "FOLLOWERS" | "ONLY_ME";

export type UserMeResponse = {
  id: string;
  email: string;
  username: string;
  phoneNumber: string | null;
  roles: UserRole[];
  status: UserStatus;
  firstName: string;
  lastName: string;
  displayName: string | null;
  avatarUrl: string | null;
  bannerUrl: string | null;
  bioDescription: string | null;
  gender: string | null;
  location: string | null;
  socialLinks: SocialLinkEntry[];
  isPrivate: boolean;
  followersVisibility: FollowVisibility;
  followingVisibility: FollowVisibility;
  showActivity: boolean;
  followersCount: number;
  followingCount: number;
};
