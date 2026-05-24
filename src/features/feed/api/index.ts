import http from "@/api";
import { API_ENDPOINTS } from "@/constants/apiEndpoints";
import type { FeedPageDto } from "../types/api";

type GetFeedParams = {
  cursor?: string;
  limit?: number;
};

export const getFeedApi = ({ cursor, limit }: GetFeedParams = {}): Promise<FeedPageDto> =>
  http.get<FeedPageDto>(API_ENDPOINTS.feed.list, {
    params: { cursor, limit },
  });
