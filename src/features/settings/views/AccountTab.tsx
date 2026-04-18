import { useMemo } from "react";
import SettingsSection from "../components/SettingsSection";
import { getAccountSections } from "../config/account.config";

function AccountTab() {
  const sections = useMemo(
    () =>
      getAccountSections({
        onEmail: () => {},
        onPhone: () => {},
        onPassword: () => {},
        onLogout: () => {},
      }),
    [],
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
