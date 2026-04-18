import { ApiError } from "@/api";
import { showErrorMessage } from "@/hooks/useMessage";
import type { ApiErrorResponse, FieldErrors } from "@/types/api";

const isFieldErrors = (errors: unknown): errors is FieldErrors =>
  typeof errors === "object" && errors !== null && !Array.isArray(errors);

const formatFieldErrors = (errors: FieldErrors): string =>
  Object.entries(errors)
    .flatMap(([field, messages]) => messages.map((msg) => `${field}: ${msg}`))
    .join("\n");

export const handleApiError = (error: unknown, fallback = "An unexpected error occurred. Please try again."): void => {
  if (!(error instanceof ApiError)) {
    showErrorMessage(fallback);
    return;
  }

  const body = error.data as ApiErrorResponse | null | undefined;
  if (!body) {
    showErrorMessage(error.message || fallback);
    return;
  }

  const { errors, message } = body;
  if (isFieldErrors(errors)) {
    showErrorMessage(formatFieldErrors(errors));
    return;
  }
  if (typeof errors === "string" && errors.trim().length > 0) {
    showErrorMessage(errors);
    return;
  }

  showErrorMessage(message || fallback);
};
