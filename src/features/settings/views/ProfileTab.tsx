import { useState, useMemo } from "react";
import { Camera, ImageIcon, Plus, Trash2 } from "lucide-react";
import { AppImage } from "@/components/core/AppImage";
import { AppAvatar } from "@/components/core/AppAvatar";
import SettingsSection from "../components/SettingsSection";
import MediaUploadDialog from "../components/MediaUploadDialog";
import AppInput from "@/components/core/AppInput/AppInput";
import { AppButton } from "@/components/core/AppButton";
import { cn } from "@/lib/utils";
import { GENDER_OPTIONS, DEFAULT_AVATARS, DEFAULT_BANNERS } from "../constants";
import { getProfileSections } from "../config/profile.config";
import { useSettingsForm } from "../contexts/SettingsFormContext";
import { useAppDispatch } from "@/store";
import { setAvatarUrl } from "@/store/authSlice";
import { useUpdateProfileApi } from "../hooks/useUpdateProfileApi";
import type { SettingsGender } from "../types";

import { getPlatformIcon } from "@/utils/social";

function ProfileTab() {
  const { profileForm } = useSettingsForm();
  const { watch, setValue, handleSubmit } = profileForm;
  const dispatch = useAppDispatch();
  const { mutate: updateProfile, isPending } = useUpdateProfileApi();

  const avatarUrl = watch("avatarUrl");
  const bannerUrl = watch("bannerUrl");
  const firstName = watch("firstName");
  const socialLinks = watch("socialLinks");

  const [avatarDialogOpen, setAvatarDialogOpen] = useState(false);
  const [bannerDialogOpen, setBannerDialogOpen] = useState(false);

  const addSocialLink = () => setValue("socialLinks", [...socialLinks, ""]);

  const removeSocialLink = (index: number) =>
    setValue(
      "socialLinks",
      socialLinks.filter((_, i) => i !== index),
    );

  const updateSocialLinkUrl = (index: number, url: string) => {
    setValue(
      "socialLinks",
      socialLinks.map((link, i) => (i === index ? url : link)),
    );
  };

  const handleSave = handleSubmit((data) => {
    updateProfile({
      firstName: data.firstName,
      lastName: data.lastName,
      displayName: data.displayName,
      bioDescription: data.bioDescription,
      gender: data.gender,
      location: data.location,
      avatarUrl: data.avatarUrl,
      bannerUrl: data.bannerUrl,
      // Pass the valid URLs to the API backend
      socialLinks: data.socialLinks.filter((url) => !!url),
    });
  });

  const profileSections = useMemo(
    () =>
      getProfileSections({
        firstName: watch("firstName"),
        setFirstName: (v) => setValue("firstName", v),
        lastName: watch("lastName"),
        setLastName: (v) => setValue("lastName", v),
        displayName: watch("displayName"),
        setDisplayName: (v) => setValue("displayName", v),
        username: watch("username"),
        description: watch("bioDescription"),
        setDescription: (v) => setValue("bioDescription", v),
        gender: watch("gender"),
        setGender: (v) => setValue("gender", v as SettingsGender),
        location: watch("location"),
        setLocation: (v) => setValue("location", v),
        genderOptions: GENDER_OPTIONS,
        onRecord: () => {},
      }),
    [
      watch("firstName"),
      watch("lastName"),
      watch("displayName"),
      watch("username"),
      watch("bioDescription"),
      watch("gender"),
      watch("location"),
      setValue,
    ],
  );

  return (
    <>
      <SettingsSection title="Avatar & Banner">
        <div className="p-4 flex flex-col gap-4">
          <div className="relative group">
            <div className="w-full aspect-[3/1] rounded-xl overflow-hidden bg-muted">
              {bannerUrl ? (
                <AppImage src={bannerUrl} alt="Banner" mode="cover" aspectRatio="aspect-[3/1]" className="size-full" />
              ) : (
                <div className="size-full bg-gradient-to-r from-primary/20 to-primary/5" />
              )}
            </div>
            <button
              type="button"
              onClick={() => setBannerDialogOpen(true)}
              className={cn(
                "absolute inset-0 flex items-center justify-center",
                "bg-black/0 group-hover:bg-black/40 transition-colors",
                "rounded-xl cursor-pointer",
              )}
            >
              <div
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-lg",
                  "bg-background/80 backdrop-blur-sm",
                  "opacity-0 group-hover:opacity-100 transition-opacity",
                )}
              >
                <ImageIcon className="size-4" />
                <span className="text-xs font-medium">Change banner</span>
              </div>
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className={cn("size-20 rounded-full", "ring-4 ring-background bg-muted")}>
                <AppAvatar
                  src={avatarUrl || undefined}
                  fallback={firstName.charAt(0) || "?"}
                  useAuthAvatar={false}
                  className="size-full"
                />
              </div>
              <button
                type="button"
                onClick={() => setAvatarDialogOpen(true)}
                className={cn(
                  "absolute inset-0 flex items-center justify-center",
                  "bg-black/0 group-hover:bg-black/40 transition-colors",
                  "rounded-full cursor-pointer",
                )}
              >
                <Camera className={cn("size-5 text-white", "opacity-0 group-hover:opacity-100 transition-opacity")} />
              </button>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Profile photo</p>
              <p className="text-xs text-muted-foreground">Click to change your avatar</p>
            </div>
          </div>
        </div>
      </SettingsSection>

      {profileSections.map((section) => (
        <SettingsSection key={section.id} title={section.title} variant={section.variant} items={section.items} />
      ))}

      <SettingsSection title="Social Links">
        <div className="p-4 flex flex-col gap-3">
          {socialLinks.map((link, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border bg-muted/50">
                {getPlatformIcon(link)}
              </div>
              <AppInput
                variant="filled"
                placeholder="https://..."
                value={link}
                onChange={(e) => updateSocialLinkUrl(i, e.target.value)}
                fullWidth
              />
              <AppButton variant="ghost" size="icon-sm" onClick={() => removeSocialLink(i)}>
                <Trash2 className="size-4 text-muted-foreground" />
              </AppButton>
            </div>
          ))}
          <AppButton variant="ghost" size="sm" className="self-start" onClick={addSocialLink}>
            <Plus className="size-4" />
            Add link
          </AppButton>
        </div>
      </SettingsSection>

      <div className="flex justify-end">
        <AppButton onClick={handleSave} loading={isPending}>
          Save changes
        </AppButton>
      </div>

      <MediaUploadDialog
        open={avatarDialogOpen}
        onOpenChange={setAvatarDialogOpen}
        title="Change profile photo"
        currentUrl={avatarUrl}
        defaultImages={DEFAULT_AVATARS}
        onSelect={(url) => setValue("avatarUrl", url)}
        onSuccess={(url) => dispatch(setAvatarUrl(url))}
        aspectRatio="aspect-square"
        mediaType="AVATAR"
        context="PROFILE"
      />
      <MediaUploadDialog
        open={bannerDialogOpen}
        onOpenChange={setBannerDialogOpen}
        title="Change banner image"
        currentUrl={bannerUrl}
        defaultImages={DEFAULT_BANNERS}
        onSelect={(url) => setValue("bannerUrl", url)}
        onSuccess={(url) => setValue("bannerUrl", url)}
        mediaType="BANNER"
        context="PROFILE"
      />
    </>
  );
}

export { ProfileTab };
