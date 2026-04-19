import type { UserMeResponse } from "@/features/settings/types/api";
import type { ProfileFormData, AccountFormData, PrivacyFormData } from "@/features/settings/types";

const VISIBILITY_MAP: Record<string, string> = {
  EVERYONE: "everyone",
  FOLLOWERS: "followers",
  ONLY_ME: "only-me",
};

export const mapToProfileForm = (user: UserMeResponse): ProfileFormData => ({
  firstName: user.firstName,
  lastName: user.lastName,
  displayName: user.displayName ?? "",
  username: user.username,
  bioDescription: user.bioDescription ?? "",
  gender: user.gender ?? "",
  avatarUrl: user.avatarUrl ?? "",
  bannerUrl: user.bannerUrl ?? "",
  socialLinks: user.socialLinks.length > 0 ? user.socialLinks : [{ platform: "website", url: "" }],
});

export const mapToAccountForm = (user: UserMeResponse): AccountFormData => ({
  email: user.email,
  phoneNumber: user.phoneNumber ?? "",
});

export const mapToPrivacyForm = (user: UserMeResponse): PrivacyFormData => ({
  isPrivate: user.isPrivate,
  followersVisibility: VISIBILITY_MAP[user.followersVisibility] ?? "everyone",
  followingVisibility: VISIBILITY_MAP[user.followingVisibility] ?? "everyone",
  showActivity: user.showActivity,
});
