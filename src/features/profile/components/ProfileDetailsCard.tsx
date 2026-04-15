import { Users, Heart, Headphones, MapPin, CalendarDays, Link as LinkIcon, Music, FileText } from "lucide-react";
import { AppCard } from "@/components/core/AppCard";
import type { ProfileData, ProfileDetailItem } from "../types";

type ProfileDetailsCardProps = {
  profile: ProfileData;
};

const buildDetailItems = (profile: ProfileData): ProfileDetailItem[] => [
  {
    key: "followers",
    icon: Users,
    label: "Followers",
    value: `${profile.followers.toLocaleString()} · ${profile.following} Following`,
  },
  { key: "likes", icon: Heart, label: "Likes", value: profile.likes.toLocaleString() },
  { key: "listens", icon: Headphones, label: "Listen time", value: profile.totalListenTime },
  ...(profile.location ? [{ key: "location", icon: MapPin, label: "Location", value: profile.location }] : []),
  { key: "joined", icon: CalendarDays, label: "Joined", value: profile.joinedAt },
  ...(profile.websiteUrl
    ? [{ key: "website", icon: LinkIcon, label: "Website", value: profile.websiteUrl, isLink: true }]
    : []),
  ...(profile.specialty ? [{ key: "specialty", icon: Music, label: "Specialty", value: profile.specialty }] : []),
  { key: "posts", icon: FileText, label: "Posts", value: `${profile.totalPosts} posts` },
];

function ProfileDetailsCard({ profile }: ProfileDetailsCardProps) {
  const items = buildDetailItems(profile);

  return (
    <AppCard radius="lg">
      <ul className="flex flex-col gap-3">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.key} className="flex items-start gap-3">
              <Icon className="size-4 text-muted-foreground shrink-0 mt-0.5" />
              <div className="flex flex-col min-w-0">
                <span className="text-xs text-muted-foreground">{item.label}</span>
                {item.isLink ? (
                  <a
                    href={`https://${item.value}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary font-medium hover:underline truncate"
                  >
                    {item.value}
                  </a>
                ) : (
                  <span className="text-sm font-medium text-foreground">{item.value}</span>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </AppCard>
  );
}

export default ProfileDetailsCard;
