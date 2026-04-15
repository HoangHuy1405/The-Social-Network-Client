import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AppButton } from "@/components/core/AppButton";
import FeedSidebarSection from "./FeedSidebarSection";
import { mockCreators } from "../mocks";

function FeedCreatorList() {
  return (
    <FeedSidebarSection title="Featured Creators" actionLabel="See all">
      <div className="flex flex-col gap-3">
        {mockCreators.map((creator) => (
          <div key={creator.id} className="flex items-center gap-2.5">
            <Avatar size="default">
              <AvatarImage src={creator.avatarUrl} />
              <AvatarFallback>{creator.name}</AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate leading-tight">{creator.name}</p>
              <p className="text-[11px] text-muted-foreground truncate">
                {creator.followers} · {creator.category}
              </p>
            </div>

            <AppButton variant={creator.isFollowing ? "outline" : "default"} size="xs" className="shrink-0 text-[11px] h-7">
              {creator.isFollowing ? "✓ Following" : "✦ Follow"}
            </AppButton>
          </div>
        ))}
      </div>
    </FeedSidebarSection>
  );
}

export default FeedCreatorList;
