import { Mic } from "lucide-react";
import { AppButton } from "@/components/core/AppButton";
import type { SettingItemConfig, SettingSectionConfig } from "../types";

export function getProfileSections(state: {
  displayName: string;
  setDisplayName: (v: string) => void;
  username: string;
  description: string;
  setDescription: (v: string) => void;
  gender: string;
  setGender: (v: string) => void;
  genderOptions: { value: string; label: string }[];
  onRecord: () => void;
}): SettingSectionConfig[] {
  return [
    {
      id: "profile-personal",
      title: "Personal Info",
      items: [
        {
          id: "display-name",
          type: "input",
          label: "Display name",
          value: state.displayName,
          onChange: state.setDisplayName,
          placeholder: "Your display name",
        },
        {
          id: "username",
          type: "input",
          label: "Username",
          value: state.username,
          onChange: () => {},
          disabled: true,
          prefix: <span className="text-muted-foreground text-sm">@</span>,
        },
        {
          id: "description",
          type: "input",
          inputAs: "textarea",
          label: "Description",
          value: state.description,
          onChange: state.setDescription,
          placeholder: "Tell others about yourself...",
          rows: 3,
        },
        {
          id: "gender",
          type: "select",
          label: "Gender",
          value: state.gender,
          onValueChange: state.setGender,
          options: state.genderOptions,
        },
      ] satisfies SettingItemConfig[],
    },
    {
      id: "profile-audio",
      title: "Audio Features",
      items: [
        {
          id: "audio-bio",
          type: "row",
          icon: Mic,
          label: "Audio bio",
          description: "Record a short audio introduction",
          action: (
            <AppButton variant="outline" size="sm" onClick={state.onRecord}>
              <Mic className="size-3.5" />
              Record
            </AppButton>
          ),
        },
      ] satisfies SettingItemConfig[],
    },
  ];
}
