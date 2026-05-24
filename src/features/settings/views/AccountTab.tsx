import { useMemo, useState } from "react";
import SettingsSection from "../components/SettingsSection";
import { getAccountSections } from "../config/account.config";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { useSettingsForm } from "../contexts/SettingsFormContext";
import ChangePasswordDialog from "../components/ChangePasswordDialog";

function AccountTab() {
  const { handleLogout } = useLogout();
  const { accountForm } = useSettingsForm();
  const { watch } = accountForm;
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);

  const sections = useMemo(
    () =>
      getAccountSections({
        email: watch("email"),
        phoneNumber: watch("phoneNumber"),
        onEmail: () => {},
        onPhone: () => {},
        onPassword: () => setPasswordDialogOpen(true),
        onLogout: handleLogout,
      }),
    [watch("email"), watch("phoneNumber"), handleLogout],
  );

  return (
    <>
      {sections.map((section) => (
        <SettingsSection key={section.id} title={section.title} variant={section.variant} items={section.items} />
      ))}
      <ChangePasswordDialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen} />
    </>
  );
}

export { AccountTab };
