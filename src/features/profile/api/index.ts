import http from "@/api";
import { API_ENDPOINTS } from "@/constants/apiEndpoints";
import type { UserProfileResponse, UserProfileSummaryResponse } from "../types/api";

export const getUserProfileApi = (username: string) => http.get<UserProfileResponse>(`/users/@${username}`);

export const getUserProfileSummaryApi = (userId: string) =>
  http.get<UserProfileSummaryResponse>(API_ENDPOINTS.user.profileSummary.replace(":id", userId));
