import http from "@/api";
import { API_ENDPOINTS } from "@/constants/apiEndpoints";
import type {
  UserMeResponse,
  UpdateProfileRequest,
  ChangePasswordRequest,
  UpdatePrivacyRequest,
} from "@/features/settings/types/api";

export const getUserMeApi = () => http.get<UserMeResponse>(API_ENDPOINTS.user.me);

export const updateProfileApi = (data: UpdateProfileRequest) => http.patch<UserMeResponse>(API_ENDPOINTS.user.profile, data);

export const changePasswordApi = (data: ChangePasswordRequest) => http.post<void>(API_ENDPOINTS.user.changePassword, data);

export const updatePrivacyApi = (data: UpdatePrivacyRequest) => http.patch<UserMeResponse>(API_ENDPOINTS.user.privacy, data);
