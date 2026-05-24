import { useQuery } from "@tanstack/react-query";
import { searchPostsApi } from "@/features/post/api";
import { mapPostResponseToPostData } from "@/features/post/mapping";
import { handleApiError } from "@/utils/api";
import type { PostData } from "@/types/post";
import type { SearchPostsParams, PostResponse } from "@/features/post/types";
import type { PaginatedResponse } from "@/types/pagination";

const SEARCH_POSTS_QUERY_KEY = "searchPosts" as const;

type SearchPostsData = {
  posts: PostData[];
  meta: PaginatedResponse<PostResponse>["meta"];
};

// At least one of q or hashtag is required by the API
type EnabledSearchParams = SearchPostsParams & ({ q: string } | { hashtag: string });

export const useSearchPostsApi = (params: EnabledSearchParams) => {
  const isEnabled = !!(params.q || params.hashtag);

  return useQuery<PaginatedResponse<PostResponse>, Error, SearchPostsData>({
    queryKey: [SEARCH_POSTS_QUERY_KEY, params],
    queryFn: () => searchPostsApi(params),
    enabled: isEnabled,
    select: (data) => ({
      posts: data.result.map(mapPostResponseToPostData),
      meta: data.meta,
    }),
    meta: {
      onError: (err: unknown) => handleApiError(err),
    },
  });
};
