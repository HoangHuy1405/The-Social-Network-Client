import { useQuery } from "@tanstack/react-query";
import { getPostApi } from "@/features/post/api";
import { mapPostResponseToPostData } from "@/features/post/mapping";
import { handleApiError } from "@/utils/api";
import type { PostData } from "@/types/post";
import type { PostResponse } from "@/features/post/types";

const POST_DETAIL_QUERY_KEY = "postDetail" as const;

export const useGetPostApi = (id: string) =>
  useQuery<PostResponse, Error, PostData>({
    queryKey: [POST_DETAIL_QUERY_KEY, id],
    queryFn: () => getPostApi(id),
    enabled: !!id,
    select: mapPostResponseToPostData,
    meta: {
      onError: (err: unknown) => handleApiError(err),
    },
  });
