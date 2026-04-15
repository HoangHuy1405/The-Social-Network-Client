import type { Mic } from "lucide-react";

export type PostType = "quick-record" | "podcast" | "lecture";

export type PostTypeConfig = {
  key: PostType;
  label: string;
  icon: typeof Mic;
  activeClassName: string;
};
