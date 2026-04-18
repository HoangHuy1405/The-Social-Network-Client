import { Palette, Globe, Volume2, Eye, Languages } from "lucide-react";
import type { AppLanguage } from "../types";
import type { SettingItemConfig, SettingSectionConfig } from "../types";

export function getPreferencesSections(state: {
  theme: string;
  setTheme: (v: string) => void;
  language: AppLanguage;
  setLanguage: (v: string) => void;
  autoplay: boolean;
  setAutoplay: (v: boolean) => void;
  showSensitive: boolean;
  setShowSensitive: (v: boolean) => void;
  autoTranslate: boolean;
  setAutoTranslate: (v: boolean) => void;
  themeOptions: { value: string; label: string }[];
  languageOptions: { value: string; label: string }[];
}): SettingSectionConfig[] {
  return [
    {
      id: "prefs-appearance",
      title: "Appearance",
      items: [
        {
          id: "theme",
          type: "select",
          icon: Palette,
          label: "Theme",
          description: "Choose your preferred color scheme",
          value: state.theme,
          onValueChange: state.setTheme,
          options: state.themeOptions,
        },
      ] satisfies SettingItemConfig[],
    },
    {
      id: "prefs-language",
      title: "Language",
      items: [
        {
          id: "language",
          type: "select",
          icon: Globe,
          label: "Language",
          description: "Select your display language",
          value: state.language,
          onValueChange: state.setLanguage,
          options: state.languageOptions,
        },
      ] satisfies SettingItemConfig[],
    },
    {
      id: "prefs-audio",
      title: "Audio",
      items: [
        {
          id: "autoplay",
          type: "toggle",
          icon: Volume2,
          label: "Autoplay audio",
          description: "Automatically play audio when scrolling",
          checked: state.autoplay,
          onChange: state.setAutoplay,
        },
      ] satisfies SettingItemConfig[],
    },
    {
      id: "prefs-content",
      title: "Content",
      items: [
        {
          id: "sensitive-content",
          type: "toggle",
          icon: Eye,
          label: "Show sensitive content",
          description: "Display content that may be sensitive",
          checked: state.showSensitive,
          onChange: state.setShowSensitive,
        },
        {
          id: "auto-translate",
          type: "toggle",
          icon: Languages,
          label: "Auto-translate",
          description: "Automatically translate posts in other languages",
          checked: state.autoTranslate,
          onChange: state.setAutoTranslate,
        },
      ] satisfies SettingItemConfig[],
    },
  ];
}
