import { Mail, Phone, Lock, LogOut } from "lucide-react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { AppButton } from "@/components/core/AppButton";
import type { SettingItemConfig, SettingSectionConfig } from "../types";

// Account tab config is a function so action ReactNodes can be created fresh per render.
// Each item is typed as SettingItemConfig for type-safety.
export function getAccountSections(handlers: {
  onEmail: () => void;
  onPhone: () => void;
  onPassword: () => void;
  onLogout: () => void;
}): SettingSectionConfig[] {
  return [
    {
      id: "account-info",
      title: "Account Info",
      items: [
        {
          id: "email",
          type: "row",
          icon: Mail,
          label: "Email address",
          description: "lanphuong@email.com",
          onClick: handlers.onEmail,
        },
        {
          id: "phone",
          type: "row",
          icon: Phone,
          label: "Phone number",
          description: "+84 912 345 678",
          onClick: handlers.onPhone,
        },
        {
          id: "password",
          type: "row",
          icon: Lock,
          label: "Password",
          description: "Change your account password",
          onClick: handlers.onPassword,
        },
      ] satisfies SettingItemConfig[],
    },
    {
      id: "account-auth",
      title: "Account Authorization",
      items: [
        {
          id: "google",
          type: "row",
          icon: FaGoogle as React.ComponentType<{ className?: string }>,
          label: "Google",
          description: "Connect your Google account",
          action: (
            <AppButton variant="outline" size="sm">
              Connect
            </AppButton>
          ),
        },
        {
          id: "github",
          type: "row",
          icon: FaGithub as React.ComponentType<{ className?: string }>,
          label: "GitHub",
          description: "Connect your GitHub account",
          action: (
            <AppButton variant="outline" size="sm">
              Connect
            </AppButton>
          ),
        },
      ] satisfies SettingItemConfig[],
    },
    {
      id: "danger",
      title: "Danger Zone",
      variant: "danger",
      items: [
        {
          id: "logout",
          type: "row",
          icon: LogOut,
          label: "Log out",
          description: "Sign out of your EchoWave account",
          onClick: handlers.onLogout,
          variant: "danger",
        },
      ] satisfies SettingItemConfig[],
    },
  ];
}
