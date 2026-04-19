import { showErrorMessage } from "@/hooks/useMessage";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { getUserMeApi } from "@/features/settings/api";
import { mapToProfileForm, mapToAccountForm, mapToPrivacyForm } from "./userSettingsMappers";
import type { ProfileFormData, AccountFormData, PrivacyFormData } from "@/features/settings/types";

type MappedUserData = {
  profile: ProfileFormData;
  account: AccountFormData;
  privacy: PrivacyFormData;
};

const PROFILE_DEFAULTS: ProfileFormData = {
  firstName: "",
  lastName: "",
  displayName: "",
  username: "",
  bioDescription: "",
  gender: "",
  avatarUrl: "",
  bannerUrl: "",
  socialLinks: [{ platform: "website", url: "" }],
};

const ACCOUNT_DEFAULTS: AccountFormData = {
  email: "",
  phoneNumber: "",
};

const PRIVACY_DEFAULTS: PrivacyFormData = {
  isPrivate: false,
  followersVisibility: "everyone",
  followingVisibility: "everyone",
  showActivity: true,
};

export const useUserSettings = () => {
  const { data } = useQuery({
    queryKey: ["userMe"],
    queryFn: getUserMeApi,
    meta: {
      onError: (err: unknown) => {
        showErrorMessage("Lỗi tải Settings: Không thể lấy thông tin người dùng");
        console.error("Settings API Error:", err);
      },
    },
    select: (raw): MappedUserData => ({
      profile: mapToProfileForm(raw),
      account: mapToAccountForm(raw),
      privacy: mapToPrivacyForm(raw),
    }),
  });

  const profileForm = useForm<ProfileFormData>({
    defaultValues: PROFILE_DEFAULTS,
    values: data?.profile,
  });
  const accountForm = useForm<AccountFormData>({
    defaultValues: ACCOUNT_DEFAULTS,
    values: data?.account,
  });
  const privacyForm = useForm<PrivacyFormData>({
    defaultValues: PRIVACY_DEFAULTS,
    values: data?.privacy,
  });

  return { profileForm, accountForm, privacyForm };
};

export type UseUserSettingsReturn = ReturnType<typeof useUserSettings>;
