export type AppImageMode = "auto" | "blur" | "cover";

export type AppImageProps = {
  src: string;
  alt: string;

  /** "auto" checks ratio, "blur" forces blur bg, "cover" forces object-cover. */
  mode?: AppImageMode;

  /** Tailwind blur class suffix, e.g. "xl", "2xl", "3xl" */
  blurLevel?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

  /** CSS brightness for the blurred background (0–1 range) */
  brightness?: number;

  /** Fallback image URL if primary src fails to load */
  fallbackUrl?: string;

  /** Aspect ratio class, e.g. "aspect-video", "aspect-square" */
  aspectRatio?: string;

  className?: string;
  style?: React.CSSProperties;
};
