import { Mic } from "lucide-react";
import { AppButton } from "@/components/core/AppButton";
import type { SettingItemConfig, SettingSectionConfig } from "../types";

export function getProfileSections(state: {
  firstName: string;
  setFirstName: (v: string) => void;
  lastName: string;
  setLastName: (v: string) => void;
  displayName: string;
  setDisplayName: (v: string) => void;
  username: string;
  description: string;
  setDescription: (v: string) => void;
  gender: string;
  setGender: (v: string) => void;
  location: string;
  setLocation: (v: string) => void;
  genderOptions: { value: string; label: string }[];
  onRecord: () => void;
}): SettingSectionConfig[] {
  return [
    {
      id: "profile-personal",
      title: "Personal Info",
      items: [
        {
          id: "first-name",
          type: "input",
          label: "First name",
          value: state.firstName,
          onChange: state.setFirstName,
          placeholder: "Your first name",
        },
        {
          id: "last-name",
          type: "input",
          label: "Last name",
          value: state.lastName,
          onChange: state.setLastName,
          placeholder: "Your last name",
        },
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
          id: "location",
          type: "input",
          label: "Location",
          value: state.location,
          onChange: state.setLocation,
          placeholder: "Where are you from?",
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
