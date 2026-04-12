import axios, { type AxiosError, type AxiosRequestConfig, type AxiosResponse, type InternalAxiosRequestConfig } from "axios";
import { store } from "@/store";
import { logout } from "@/store/authSlice";
import { showErrorMessage } from "@/hooks/useMessage";
import { PUBLIC_ENDPOINTS } from "@/constants/apiEndpoints";
import { ResultEnum } from "@/constants/httpType";
import { ROUTE_PATHS } from "@/constants/routes";
import { router } from "@/router";
import type { ApiResponse } from "@/types/api";

const BASE_URL: string = String(import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080/api/v1");

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: ResultEnum.TIMEOUT,
  headers: { "Content-Type": "application/json" },
});

export class ApiError extends Error {
  public data: unknown;
  public status?: number;

  constructor(message: string, data?: unknown, status?: number) {
    super(message);
    this.name = "ApiError";
    this.data = data;
    this.status = status;
  }
}

const isPublicEndpoint = (url: string): boolean => PUBLIC_ENDPOINTS.some((ep) => url.startsWith(ep));

const handleAuthExpired = (): void => {
  store.dispatch(logout());
  showErrorMessage("Session expired. Please log in again.", { duration: 4000 });
  void router.navigate(ROUTE_PATHS.LOGIN);
};

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const requestUrl = config.url ?? "";

    if (isPublicEndpoint(requestUrl)) return config;

    const token = store.getState().auth.accessToken;

    if (!token) {
      void router.navigate(ROUTE_PATHS.LOGIN);
      return Promise.reject(new ApiError("Unauthenticated — redirecting to login.", null, 401));
    }

    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },

  (error: AxiosError) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response): AxiosResponse | Promise<AxiosResponse> => {
    const body = response.data as ApiResponse;

    if (body.code === ResultEnum.OVERDUE) {
      handleAuthExpired();
      return Promise.reject(new ApiError(body.message || "Overdue", body, body.code));
    }

    if (body.success) return { ...response, data: body.data };

    return Promise.reject(new ApiError(body.message || "Request failed", body, body.code));
  },
  (error: AxiosError<ApiResponse>) => {
    if (axios.isCancel(error)) return Promise.reject(error);

    if (error.response) {
      const { status, data } = error.response;

      if (status === ResultEnum.OVERDUE) {
        handleAuthExpired();
        return Promise.reject(new ApiError(data?.message ?? "Overdue", data, status));
      }

      showErrorMessage(data?.message ?? `Server error (${status})`);
      return Promise.reject(new ApiError(data?.message ?? "Server error", data, status));
    }

    if (error.code === "ECONNABORTED") {
      showErrorMessage("Request timed out. Please try again.");
      return Promise.reject(new ApiError("Request timed out.", null, 408));
    }

    if (error.message === "Network Error") {
      showErrorMessage("No network connection.");
      return Promise.reject(new ApiError("No network connection.", null, 503));
    }

    showErrorMessage("An unexpected error occurred.");

    return Promise.reject(new ApiError("An unexpected error occurred.", error));
  },
);

const http = {
  get: <T>(url: string, config?: AxiosRequestConfig): Promise<T> => axiosInstance.get<unknown, T>(url, config),

  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> =>
    axiosInstance.post<unknown, T>(url, data, config),

  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> =>
    axiosInstance.put<unknown, T>(url, data, config),

  delete: <T>(url: string, config?: AxiosRequestConfig): Promise<T> => axiosInstance.delete<unknown, T>(url, config),

  download: (url: string, config?: AxiosRequestConfig): Promise<Blob> =>
    axiosInstance.get<unknown, Blob>(url, { ...config, responseType: "blob" }),
};

export default http;
