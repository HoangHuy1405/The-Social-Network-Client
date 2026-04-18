import { useState, useMemo } from "react";
import { useTheme } from "@/hooks";
import SettingsSection from "../components/SettingsSection";
import { getPreferencesSections } from "../config/preferences.config";
import { THEME_OPTIONS, LANGUAGE_OPTIONS } from "../constants";
import type { AppLanguage } from "../types";

function PreferencesTab() {
  const { theme, setTheme } = useTheme();
  const [language, setLanguage] = useState<AppLanguage>("en");
  const [autoplay, setAutoplay] = useState(true);
  const [showSensitive, setShowSensitive] = useState(false);
  const [autoTranslate, setAutoTranslate] = useState(false);

  const sections = useMemo(
    () =>
      getPreferencesSections({
        theme,
        setTheme,
        language,
        setLanguage: (v) => setLanguage(v as AppLanguage),
        autoplay,
        setAutoplay,
        showSensitive,
        setShowSensitive,
        autoTranslate,
        setAutoTranslate,
        themeOptions: THEME_OPTIONS,
        languageOptions: LANGUAGE_OPTIONS,
      }),
    [theme, language, autoplay, showSensitive, autoTranslate],
  );

  return (
    <>
      {sections.map((section) => (
        <SettingsSection key={section.id} title={section.title} variant={section.variant} items={section.items} />
      ))}
    </>
  );
}

export { PreferencesTab };
