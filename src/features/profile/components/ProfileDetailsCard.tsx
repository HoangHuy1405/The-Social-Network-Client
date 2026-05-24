import React from "react";
import { Users, MapPin, CalendarDays, User } from "lucide-react";
import { AppCard } from "@/components/core/AppCard";
import type { ProfileData, ProfileDetailItem } from "../types";
import { formatJoinedDate } from "@/utils/format";
import { getPlatformIcon } from "@/utils/social";

type ProfileDetailsCardProps = {
  profile: ProfileData;
};

const buildDetailItems = (profile: ProfileData): ProfileDetailItem[] => {
  const items: ProfileDetailItem[] = [
    {
      key: "followers",
      icon: Users,
      label: "Connections",
      value: `${profile.followersCount.toLocaleString()} Followers · ${profile.followingCount.toLocaleString()} Following`,
    },
  ];

  if (profile.gender) {
    items.push({ key: "gender", icon: User, label: "Gender", value: profile.gender });
  }

  if (profile.location) {
    items.push({ key: "location", icon: MapPin, label: "Location", value: profile.location });
  }

  if (profile.createdAt) {
    items.push({ key: "joined", icon: CalendarDays, label: "Joined", value: formatJoinedDate(profile.createdAt) });
  }

  if (profile.socialLinks && profile.socialLinks.length > 0) {
    profile.socialLinks.forEach((link, idx) => {
      items.push({
        key: `social-${idx}`,
        icon: getPlatformIcon(link),
        label: "Social Link",
        value: link,
        isLink: true,
      });
    });
  }

  return items;
};

function ProfileDetailsCard({ profile }: ProfileDetailsCardProps) {
  const items = buildDetailItems(profile);

  return (
    <AppCard radius="lg">
      <ul className="flex flex-col gap-3">
        {items.map((item) => {
          const Icon = item.icon as any;
          return (
            <li key={item.key} className="flex items-start gap-3 overflow-hidden">
              {React.isValidElement(Icon) ? (
                <div className="text-muted-foreground shrink-0 mt-0.5 flex items-center justify-center">{Icon}</div>
              ) : (
                <Icon className="size-4 text-muted-foreground shrink-0 mt-0.5" />
              )}
              <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
                <span className="text-xs text-muted-foreground">{item.label}</span>
                {item.isLink ? (
                  <a
                    href={item.value.startsWith("http") ? item.value : `https://${item.value}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary font-medium hover:underline truncate block"
                  >
                    {item.value}
                  </a>
                ) : (
                  <span className="text-sm font-medium text-foreground truncate block">{item.value}</span>
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
