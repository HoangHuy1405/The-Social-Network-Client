import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likePostApi, unlikePostApi } from "@/features/post/api";
import { handleApiError } from "@/utils/api";
import { FEED_QUERY_KEY } from "@/features/feed/constants";
import type { LikeResponse } from "@/features/post/types";

type LikeContext = {
  postId: string;
};

// Single hook manages both like and unlike to share optimistic update logic
export const useLikePostApi = () => {
  const queryClient = useQueryClient();

  const likeMutation = useMutation<LikeResponse, Error, string, LikeContext>({
    mutationFn: likePostApi,
    onError: (err) => handleApiError(err),
    onSettled: () => void queryClient.invalidateQueries({ queryKey: [FEED_QUERY_KEY] }),
  });

  const unlikeMutation = useMutation<void, Error, string, LikeContext>({
    mutationFn: unlikePostApi,
    onError: (err) => handleApiError(err),
    onSettled: () => void queryClient.invalidateQueries({ queryKey: [FEED_QUERY_KEY] }),
  });

  return { likeMutation, unlikeMutation };
};
