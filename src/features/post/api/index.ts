import http from "@/api";
import { API_ENDPOINTS } from "@/constants/apiEndpoints";
import type { CreatePostPayload, PostResponse } from "@/features/post/types";

export const createPost = (payload: CreatePostPayload): Promise<PostResponse> =>
  http.post<PostResponse>(API_ENDPOINTS.post.create, payload);
