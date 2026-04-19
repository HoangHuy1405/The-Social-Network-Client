import { createContext, useContext } from "react";
import type { UseUserSettingsReturn } from "@/features/settings/hooks/useUserSettings";

export const SettingsFormContext = createContext<UseUserSettingsReturn | null>(null);

export const useSettingsForm = (): UseUserSettingsReturn => {
  const ctx = useContext(SettingsFormContext);
  if (!ctx) throw new Error("useSettingsForm must be used within <SettingsLayout>");
  return ctx;
};
