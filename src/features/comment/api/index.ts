import http from "@/api";
import { API_ENDPOINTS } from "@/constants/apiEndpoints";
import type { CommentResponse, CreateCommentPayload, GetCommentsParams, GetRepliesParams } from "../types";
import type { PaginatedResponse } from "@/types/pagination";

export const createCommentApi = (
  postId: string,
  payload: CreateCommentPayload,
): Promise<CommentResponse> =>
  http.post<CommentResponse>(
    API_ENDPOINTS.comment.create.replace(":postId", postId),
    payload,
  );

export const getCommentsApi = (
  postId: string,
  params?: GetCommentsParams,
): Promise<PaginatedResponse<CommentResponse>> =>
  http.get<PaginatedResponse<CommentResponse>>(
    API_ENDPOINTS.comment.list.replace(":postId", postId),
    { params },
  );

export const getRepliesApi = (
  rootId: string,
  params?: GetRepliesParams,
): Promise<PaginatedResponse<CommentResponse>> =>
  http.get<PaginatedResponse<CommentResponse>>(
    API_ENDPOINTS.comment.replies.replace(":rootId", rootId),
    { params },
  );
