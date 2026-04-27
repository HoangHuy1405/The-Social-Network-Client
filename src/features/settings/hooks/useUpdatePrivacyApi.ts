import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePrivacyApi } from "../api";
import { showSuccessMessage } from "@/hooks/useMessage";
import { handleApiError } from "@/utils/api";
import type { UpdatePrivacyRequest } from "../types/api";

export const useUpdatePrivacyApi = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdatePrivacyRequest) => {
      const formattedData: UpdatePrivacyRequest = {
        ...data,
        ...(data.followersVisibility
          ? { followersVisibility: data.followersVisibility.toUpperCase().replaceAll("-", "_") as any }
          : {}),
        ...(data.followingVisibility
          ? { followingVisibility: data.followingVisibility.toUpperCase().replaceAll("-", "_") as any }
          : {}),
      };

      return updatePrivacyApi(formattedData);
    },
    onSuccess: () => {
      showSuccessMessage("Privacy settings updated successfully");
      void queryClient.invalidateQueries({ queryKey: ["userMe"] });
    },
    meta: {
      onError: (err: unknown) => {
        handleApiError(err);
      },
    },
  });
};
