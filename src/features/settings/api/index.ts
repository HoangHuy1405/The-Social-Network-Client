import http from "@/api";
import { API_ENDPOINTS } from "@/constants/apiEndpoints";
import type { UserMeResponse } from "@/features/settings/types/api";

export const getUserMeApi = () => http.get<UserMeResponse>(API_ENDPOINTS.user.me);
