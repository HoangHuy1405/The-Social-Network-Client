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

const isNetworkError = (error: AxiosError): boolean => {
  return !!error.isAxiosError && !error.response && (error.code === "ERR_NETWORK" || error.message === "Network Error");
};

const handleAuthExpired = (): void => {
  store.dispatch(logout());
  showErrorMessage("Session expired. Please log in again.", { duration: 4000 });
  //TODO: handle refresh token here
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
  // Replace response.data with the inner ApiResponse payload; http methods extract .data afterwards
  (response): AxiosResponse => {
    const body = response.data as ApiResponse;

    if (body.code === ResultEnum.OVERDUE) {
      handleAuthExpired();
      return Promise.reject(new ApiError(body.message || "Overdue", body, body.code)) as never;
    }

    if (!body.success) {
      return Promise.reject(new ApiError(body.message || "Request failed", body, body.code)) as never;
    }

    return { ...response, data: body.data };
  },
  (error: AxiosError<ApiResponse>) => {
    // check network error here
    if (isNetworkError(error)) return Promise.reject(error);

    if (axios.isCancel(error)) return Promise.reject(error);

    if (error.response) {
      const { status, data } = error.response;

      if (status === ResultEnum.OVERDUE && !isPublicEndpoint(error.config?.url ?? "")) {
        handleAuthExpired();
        return Promise.reject(new ApiError(data?.message ?? "Overdue", data, status));
      }

      return Promise.reject(new ApiError(data?.message ?? "Server error", data, status));
    }

    if (error.code === "ECONNABORTED") {
      showErrorMessage("Request timed out. Please try again.");
      return Promise.reject(new ApiError("Request timed out.", null, 408));
    }

    showErrorMessage("An unexpected error occurred.");

    return Promise.reject(new ApiError("An unexpected error occurred.", error));
  },
);

const http = {
  get: <T>(url: string, config?: AxiosRequestConfig): Promise<T> => axiosInstance.get<T>(url, config).then((res) => res.data),

  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> =>
    axiosInstance.post<T>(url, data, config).then((res) => res.data),

  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> =>
    axiosInstance.put<T>(url, data, config).then((res) => res.data),

  patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> =>
    axiosInstance.patch<T>(url, data, config).then((res) => res.data),

  delete: <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    axiosInstance.delete<T>(url, config).then((res) => res.data),

  download: (url: string, config?: AxiosRequestConfig): Promise<Blob> =>
    axiosInstance.get<Blob>(url, { ...config, responseType: "blob" }).then((res) => res.data),
};

export default http;
