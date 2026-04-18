import type { PostFilterOption } from "../types";

export const POST_FILTER_OPTIONS: { value: PostFilterOption; label: string }[] = [
  { value: "all", label: "All Posts" },
  { value: "music", label: "Music" },
  { value: "podcast", label: "Podcast" },
  { value: "lecture", label: "Lecture" },
  { value: "voicenote", label: "Voice Note" },
];
