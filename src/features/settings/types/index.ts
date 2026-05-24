import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export type SettingsTabId = "account" | "profile" | "privacy" | "preferences" | "notifications";

export type SettingsTabConfig = {
  id: SettingsTabId;
  label: string;
  path: string;
};

// ─── Discriminated union for config-driven item rendering ────────────────────

type SettingItemBase = {
  id: string;
  icon?: LucideIcon | React.ComponentType<{ className?: string }>;
  label: string;
  description?: string;
};

export type SettingRowItem = SettingItemBase & {
  type: "row";
  value?: string;
  onClick?: () => void;
  action?: ReactNode;
  variant?: "default" | "danger";
};

export type SettingToggleItem = SettingItemBase & {
  type: "toggle";
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export type SettingSelectItem = SettingItemBase & {
  type: "select";
  value: string;
  onValueChange: (value: string) => void;
  options: { value: string; label: string }[];
};

export type SettingInputItem = SettingItemBase & {
  type: "input";
  /** Render as textarea when set to "textarea", otherwise renders as a single-line input */
  inputAs?: "input" | "textarea";
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  rows?: number;
  prefix?: ReactNode;
};

export type SettingItemConfig = SettingRowItem | SettingToggleItem | SettingSelectItem | SettingInputItem;

export type SettingsSectionVariant = "default" | "danger";

export type SettingSectionConfig = {
  id: string;
  title: string;
  variant?: SettingsSectionVariant;
  items: SettingItemConfig[];
};

// ─── Domain types ─────────────────────────────────────────────────────────────

export type SettingsGender = "male" | "female" | "other" | "prefer-not-to-say";

export type AccountAuthProvider = "google" | "github";

export type VisibilityOption = "everyone" | "followers" | "only-me";

export type AppLanguage = "en" | "vi";

export type ProfileFormData = {
  firstName: string;
  lastName: string;
  displayName: string;
  username: string;
  bioDescription: string;
  gender: string;
  location: string;
  avatarUrl: string;
  bannerUrl: string;
  socialLinks: string[];
};

export type AccountFormData = {
  email: string;
  phoneNumber: string;
};

export type PrivacyFormData = {
  isPrivate: boolean;
  followersVisibility: string;
  followingVisibility: string;
  showActivity: boolean;
};
