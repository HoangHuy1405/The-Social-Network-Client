import { useInfiniteQuery } from "@tanstack/react-query";
import { getFeedApi } from "../api";
import { mapFeedPostToPostData } from "../mapping";
import { handleApiError } from "@/utils/api";
import { FEED_QUERY_KEY, FEED_PAGE_LIMIT } from "../constants";
import type { PostData } from "@/types/post";
import type { FeedPageDto } from "../types/api";

export const useFeedApi = () => {
  const query = useInfiniteQuery<FeedPageDto, Error, PostData[]>({
    queryKey: [FEED_QUERY_KEY],
    queryFn: ({ pageParam }) =>
      getFeedApi({
        cursor: pageParam as string | undefined,
        limit: FEED_PAGE_LIMIT,
      }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? (lastPage.nextCursor ?? undefined) : undefined,
    select: (data) =>
      data.pages.flatMap((page) => page.result.map(mapFeedPostToPostData)),
    meta: {
      onError: (err: unknown) => {
        handleApiError(err);
      },
    },
  });

  return {
    posts: query.data ?? [],
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    isLoading: query.isLoading,
  };
};
