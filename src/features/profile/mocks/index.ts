import type { ProfileData } from "../types";
import type { PostData } from "@/types/post";

export const MOCK_PROFILE: ProfileData = {
  id: "user-2",
  username: "Lan Phuong",
  displayName: "Lan Phuong Studio",
  bioDescription: "Sound designer & voice artist · Love to tell stories through sound",
  avatarUrl: "https://i.pravatar.cc/300?u=lanphuong",
  coverUrl: "https://loremflickr.com/1280/720/music?lock=2",
  location: "Ha Noi, Viet Nam",
  gender: "female",
  socialLinks: ["lanphuong.studio"],
  followersCount: 3500,
  followingCount: 67,
  createdAt: "March 2024",
  isFollowing: false,
  isOwner: true,
};

export const MOCK_PROFILE_POSTS: PostData[] = [
  {
    id: "pp-1",
    author: {
      id: "user-2",
      username: "Lan Phuong",
      avatarUrl: "https://i.pravatar.cc/300?u=lanphuong",
    },
    category: "lecture",
    createdAt: "4 hours ago",
    title: "Lecture Notes: Behavioral Psychology – Chapter 3",
    description:
      "Today's lesson covers Pavlov and Skinner's conditioning theory. " +
      "Recorded it for review — psych students check it out!",
    hashtags: ["psychology", "lecture", "education", "behavioral"],
    coverUrl: "https://loremflickr.com/1280/720/music?lock=2",
    audioUrl: "",
    commentsCount: 4,
    listenCount: 0,
    replyCount: 0,
    repostCount: 0,
    likesCount: 67,
  },
  {
    id: "pp-2",
    author: {
      id: "user-2",
      username: "Lan Phuong",
      avatarUrl: "https://i.pravatar.cc/300?u=lanphuong",
    },
    category: "podcast",
    createdAt: "2 days ago",
    title: "Voice Journal #8: Reflections on Creative Burnout",
    description: "An honest conversation with myself about staying motivated as a creator.",
    hashtags: ["podcast", "creativity", "journal"],
    coverUrl: "https://loremflickr.com/1280/720/music?lock=99",
    audioUrl: "",
    commentsCount: 12,
    listenCount: 0,
    replyCount: 0,
    repostCount: 0,
    likesCount: 93,
  },
  {
    id: "pp-3",
    author: {
      id: "user-2",
      username: "Lan Phuong",
      avatarUrl: "https://i.pravatar.cc/300?u=lanphuong",
    },
    category: "music",
    createdAt: "5 days ago",
    title: "Piano Ambient — Late Night Session",
    hashtags: ["music", "piano", "ambient"],
    audioUrl: "",
    commentsCount: 3,
    listenCount: 0,
    replyCount: 0,
    repostCount: 0,
    likesCount: 31,
  },
];
