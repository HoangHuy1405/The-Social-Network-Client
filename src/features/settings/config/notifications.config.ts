import { Heart, MessageCircle, UserPlus, Repeat2, Send, Newspaper, Mail } from "lucide-react";
import type { SettingItemConfig, SettingSectionConfig } from "../types";

export function getNotificationsSections(state: {
  pushLikes: boolean;
  setPushLikes: (v: boolean) => void;
  pushComments: boolean;
  setPushComments: (v: boolean) => void;
  pushFollows: boolean;
  setPushFollows: (v: boolean) => void;
  pushReposts: boolean;
  setPushReposts: (v: boolean) => void;
  pushMessages: boolean;
  setPushMessages: (v: boolean) => void;
  emailDigest: boolean;
  setEmailDigest: (v: boolean) => void;
  emailFollower: boolean;
  setEmailFollower: (v: boolean) => void;
  emailMessages: boolean;
  setEmailMessages: (v: boolean) => void;
}): SettingSectionConfig[] {
  return [
    {
      id: "notif-push",
      title: "Push Notifications",
      items: [
        {
          id: "push-likes",
          type: "toggle",
          icon: Heart,
          label: "Likes",
          description: "When someone likes your post",
          checked: state.pushLikes,
          onChange: state.setPushLikes,
        },
        {
          id: "push-comments",
          type: "toggle",
          icon: MessageCircle,
          label: "Comments",
          description: "When someone comments on your post",
          checked: state.pushComments,
          onChange: state.setPushComments,
        },
        {
          id: "push-follows",
          type: "toggle",
          icon: UserPlus,
          label: "Follows",
          description: "When someone follows you",
          checked: state.pushFollows,
          onChange: state.setPushFollows,
        },
        {
          id: "push-reposts",
          type: "toggle",
          icon: Repeat2,
          label: "Reposts",
          description: "When someone reposts your content",
          checked: state.pushReposts,
          onChange: state.setPushReposts,
        },
        {
          id: "push-messages",
          type: "toggle",
          icon: Send,
          label: "Messages",
          description: "When you receive a direct message",
          checked: state.pushMessages,
          onChange: state.setPushMessages,
        },
      ] satisfies SettingItemConfig[],
    },
    {
      id: "notif-email",
      title: "Email Notifications",
      items: [
        {
          id: "email-digest",
          type: "toggle",
          icon: Newspaper,
          label: "Weekly digest",
          description: "Summary of activity from the past week",
          checked: state.emailDigest,
          onChange: state.setEmailDigest,
        },
        {
          id: "email-follower",
          type: "toggle",
          icon: UserPlus,
          label: "New follower",
          description: "When someone new follows you",
          checked: state.emailFollower,
          onChange: state.setEmailFollower,
        },
        {
          id: "email-messages",
          type: "toggle",
          icon: Mail,
          label: "Direct messages",
          description: "When you receive a direct message",
          checked: state.emailMessages,
          onChange: state.setEmailMessages,
        },
      ] satisfies SettingItemConfig[],
    },
  ];
}
