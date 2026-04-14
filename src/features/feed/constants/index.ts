import { Headphones, MessageCircle, Repeat2, Heart, Share2, Bookmark } from "lucide-react";
import type { PostActionConfig, PostCategory } from "../types";

export const POST_ACTIONS: PostActionConfig[] = [
  { key: "listen", icon: Headphones, countKey: "listenCount" },
  { key: "comment", icon: MessageCircle, countKey: "replyCount" },
  { key: "repost", icon: Repeat2, countKey: "repostCount" },
  { key: "like", icon: Heart, countKey: "likeCount" },
  { key: "share", icon: Share2 },
  { key: "save", icon: Bookmark },
];

export const CATEGORY_STYLES: Record<PostCategory, { label: string; className: string }> = {
  music: {
    label: "Music",
    className: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  },
  lecture: {
    label: "Lecture",
    className: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  },
  podcast: {
    label: "Podcast",
    className: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  },
  voicenote: {
    label: "Voice Note",
    className: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  },
};
