import { AppAvatar } from "@/components/common/AppAvatar";
import type { ProfileData } from "../types";

type ProfileUserInfoProps = {
  profile: ProfileData;
};

function ProfileUserInfo({ profile }: ProfileUserInfoProps) {
  return (
    <div className="flex items-center gap-4">
      <AppAvatar
        src={profile.avatarUrl}
        fallback={profile.username.charAt(0).toUpperCase()}
        useAuthAvatar={false}
        className="size-20 text-2xl shrink-0"
      />
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className="text-lg font-bold text-foreground leading-tight truncate">{profile.username}</span>
        <span className="text-sm text-muted-foreground truncate">{profile.handle}</span>
        <p className="text-sm text-muted-foreground leading-snug mt-0.5 line-clamp-2">{profile.bio}</p>
      </div>
    </div>
  );
}

export default ProfileUserInfo;
