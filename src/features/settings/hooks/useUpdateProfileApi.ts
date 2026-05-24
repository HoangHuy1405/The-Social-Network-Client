import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfileApi } from "../api";
import { showSuccessMessage } from "@/hooks/useMessage";
import { handleApiError } from "@/utils/api";
import type { UpdateProfileRequest } from "../types/api";

export const useUpdateProfileApi = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProfileRequest) => {
      const formattedData: UpdateProfileRequest = {
        ...data,
        ...(data.gender ? { gender: data.gender.toUpperCase().replaceAll("-", "_") } : {}),
      };
      return updateProfileApi(formattedData);
    },
    onSuccess: () => {
      showSuccessMessage("Profile updated successfully");
      void queryClient.invalidateQueries({ queryKey: ["userMe"] });
    },
    meta: {
      onError: (err: unknown) => {
        handleApiError(err);
      },
    },
  });
};
