import { useInfiniteQuery } from "@tanstack/react-query";
import { getCommentsApi } from "@/features/comment/api";
import { mapCommentResponseToCommentData } from "@/features/comment/mapping";
import { handleApiError } from "@/utils/api";
import { COMMENTS_QUERY_KEY, COMMENTS_PAGE_SIZE } from "@/features/comment/constants";
import type { CommentData, CommentResponse } from "@/features/comment/types";
import type { PaginatedResponse } from "@/types/pagination";

export const useGetCommentsApi = (postId: string) => {
  const query = useInfiniteQuery<PaginatedResponse<CommentResponse>, Error, CommentData[]>({
    queryKey: [COMMENTS_QUERY_KEY, postId],
    queryFn: ({ pageParam }) =>
      getCommentsApi(postId, {
        page: (pageParam as number | undefined) ?? 0,
        size: COMMENTS_PAGE_SIZE,
        sort: "createdAt",
        direction: "DESC",
      }),
    initialPageParam: 0 as number,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      const currentPage = lastPageParam as number;
      return currentPage < lastPage.meta.pages - 1 ? currentPage + 1 : undefined;
    },
    select: (data) =>
      data.pages.flatMap((page) => page.result.map(mapCommentResponseToCommentData)),
    enabled: !!postId,
    meta: {
      onError: (err: unknown) => handleApiError(err),
    },
  });

  return {
    comments: query.data ?? [],
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    isLoading: query.isLoading,
  };
};
