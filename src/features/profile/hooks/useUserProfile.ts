import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { getUserProfileApi } from "../api";
import { handleApiError } from "@/utils/api";
import { mapToProfileData, PROFILE_DATA_DEFAULTS } from "../mapping";
import type { ProfileData } from "../types";

export const useUserProfile = (username?: string) => {
  const query = useQuery({
    queryKey: ["userProfile", username],
    queryFn: () => getUserProfileApi(username!),
    enabled: !!username,
    meta: {
      onError: (err: unknown) => {
        handleApiError(err);
      },
    },
    select: mapToProfileData,
  });

  const profileForm = useForm<ProfileData>({
    defaultValues: PROFILE_DATA_DEFAULTS,
    values: query.data,
  });

  return { query, profileForm };
};
