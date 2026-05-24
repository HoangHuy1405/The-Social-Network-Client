import { useState, useMemo } from "react";
import SettingsSection from "../components/SettingsSection";
import { getNotificationsSections } from "../config/notifications.config";

function NotificationsTab() {
  const [pushLikes, setPushLikes] = useState(true);
  const [pushComments, setPushComments] = useState(true);
  const [pushFollows, setPushFollows] = useState(true);
  const [pushReposts, setPushReposts] = useState(false);
  const [pushMessages, setPushMessages] = useState(true);

  const [emailDigest, setEmailDigest] = useState(true);
  const [emailFollower, setEmailFollower] = useState(false);
  const [emailMessages, setEmailMessages] = useState(false);

  const sections = useMemo(
    () =>
      getNotificationsSections({
        pushLikes,
        setPushLikes,
        pushComments,
        setPushComments,
        pushFollows,
        setPushFollows,
        pushReposts,
        setPushReposts,
        pushMessages,
        setPushMessages,
        emailDigest,
        setEmailDigest,
        emailFollower,
        setEmailFollower,
        emailMessages,
        setEmailMessages,
      }),
    [pushLikes, pushComments, pushFollows, pushReposts, pushMessages, emailDigest, emailFollower, emailMessages],
  );

  return (
    <>
      {sections.map((section) => (
        <SettingsSection key={section.id} title={section.title} variant={section.variant} items={section.items} />
      ))}
    </>
  );
}

export { NotificationsTab };
