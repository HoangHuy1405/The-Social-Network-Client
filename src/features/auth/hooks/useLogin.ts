import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { loginApi } from "@/features/auth/api";
import { useAppDispatch } from "@/store";
import { setCredentials } from "@/store/authSlice";
import { useLoading } from "@/hooks/useLoading";
import { useValidation } from "@/hooks/useValidation";
import { showSuccessMessage } from "@/hooks/useMessage";
import { handleApiError } from "@/utils/api";
import { ROUTE_PATHS } from "@/constants/routes";
import type { LoginResponse } from "@/features/auth/types";

export type UseLoginOptions = {
  onSuccess?: (data: LoginResponse) => void;
};

export const useLogin = (options?: UseLoginOptions) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, show: showLoading, hide: hideLoading } = useLoading();

  const { fields, isFormValid } = useValidation({
    email: { rules: { isRequired: true, isEmail: true } },
    password: { rules: { isRequired: true } },
  });

  const storeUserCredentials = useCallback(
    (response: LoginResponse) => {
      dispatch(
        setCredentials({
          accessToken: response.accessToken,
          email: response.email,
          username: response.username,
          displayName: response.displayName ?? null,
          avatarUrl: response.avatarUrl ?? null,
        }),
      );
    },
    [dispatch],
  );

  const { mutate } = useMutation({
    mutationFn: loginApi,
    onMutate: () => showLoading(),
    onSuccess: (data) => {
      storeUserCredentials(data);
      showSuccessMessage("Login successful!");
      if (options?.onSuccess) {
        options.onSuccess(data);
      } else {
        void navigate(ROUTE_PATHS.HOME);
      }
    },
    onError: (error) => handleApiError(error),
    onSettled: () => hideLoading(),
  });

  const handleSubmit = useCallback(
    (e: React.SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!isFormValid) return;
      mutate({ email: fields.email.value, password: fields.password.value });
    },
    [fields.email.value, fields.password.value, isFormValid, mutate],
  );

  return {
    email: fields.email,
    password: fields.password,
    isLoading,
    isFormValid,
    handleSubmit,
  };
};
