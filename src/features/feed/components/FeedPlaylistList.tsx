import FeedSidebarSection from "./FeedSidebarSection";
import { mockPlaylists } from "../mocks";

function FeedPlaylistList() {
  return (
    <FeedSidebarSection title="Featured Playlists" actionLabel="See all">
      <div className="flex flex-col gap-3">
        {mockPlaylists.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 cursor-pointer
              group transition-colors"
          >
            <div
              className="flex size-10 shrink-0 items-center justify-center
                rounded-lg bg-muted text-lg"
            >
              {item.thumbnailFallback}
            </div>

            <div className="flex-1 min-w-0">
              <p
                className="text-sm font-semibold text-foreground
                  group-hover:text-primary transition-colors truncate"
              >
                {item.title}
              </p>
              <p className="text-[11px] text-muted-foreground">{item.trackCount} tracks</p>
            </div>
          </div>
        ))}
      </div>
    </FeedSidebarSection>
  );
}

export default FeedPlaylistList;
