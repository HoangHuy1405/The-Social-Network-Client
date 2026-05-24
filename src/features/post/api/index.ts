import http from "@/api";
import { API_ENDPOINTS } from "@/constants/apiEndpoints";
import type {
  CreatePostPayload,
  UpdatePostPayload,
  PostResponse,
  LikeResponse,
  GetPostsByUserParams,
  SearchPostsParams,
} from "@/features/post/types";
import type { PaginatedResponse } from "@/types/pagination";

export const createPostApi = (payload: CreatePostPayload): Promise<PostResponse> =>
  http.post<PostResponse>(API_ENDPOINTS.post.create, payload);

export const getPostApi = (id: string): Promise<PostResponse> =>
  http.get<PostResponse>(API_ENDPOINTS.post.detail.replace(":id", id));

export const updatePostApi = (id: string, payload: UpdatePostPayload): Promise<PostResponse> =>
  http.patch<PostResponse>(API_ENDPOINTS.post.update.replace(":id", id), payload);

export const deletePostApi = (id: string): Promise<void> =>
  http.delete<void>(API_ENDPOINTS.post.delete.replace(":id", id));

export const getPostsByUserApi = (
  authorId: string,
  params?: GetPostsByUserParams,
): Promise<PaginatedResponse<PostResponse>> =>
  http.get<PaginatedResponse<PostResponse>>(
    API_ENDPOINTS.post.byUser.replace(":authorId", authorId),
    { params },
  );

export const searchPostsApi = (params: SearchPostsParams): Promise<PaginatedResponse<PostResponse>> =>
  http.get<PaginatedResponse<PostResponse>>(API_ENDPOINTS.post.search, { params });

export const likePostApi = (postId: string): Promise<LikeResponse> =>
  http.post<LikeResponse>(API_ENDPOINTS.like.like.replace(":postId", postId));

export const unlikePostApi = (postId: string): Promise<void> =>
  http.delete<void>(API_ENDPOINTS.like.unlike.replace(":postId", postId));

