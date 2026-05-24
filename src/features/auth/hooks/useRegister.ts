import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { registerApi } from "@/features/auth/api";
import { useLoading } from "@/hooks/useLoading";
import { useValidation } from "@/hooks/useValidation";
import { showSuccessMessage } from "@/hooks/useMessage";
import { handleApiError } from "@/utils/api";
import { ROUTE_PATHS } from "@/constants/routes";

export const useRegister = () => {
  const navigate = useNavigate();
  const { isLoading, show: showLoading, hide: hideLoading } = useLoading();

  const { fields, isFormValid } = useValidation({
    firstName: { rules: { isRequired: true, isText: true } },
    lastName: { rules: { isRequired: true, isText: true } },
    username: { rules: { isRequired: true } },
    email: { rules: { isRequired: true, isEmail: true } },
    password: { rules: { isRequired: true, isPassword: true } },
  });

  const { mutate } = useMutation({
    mutationFn: registerApi,
    onMutate: () => showLoading(),
    onSuccess: () => {
      showSuccessMessage("Registration successful! Please log in.");
      void navigate(ROUTE_PATHS.LOGIN);
    },
    onError: (error) => handleApiError(error),
    onSettled: () => hideLoading(),
  });

  const handleSubmit = useCallback(
    (e: React.SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!isFormValid) return;
      mutate({
        firstName: fields.firstName.value,
        lastName: fields.lastName.value,
        username: fields.username.value,
        email: fields.email.value,
        password: fields.password.value,
      });
    },
    [
      fields.firstName.value,
      fields.lastName.value,
      fields.username.value,
      fields.email.value,
      fields.password.value,
      isFormValid,
      mutate,
    ],
  );

  return {
    firstName: fields.firstName,
    lastName: fields.lastName,
    username: fields.username,
    email: fields.email,
    password: fields.password,
    isLoading,
    isFormValid,
    handleSubmit,
  };
};
