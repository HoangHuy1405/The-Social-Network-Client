import { useMemo } from "react";
import SettingsSection from "../components/SettingsSection";
import { getPrivacySections } from "../config/privacy.config";
import { VISIBILITY_OPTIONS } from "../constants";
import { useSettingsForm } from "../contexts/SettingsFormContext";
import { useUpdatePrivacyApi } from "../hooks/useUpdatePrivacyApi";
import { AppButton } from "@/components/core/AppButton";

function PrivacyTab() {
  const { privacyForm } = useSettingsForm();
  const { watch, setValue, handleSubmit } = privacyForm;
  const { mutate: updatePrivacy, isPending } = useUpdatePrivacyApi();

  const handleSave = handleSubmit((data) => {
    updatePrivacy({
      isPrivate: data.isPrivate,
      followersVisibility: data.followersVisibility as any,
      followingVisibility: data.followingVisibility as any,
      showActivity: data.showActivity,
    });
  });

  const sections = useMemo(
    () =>
      getPrivacySections({
        isPrivate: watch("isPrivate"),
        setIsPrivate: (v) => setValue("isPrivate", v),
        followersVisibility: watch("followersVisibility"),
        setFollowersVisibility: (v) => setValue("followersVisibility", v),
        followingVisibility: watch("followingVisibility"),
        setFollowingVisibility: (v) => setValue("followingVisibility", v),
        showActivity: watch("showActivity"),
        setShowActivity: (v) => setValue("showActivity", v),
        visibilityOptions: VISIBILITY_OPTIONS,
      }),
    [watch("isPrivate"), watch("followersVisibility"), watch("followingVisibility"), watch("showActivity"), setValue],
  );

  return (
    <>
      {sections.map((section) => (
        <SettingsSection key={section.id} title={section.title} variant={section.variant} items={section.items} />
      ))}
      <div className="flex justify-end mt-4">
        <AppButton onClick={handleSave} loading={isPending}>
          Save changes
        </AppButton>
      </div>
    </>
  );
}

export { PrivacyTab };
