import { toast } from "sonner";

type MessageType = "success" | "error" | "warning" | "info";

type MessageOptions = {
  duration?: number;
};

const DEFAULT_DURATION = 3000;

const show = (message: string, type: MessageType, duration = DEFAULT_DURATION): void => {
  const toastFn: Record<MessageType, typeof toast.info> = {
    success: toast.success,
    error: toast.error,
    warning: toast.warning,
    info: toast.info,
  };
  toastFn[type](message, { duration });
};

export const showMessage = (message: string, options: MessageOptions = {}): void => show(message, "info", options.duration);

export const showSuccessMessage = (message: string, options: MessageOptions = {}): void =>
  show(message, "success", options.duration);

export const showErrorMessage = (message: string, options: MessageOptions = {}): void =>
  show(message, "error", options.duration);

export const showWarningMessage = (message: string, options: MessageOptions = {}): void =>
  show(message, "warning", options.duration);

export const showInfoMessage = (message: string, options: MessageOptions = {}): void => show(message, "info", options.duration);

export const useMessage = () => ({
  success: showSuccessMessage,
  error: showErrorMessage,
  warning: showWarningMessage,
  info: showInfoMessage,
});
