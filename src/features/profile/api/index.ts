import http from "@/api";
import type { UserProfileResponse } from "../types/api";

export const getUserProfileApi = (username: string) => http.get<UserProfileResponse>(`/users/@${username}`);
