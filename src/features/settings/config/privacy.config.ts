import { Lock, Users, UserCheck, Activity } from "lucide-react";
import type { SettingItemConfig, SettingSectionConfig } from "../types";

export function getPrivacySections(state: {
  isPrivate: boolean;
  setIsPrivate: (v: boolean) => void;
  followersVisibility: string;
  setFollowersVisibility: (v: string) => void;
  followingVisibility: string;
  setFollowingVisibility: (v: string) => void;
  showActivity: boolean;
  setShowActivity: (v: boolean) => void;
  visibilityOptions: { value: string; label: string }[];
}): SettingSectionConfig[] {
  return [
    {
      id: "privacy-account",
      title: "Account",
      items: [
        {
          id: "private-account",
          type: "toggle",
          icon: Lock,
          label: "Private account",
          description: "Only approved followers can see your content",
          checked: state.isPrivate,
          onChange: state.setIsPrivate,
        },
      ] satisfies SettingItemConfig[],
    },
    {
      id: "privacy-visibility",
      title: "Visibility",
      items: [
        {
          id: "followers-visibility",
          type: "select",
          icon: Users,
          label: "Who can see my followers",
          description: "Control who can view your followers list",
          value: state.followersVisibility,
          onValueChange: state.setFollowersVisibility,
          options: state.visibilityOptions,
        },
        {
          id: "following-visibility",
          type: "select",
          icon: UserCheck,
          label: "Who can see my following",
          description: "Control who can view your following list",
          value: state.followingVisibility,
          onValueChange: state.setFollowingVisibility,
          options: state.visibilityOptions,
        },
        {
          id: "activity-status",
          type: "toggle",
          icon: Activity,
          label: "Show activity status",
          description: "Let others see when you're active",
          checked: state.showActivity,
          onChange: state.setShowActivity,
        },
      ] satisfies SettingItemConfig[],
    },
  ];
}
