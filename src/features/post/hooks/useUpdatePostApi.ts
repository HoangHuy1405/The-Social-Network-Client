import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePostApi } from "@/features/post/api";
import { useLoading, LOADING_TYPE } from "@/hooks/useLoading";
import { showSuccessMessage } from "@/hooks/useMessage";
import { handleApiError } from "@/utils/api";
import type { UpdatePostPayload, PostResponse } from "@/features/post/types";

type UpdatePostVariables = {
  id: string;
  payload: UpdatePostPayload;
};

export const useUpdatePostApi = () => {
  const { show, hide } = useLoading(LOADING_TYPE.OVERLAY);
  const queryClient = useQueryClient();

  return useMutation<PostResponse, Error, UpdatePostVariables>({
    mutationFn: ({ id, payload }) => updatePostApi(id, payload),
    onMutate: () => show(),
    onSuccess: (_, { id }) => {
      showSuccessMessage("Post updated successfully.");
      void queryClient.invalidateQueries({ queryKey: ["postDetail", id] });
    },
    onError: (err) => handleApiError(err),
    onSettled: () => hide(),
  });
};
