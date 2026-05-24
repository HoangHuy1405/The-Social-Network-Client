import { useInfiniteQuery } from "@tanstack/react-query";
import { getRepliesApi } from "@/features/comment/api";
import { mapCommentResponseToCommentData } from "@/features/comment/mapping";
import { handleApiError } from "@/utils/api";
import { REPLIES_QUERY_KEY, REPLIES_PAGE_SIZE } from "@/features/comment/constants";
import type { CommentData, CommentResponse } from "@/features/comment/types";
import type { PaginatedResponse } from "@/types/pagination";

export const useGetRepliesApi = (rootId: string, enabled = false) => {
  const query = useInfiniteQuery<PaginatedResponse<CommentResponse>, Error, CommentData[]>({
    queryKey: [REPLIES_QUERY_KEY, rootId],
    queryFn: ({ pageParam }) =>
      getRepliesApi(rootId, {
        page: (pageParam as number | undefined) ?? 0,
        size: REPLIES_PAGE_SIZE,
        sort: "createdAt",
        direction: "ASC",
      }),
    initialPageParam: 0 as number,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      const currentPage = lastPageParam as number;
      return currentPage < lastPage.meta.pages - 1 ? currentPage + 1 : undefined;
    },
    select: (data) =>
      data.pages.flatMap((page) => page.result.map(mapCommentResponseToCommentData)),
    // Only fetch when the user explicitly expands the reply thread
    enabled: !!rootId && enabled,
    meta: {
      onError: (err: unknown) => handleApiError(err),
    },
  });

  return {
    replies: query.data ?? [],
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    isLoading: query.isLoading,
  };
};
