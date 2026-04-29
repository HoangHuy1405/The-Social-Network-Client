import type { PostData, CreatorItem, HashtagItem, PlaylistItem } from "../types";

export const mockPosts: PostData[] = [
  {
    id: "post-1",
    author: {
      id: "user-1",
      username: "Minh Tuan",
      avatarUrl: "https://i.pravatar.cc/300?u=minhtuan",
    },
    category: "music",
    createdAt: "2 hours ago",
    title: "Morning Acoustic Demo 🎸",
    description:
      "Just finished this piece early in the morning, " +
      "feeling peaceful and calm. " +
      "Hope you enjoy and let me know what you think!",
    hashtags: ["acoustic", "guitar", "morning", "demo"],
    coverUrl: "https://picsum.photos/600/600",
    audioUrl: "",
    commentsCount: 2,
    listenCount: 0,
    replyCount: 0,
    repostCount: 0,
    likesCount: 98,
  },
  {
    id: "post-2",
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
    id: "post-3",
    author: {
      id: "user-3",
      username: "Hoang Anh",
      avatarUrl: "https://i.pravatar.cc/300?u=hoanganh",
    },
    category: "podcast",
    createdAt: "6 hours ago",
    title: "Coffee Talk #12: Staying Focused While Working From Home",
    description: "Sharing my tips to stay productive when working remotely. " + "Listen while brewing your coffee!",
    hashtags: ["podcast", "productivity", "wfh", "coffeetalk"],
    coverUrl: "https://loremflickr.com/1280/720/music?lock=123",
    audioUrl: "",
    commentsCount: 7,
    listenCount: 0,
    replyCount: 0,
    repostCount: 0,
    likesCount: 156,
  },
  {
    id: "post-4",
    author: {
      id: "user-4",
      username: "Hoang Anh",
      avatarUrl: "https://i.pravatar.cc/232",
    },
    category: "podcast",
    createdAt: "6 hours ago",
    title: "Coffee Talk #12: Staying Focused While Working From Home",
    description: "Sharing my tips to stay productive when working remotely. " + "Listen while brewing your coffee!",
    hashtags: ["podcast", "productivity", "wfh", "coffeetalk"],
    coverUrl: "https://i.pravatar.cc/300",
    audioUrl: "",
    commentsCount: 7,
    listenCount: 0,
    replyCount: 0,
    repostCount: 0,
    likesCount: 156,
  },
];

export const mockCreators: CreatorItem[] = [
  {
    id: "c1",
    name: "Nam Phong Mu...",
    handle: "namphong",
    followers: "12.4K",
    category: "Musician",
    avatarUrl: "https://i.pravatar.cc/256",
  },
  {
    id: "c2",
    name: "Dr. Khanh Ly",
    handle: "khanhly",
    followers: "8.9K",
    category: "Education",
    avatarUrl: "https://i.pravatar.cc/14",
  },
  {
    id: "c3",
    name: "TranTalk",
    handle: "trantalk",
    followers: "34.1K",
    category: "Podcast",
    avatarUrl: "https://i.pravatar.cc/300",
    isFollowing: true,
  },
  {
    id: "c4",
    name: "Ambient Sound...",
    handle: "ambientsound",
    followers: "6.2K",
    category: "Ambient",
    avatarUrl: "https://i.pravatar.cc/2",
  },
];

export const mockHashtags: HashtagItem[] = [
  { tag: "nhacviet", postCount: "14.2K posts" },
  { tag: "learnenglish", postCount: "9.8K posts" },
  { tag: "podcast2026", postCount: "7.3K posts" },
  { tag: "lofi", postCount: "6.1K posts" },
  { tag: "voicenote", postCount: "4.9K posts" },
  { tag: "stories", postCount: "3.7K posts" },
];

export const mockPlaylists: PlaylistItem[] = [
  {
    id: "pl1",
    title: "Chill Study Playlist",
    trackCount: 24,
    thumbnailFallback: "🎵",
  },
  {
    id: "pl2",
    title: "Top Podcasts This Week",
    trackCount: 12,
    thumbnailFallback: "🎙️",
  },
];
