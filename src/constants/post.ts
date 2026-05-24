import { Headphones, MessageCircle, Repeat2, Heart, Share2, Bookmark } from "lucide-react";
import type { PostActionConfig, PostCategory } from "@/types/post";

export const POST_ACTIONS: PostActionConfig[] = [
  { key: "listen", icon: Headphones, countKey: "listenCount" },
  { key: "comment", icon: MessageCircle, countKey: "commentsCount" },
  { key: "repost", icon: Repeat2, countKey: "repostCount" },
  { key: "like", icon: Heart, countKey: "likesCount" },
  { key: "share", icon: Share2 },
  { key: "save", icon: Bookmark },
];

export const POST_CATEGORIES: Record<PostCategory, { label: string; className: string; iconKey: "music" | "mic" | "podcast" }> =
  {
    music: {
      label: "Music",
      className: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      iconKey: "music",
    },
    lecture: {
      label: "Lecture",
      className: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      iconKey: "podcast",
    },
    podcast: {
      label: "Podcast",
      className: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      iconKey: "podcast", // You could adjust this if you add more icons to Lucide
    },
    voicenote: {
      label: "Voice Note",
      className: "bg-amber-500/20 text-amber-400 border-amber-500/30",
      iconKey: "mic",
    },
  };

export const QUICK_POST_CATEGORIES: PostCategory[] = ["voicenote", "podcast", "lecture"];

export const POST_VISIBILITY_OPTIONS = [
  { value: "everyone", label: "Everyone" },
  { value: "follows", label: "Follows Only" },
  { value: "private", label: "Private" },
];

export const DEFAULT_COVER_IMAGES = [
  "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=600&auto=format&fit=crop",
];
