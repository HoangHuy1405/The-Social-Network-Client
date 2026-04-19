import { QueryCache, QueryClient } from "@tanstack/react-query";
import { handleApiError } from "@/utils/api";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      const onError = query.meta?.onError;
      if (typeof onError === "function") {
        onError(error);
      } else {
        handleApiError(error);
      }
    },
  }),
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
