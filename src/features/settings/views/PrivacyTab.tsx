import { useState, useMemo } from "react";
import SettingsSection from "../components/SettingsSection";
import { getPrivacySections } from "../config/privacy.config";
import { VISIBILITY_OPTIONS } from "../constants";

function PrivacyTab() {
  const [isPrivate, setIsPrivate] = useState(false);
  const [showActivity, setShowActivity] = useState(true);
  const [followersVisibility, setFollowersVisibility] = useState("everyone");
  const [followingVisibility, setFollowingVisibility] = useState("everyone");

  const sections = useMemo(
    () =>
      getPrivacySections({
        isPrivate,
        setIsPrivate,
        followersVisibility,
        setFollowersVisibility,
        followingVisibility,
        setFollowingVisibility,
        showActivity,
        setShowActivity,
        visibilityOptions: VISIBILITY_OPTIONS,
      }),
    [isPrivate, followersVisibility, followingVisibility, showActivity],
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
