import type { PostData, CreatorItem, HashtagItem, PlaylistItem } from "../types";

export const mockPosts: PostData[] = [
  {
    id: "post-1",
    author: {
      id: "user-1",
      username: "Minh Tuan",
      handle: "@minhtuan",
      avatarUrl: "https://i.pravatar.cc/300?u=minhtuan",
    },
    category: "music",
    createdAt: "2 hours ago",
    caption: "Morning Acoustic Demo 🎸",
    description:
      "Just finished this piece early in the morning, " +
      "feeling peaceful and calm. " +
      "Hope you enjoy and let me know what you think!",
    tags: ["acoustic", "guitar", "morning", "demo"],
    coverUrl: "https://picsum.photos/600/600",
    audioSrc: "",
    audioDuration: 222,
    commentCount: 2,
    listenCount: "1.2K",
    replyCount: 23,
    repostCount: 12,
    likeCount: 98,
  },
  {
    id: "post-2",
    author: {
      id: "user-2",
      username: "Lan Phuong",
      handle: "@lanphuong",
      avatarUrl: "https://i.pravatar.cc/300?u=lanphuong",
    },
    category: "lecture",
    createdAt: "4 hours ago",
    caption: "Lecture Notes: Behavioral Psychology – Chapter 3",
    description:
      "Today's lesson covers Pavlov and Skinner's conditioning theory. " +
      "Recorded it for review — psych students check it out!",
    tags: ["psychology", "lecture", "education", "behavioral"],
    coverUrl: "https://loremflickr.com/1280/720/music?lock=2",
    audioSrc: "",
    audioDuration: 1085,
    commentCount: 4,
    listenCount: "856",
    replyCount: 15,
    repostCount: 8,
    likeCount: 67,
    isFollowing: true,
  },
  {
    id: "post-3",
    author: {
      id: "user-3",
      username: "Hoang Anh",
      handle: "@hoanganh",
      avatarUrl: "https://i.pravatar.cc/300?u=hoanganh",
    },
    category: "podcast",
    createdAt: "6 hours ago",
    caption: "Coffee Talk #12: Staying Focused While Working From Home",
    description: "Sharing my tips to stay productive when working remotely. " + "Listen while brewing your coffee!",
    tags: ["podcast", "productivity", "wfh", "coffeetalk"],
    coverUrl: "https://loremflickr.com/1280/720/music?lock=123",
    audioSrc: "",
    audioDuration: 1845,
    commentCount: 7,
    listenCount: "3.4K",
    replyCount: 42,
    repostCount: 25,
    likeCount: 156,
  },
  {
    id: "post-4",
    author: {
      id: "user-4",
      username: "Hoang Anh",
      handle: "@hoanganh",
      avatarUrl: "https://i.pravatar.cc/232",
    },
    category: "podcast",
    createdAt: "6 hours ago",
    caption: "Coffee Talk #12: Staying Focused While Working From Home",
    description: "Sharing my tips to stay productive when working remotely. " + "Listen while brewing your coffee!",
    tags: ["podcast", "productivity", "wfh", "coffeetalk"],
    coverUrl: "https://i.pravatar.cc/300",
    audioSrc: "",
    audioDuration: 1845,
    commentCount: 7,
    listenCount: "3.4K",
    replyCount: 42,
    repostCount: 25,
    likeCount: 156,
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
