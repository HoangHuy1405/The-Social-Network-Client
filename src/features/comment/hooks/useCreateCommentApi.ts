import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCommentApi } from "@/features/comment/api";
import { useLoading, LOADING_TYPE } from "@/hooks/useLoading";
import { showSuccessMessage } from "@/hooks/useMessage";
import { handleApiError } from "@/utils/api";
import { COMMENTS_QUERY_KEY } from "@/features/comment/constants";
import type { CreateCommentPayload, CommentResponse } from "@/features/comment/types";

type CreateCommentVariables = {
  postId: string;
  payload: CreateCommentPayload;
};

export const useCreateCommentApi = () => {
  const { show, hide } = useLoading(LOADING_TYPE.OVERLAY);
  const queryClient = useQueryClient();

  return useMutation<CommentResponse, Error, CreateCommentVariables>({
    mutationFn: ({ postId, payload }) => createCommentApi(postId, payload),
    onMutate: () => show(),
    onSuccess: (_, { postId }) => {
      showSuccessMessage("Comment posted!");
      void queryClient.invalidateQueries({ queryKey: [COMMENTS_QUERY_KEY, postId] });
    },
    onError: (err) => handleApiError(err),
    onSettled: () => hide(),
  });
};
