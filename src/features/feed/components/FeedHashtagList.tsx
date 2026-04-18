import { Hash } from "lucide-react";
import FeedSidebarSection from "./FeedSidebarSection";
import { mockHashtags } from "../mocks";

function FeedHashtagList() {
  return (
    <FeedSidebarSection title="Trending Hashtags" actionLabel="All">
      <div className="flex flex-col gap-2.5">
        {mockHashtags.map((item, index) => (
          <div
            key={item.tag}
            className="flex items-center gap-2.5 cursor-pointer
              group transition-colors"
          >
            <Hash className="size-4 text-muted-foreground shrink-0" />

            <div className="flex-1 min-w-0">
              <p
                className="text-sm font-semibold text-foreground
                  group-hover:text-primary transition-colors truncate"
              >
                {item.tag}
              </p>
              <p className="text-[11px] text-muted-foreground">{item.postCount}</p>
            </div>

            <span className="text-xs text-muted-foreground/60 font-medium">#{index + 1}</span>
          </div>
        ))}
      </div>
    </FeedSidebarSection>
  );
}

export default FeedHashtagList;
