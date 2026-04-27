import type { ProfileData } from "../types";
import type { UserProfileResponse } from "../types/api";

export const mapToProfileData = (raw: UserProfileResponse): ProfileData => ({
  id: raw.id,
  username: raw.username,
  displayName: raw.displayName,
  bioDescription: raw.bioDescription,
  avatarUrl: raw.avatarUrl ?? "",
  coverUrl: raw.bannerUrl ?? "",
  location: raw.location,
  gender: raw.gender,
  socialLinks: raw.socialLinks ?? [],
  followersCount: raw.followersCount ?? 0,
  followingCount: raw.followingCount ?? 0,
  createdAt: raw.createdAt ?? new Date().toISOString(),
  isFollowing: raw.isFollowing ?? false,
  isOwner: false,
});

export const PROFILE_DATA_DEFAULTS: ProfileData = {
  id: "",
  username: "",
  displayName: null,
  bioDescription: null,
  avatarUrl: "",
  coverUrl: "",
  location: null,
  gender: null,
  socialLinks: [],
  followersCount: 0,
  followingCount: 0,
  createdAt: new Date().toISOString(),
  isFollowing: false,
  isOwner: false,
};
