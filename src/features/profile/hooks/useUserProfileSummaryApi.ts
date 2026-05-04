import { useQuery } from "@tanstack/react-query";
import { getUserProfileSummaryApi } from "../api";
import { handleApiError } from "@/utils/api";
import { mapToProfileSummaryData } from "../mapping";

export const useUserProfileSummaryApi = (userId: string, enabled: boolean) => {
  const query = useQuery({
    queryKey: ["userProfileSummary", userId],
    queryFn: async () => {
      const response = await getUserProfileSummaryApi(userId);
      return response;
    },
    enabled: enabled && !!userId,
    meta: {
      onError: (err: unknown) => {
        handleApiError(err);
      },
    },
    select: mapToProfileSummaryData,
  });

  return query;
};
