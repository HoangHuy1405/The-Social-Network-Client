import { AppImage } from "@/components/core/AppImage";

type ProfileCoverProps = {
  coverUrl: string;
  username: string;
};

function ProfileCover({ coverUrl, username }: ProfileCoverProps) {
  return (
    <AppImage
      src={coverUrl}
      alt={`${username}'s cover`}
      mode="blur"
      blurLevel="xl"
      brightness={0.35}
      aspectRatio="aspect-[4/1]"
      className="rounded-b-xl overflow-hidden"
    />
  );
}

export default ProfileCover;
