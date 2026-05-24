import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePostApi } from "@/features/post/api";
import { useLoading, LOADING_TYPE } from "@/hooks/useLoading";
import { showSuccessMessage } from "@/hooks/useMessage";
import { handleApiError } from "@/utils/api";
import { FEED_QUERY_KEY } from "@/features/feed/constants";

export const useDeletePostApi = () => {
  const { show, hide } = useLoading(LOADING_TYPE.OVERLAY);
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: deletePostApi,
    onMutate: () => show(),
    onSuccess: () => {
      showSuccessMessage("Post deleted.");
      // Invalidate feed so the deleted post disappears
      void queryClient.invalidateQueries({ queryKey: [FEED_QUERY_KEY] });
    },
    onError: (err) => handleApiError(err),
    onSettled: () => hide(),
  });
};
