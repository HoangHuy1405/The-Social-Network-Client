import FeedCreatorList from "./FeedCreatorList";
import FeedHashtagList from "./FeedHashtagList";
import FeedPlaylistList from "./FeedPlaylistList";

function FeedSidebar() {
  return (
    <div
      className="sticky top-0 flex flex-col gap-4
        max-h-screen overflow-y-auto pb-6
        scrollbar-thin scrollbar-thumb-border"
    >
      <FeedCreatorList />
      <FeedHashtagList />
      <FeedPlaylistList />
    </div>
  );
}

export default FeedSidebar;
