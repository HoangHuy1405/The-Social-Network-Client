import { useQuery } from "@tanstack/react-query";
import { getPostsByUserApi } from "@/features/post/api";
import { mapPostResponseToPostData } from "@/features/post/mapping";
import { handleApiError } from "@/utils/api";
import type { PostData } from "@/types/post";
import type { GetPostsByUserParams, PostResponse } from "@/features/post/types";
import type { PaginatedResponse } from "@/types/pagination";

const USER_POSTS_QUERY_KEY = "userPosts" as const;

type UserPostsData = {
  posts: PostData[];
  meta: PaginatedResponse<PostResponse>["meta"];
};

export const useGetPostsByUserApi = (authorId: string, params?: GetPostsByUserParams) =>
  useQuery<PaginatedResponse<PostResponse>, Error, UserPostsData>({
    queryKey: [USER_POSTS_QUERY_KEY, authorId, params],
    queryFn: () => getPostsByUserApi(authorId, params),
    enabled: !!authorId,
    select: (data) => ({
      posts: data.result.map(mapPostResponseToPostData),
      meta: data.meta,
    }),
    meta: {
      onError: (err: unknown) => handleApiError(err),
    },
  });
