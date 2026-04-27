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
  socialLinks: string[];
  isPrivate: boolean;
  followersVisibility: FollowVisibility;
  followingVisibility: FollowVisibility;
  showActivity: boolean;
  followersCount: number;
  followingCount: number;
};

export type UpdateProfileRequest = {
  displayName?: string | null;
  bioDescription?: string | null;
  gender?: string | null;
  location?: string | null;
  avatarUrl?: string | null;
  bannerUrl?: string | null;
  socialLinks?: string[] | null;
};

export type ChangePasswordRequest = {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
};

export type UpdatePrivacyRequest = {
  isPrivate?: boolean | null;
  followersVisibility?: FollowVisibility | null;
  followingVisibility?: FollowVisibility | null;
  showActivity?: boolean | null;
};
