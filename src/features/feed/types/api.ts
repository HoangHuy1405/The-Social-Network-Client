export type FeedPostDto = {
  id: string;
  authorId: string;
  authorUsername: string;
  authorAvatarUrl: string | null;
  title: string;
  description: string | null;
  hashtags: string[];
  coverUrl: string | null;
  audioUrl: string | null;
  category: string;
  visibility: string;
  likesCount: number;
  commentsCount: number;
  createdAt: string;
  updatedAt: string;
};

export type FeedPageDto = {
  result: FeedPostDto[];
  nextCursor: string | null;
  hasNext: boolean;
};
