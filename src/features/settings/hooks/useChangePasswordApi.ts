import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { changePasswordApi } from "../api";
import { showSuccessMessage } from "@/hooks/useMessage";
import { handleApiError } from "@/utils/api";
import type { ChangePasswordRequest } from "../types/api";

export const useChangePasswordApi = () => {
  const form = useForm<ChangePasswordRequest>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: ChangePasswordRequest) => changePasswordApi(data),
    onSuccess: () => {
      showSuccessMessage("Password changed successfully");
      form.reset();
    },
    meta: {
      onError: (err: unknown) => {
        handleApiError(err);
      },
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    mutation.mutate(data);
  });

  return { form, mutation, onSubmit };
};
