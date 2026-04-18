import { useState, useMemo } from "react";
import { Camera, ImageIcon, Plus, Trash2, Link as LinkIcon } from "lucide-react";
import SettingsSection from "../components/SettingsSection";
import MediaUploadDialog from "../components/MediaUploadDialog";
import AppInput from "@/components/core/AppInput/AppInput";
import { AppButton } from "@/components/core/AppButton";
import AppSelect from "@/components/core/AppSelect/AppSelect";
import { cn } from "@/lib/utils";
import { GENDER_OPTIONS, SOCIAL_PLATFORMS, DEFAULT_AVATARS, DEFAULT_BANNERS } from "../constants";
import { getProfileSections } from "../config/profile.config";
import type { SettingsGender, SocialLinkEntry } from "../types";

function ProfileTab() {
  const [displayName, setDisplayName] = useState("Lan Phuong");
  const [username] = useState("lanphuong");
  const [description, setDescription] = useState("Sound designer & voice artist · Love to tell stories through sound");
  const [gender, setGender] = useState<SettingsGender>("female");

  const [avatarUrl, setAvatarUrl] = useState("https://i.pravatar.cc/300?u=lanphuong");
  const [bannerUrl, setBannerUrl] = useState("https://loremflickr.com/1280/720/music?lock=2");

  const [socialLinks, setSocialLinks] = useState<SocialLinkEntry[]>([{ platform: "twitter", url: "" }]);

  const [avatarDialogOpen, setAvatarDialogOpen] = useState(false);
  const [bannerDialogOpen, setBannerDialogOpen] = useState(false);

  const addSocialLink = () => setSocialLinks((prev) => [...prev, { platform: "website", url: "" }]);

  const removeSocialLink = (index: number) => setSocialLinks((prev) => prev.filter((_, i) => i !== index));

  const updateSocialLink = (index: number, field: keyof SocialLinkEntry, value: string) =>
    setSocialLinks((prev) => prev.map((link, i) => (i === index ? { ...link, [field]: value } : link)));

  const profileSections = useMemo(
    () =>
      getProfileSections({
        displayName,
        setDisplayName,
        username,
        description,
        setDescription,
        gender,
        setGender: (v) => setGender(v as SettingsGender),
        genderOptions: GENDER_OPTIONS,
        onRecord: () => {},
      }),
    [displayName, username, description, gender],
  );

  return (
    <>
      {/* Avatar & Banner — custom layout, not config-driven */}
      <SettingsSection title="Avatar & Banner">
        <div className="p-4 flex flex-col gap-4">
          <div className="relative group">
            <div className="w-full aspect-[3/1] rounded-xl overflow-hidden bg-muted">
              <img src={bannerUrl} alt="Banner" className="size-full object-cover" />
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
              <div className={cn("size-20 rounded-full overflow-hidden", "ring-4 ring-background bg-muted")}>
                <img src={avatarUrl} alt="Avatar" className="size-full object-cover" />
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

      {/* Personal Info + Audio Features — config-driven via profile.config.tsx */}
      {profileSections.map((section) => (
        <SettingsSection key={section.id} title={section.title} variant={section.variant} items={section.items} />
      ))}

      <SettingsSection title="Social Links">
        <div className="p-4 flex flex-col gap-3">
          {socialLinks.map((link, i) => (
            <div key={i} className="flex items-center gap-2">
              <AppSelect
                value={link.platform}
                onValueChange={(v) => updateSocialLink(i, "platform", v)}
                options={SOCIAL_PLATFORMS}
                triggerClassName="w-36 shrink-0"
              />
              <AppInput
                variant="filled"
                placeholder="https://..."
                value={link.url}
                onChange={(e) => updateSocialLink(i, "url", e.target.value)}
                prefix={<LinkIcon className="size-3.5" />}
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
        <AppButton onClick={() => {}}>Save changes</AppButton>
      </div>

      <MediaUploadDialog
        open={avatarDialogOpen}
        onOpenChange={setAvatarDialogOpen}
        title="Change profile photo"
        currentUrl={avatarUrl}
        defaultImages={DEFAULT_AVATARS}
        onSelect={setAvatarUrl}
        aspectRatio="aspect-square"
      />
      <MediaUploadDialog
        open={bannerDialogOpen}
        onOpenChange={setBannerDialogOpen}
        title="Change banner image"
        currentUrl={bannerUrl}
        defaultImages={DEFAULT_BANNERS}
        onSelect={setBannerUrl}
      />
    </>
  );
}

export { ProfileTab };
