import { useAutoScroll } from "@/hooks/useAutoScroll";
import { useParams } from "react-router-dom";
import { useAppSelector } from "@/store";
import { useUserProfile } from "../hooks/useUserProfile";
import type { ProfileData } from "../types";
import ProfileCover from "../components/ProfileCover";
import ProfileUserInfo from "../components/ProfileUserInfo";
import ProfileActions from "../components/ProfileActions";
import ProfileDetailsCard from "../components/ProfileDetailsCard";
import ProfilePostFeed from "../components/ProfilePostFeed";
import { MOCK_PROFILE_POSTS } from "../mocks";

function ProfilePage() {
  const { username } = useParams<{ username: string }>();
  const currentUser = useAppSelector((state) => state.auth.username);
  const { profileForm } = useUserProfile(username);

  const posts = MOCK_PROFILE_POSTS;

  useAutoScroll(260);

  const formValues = profileForm.watch();

  const profile: ProfileData = {
    ...formValues,
    isOwner: Boolean(username && currentUser === username),
  };

  return (
    <div className="flex flex-col">
      <div className="w-full bg-card">
        <div className="max-w-6xl mx-auto px-4">
          <ProfileCover coverUrl={profile.coverUrl} username={profile.username} />
        </div>

        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <ProfileUserInfo profile={profile} />
            <ProfileActions isOwner={profile.isOwner} />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 w-full">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <aside className="w-full md:w-72 shrink-0 md:sticky md:top-[1rem] self-start">
            <ProfileDetailsCard profile={profile} />
          </aside>

          <div className="flex-1 min-w-0">
            <ProfilePostFeed posts={posts} />
          </div>
        </div>
      </div>
    </div>
  );
}

export { ProfilePage };
