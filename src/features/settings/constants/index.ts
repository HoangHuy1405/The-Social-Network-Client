import type { SettingsTabConfig, VisibilityOption, AppLanguage } from "../types";

export const SETTINGS_TABS: SettingsTabConfig[] = [
  { id: "account", label: "Account", path: "account" },
  { id: "profile", label: "Profile", path: "profile" },
  { id: "privacy", label: "Privacy", path: "privacy" },
  { id: "preferences", label: "Preferences", path: "preferences" },
  { id: "notifications", label: "Notifications", path: "notifications" },
];

export const VISIBILITY_OPTIONS: { value: VisibilityOption; label: string }[] = [
  { value: "everyone", label: "Everyone" },
  { value: "followers", label: "Followers only" },
  { value: "only-me", label: "Only me" },
];

export const GENDER_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
  { value: "prefer-not-to-say", label: "Prefer not to say" },
];

export const LANGUAGE_OPTIONS: { value: AppLanguage; label: string }[] = [
  { value: "en", label: "English" },
  { value: "vi", label: "Tiếng Việt" },
];

export const THEME_OPTIONS = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
];

export const SOCIAL_PLATFORMS = [
  { value: "twitter", label: "Twitter / X" },
  { value: "instagram", label: "Instagram" },
  { value: "facebook", label: "Facebook" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "github", label: "GitHub" },
  { value: "website", label: "Website" },
];

export const DEFAULT_AVATARS = [
  "https://api.dicebear.com/9.x/glass/svg?seed=Felix",
  "https://api.dicebear.com/9.x/glass/svg?seed=Luna",
  "https://api.dicebear.com/9.x/glass/svg?seed=Zoe",
  "https://api.dicebear.com/9.x/glass/svg?seed=Leo",
  "https://api.dicebear.com/9.x/glass/svg?seed=Mia",
  "https://api.dicebear.com/9.x/glass/svg?seed=Max",
  "https://api.dicebear.com/9.x/glass/svg?seed=Nora",
  "https://api.dicebear.com/9.x/glass/svg?seed=Eli",
];

export const DEFAULT_BANNERS = [
  "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1200&q=80",
  "https://images.unsplash.com/photo-1579546929518-9e396f3cc135?w=1200&q=80",
  "https://images.unsplash.com/photo-1557683316-973673baf926?w=1200&q=80",
  "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=1200&q=80",
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80",
  "https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=1200&q=80",
];
