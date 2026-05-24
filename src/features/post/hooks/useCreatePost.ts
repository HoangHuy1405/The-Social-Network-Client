import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createPostApi } from "@/features/post/api";
import { useLoading, LOADING_TYPE } from "@/hooks/useLoading";
import { showSuccessMessage } from "@/hooks/useMessage";
import { handleApiError } from "@/utils/api";
import { ROUTE_PATHS } from "@/constants/routes";
import type { CreatePostPayload, PostResponse } from "@/features/post/types";

export const useCreatePost = () => {
  const navigate = useNavigate();
  const { show: showLoading, hide: hideLoading } = useLoading(LOADING_TYPE.TOPBAR);

  return useMutation<PostResponse, Error, CreatePostPayload>({
    mutationFn: createPostApi,
    onMutate: () => showLoading(),
    onSuccess: () => {
      showSuccessMessage("Post published!");
      void navigate(ROUTE_PATHS.HOME);
    },
    onError: (error) => handleApiError(error),
    onSettled: () => hideLoading(),
  });
};
