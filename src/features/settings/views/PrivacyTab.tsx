import { useMemo } from "react";
import SettingsSection from "../components/SettingsSection";
import { getPrivacySections } from "../config/privacy.config";
import { VISIBILITY_OPTIONS } from "../constants";
import { useSettingsForm } from "../contexts/SettingsFormContext";

function PrivacyTab() {
  const { privacyForm } = useSettingsForm();
  const { watch, setValue } = privacyForm;

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
    </>
  );
}

export { PrivacyTab };
