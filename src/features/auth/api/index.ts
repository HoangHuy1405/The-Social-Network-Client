import http from "@/api";
import { API_ENDPOINTS } from "@/constants/apiEndpoints";
import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from "@/features/auth/types";

export const loginApi = (data: LoginRequest) =>
  http.post<LoginResponse>(API_ENDPOINTS.auth.login, data, {
    headers: { isToken: false },
  });

export const registerApi = (data: RegisterRequest) =>
  http.post<RegisterResponse>(API_ENDPOINTS.auth.register, data, {
    headers: { isToken: false },
  });

export const logoutApi = () => http.post(API_ENDPOINTS.auth.logout);
