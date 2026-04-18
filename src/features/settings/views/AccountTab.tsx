import { useMemo } from "react";
import SettingsSection from "../components/SettingsSection";
import { getAccountSections } from "../config/account.config";
import { useLogout } from "@/features/auth/hooks/useLogout";

function AccountTab() {
  const { handleLogout } = useLogout();

  const sections = useMemo(
    () =>
      getAccountSections({
        onEmail: () => {},
        onPhone: () => {},
        onPassword: () => {},
        onLogout: handleLogout,
      }),
    [handleLogout],
  );

  return (
    <>
      {sections.map((section) => (
        <SettingsSection key={section.id} title={section.title} variant={section.variant} items={section.items} />
      ))}
    </>
  );
}

export { AccountTab };
