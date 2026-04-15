import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import type { AppImageProps } from "./types";

const BLUR_PX = {
  sm: 4,
  md: 12,
  lg: 16,
  xl: 24,
  "2xl": 40,
  "3xl": 64,
} as const;

function AppImage({
  src,
  alt,
  mode = "auto",
  blurLevel = "lg",
  brightness = 0.5,
  fallbackUrl,
  aspectRatio = "aspect-video",
  className,
  style,
}: AppImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [needsBlur, setNeedsBlur] = useState(mode === "blur");

  const handleError = useCallback(() => {
    if (fallbackUrl && imgSrc !== fallbackUrl) {
      setImgSrc(fallbackUrl);
    }
  }, [fallbackUrl, imgSrc]);

  const handleLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      if (mode === "blur") return;

      const img = e.currentTarget;
      const container = img.parentElement;
      if (!container) return;

      const containerRatio = container.clientWidth / container.clientHeight;
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const fillsContainer = Math.abs(containerRatio - imgRatio) < 0.15;

      setNeedsBlur(!fillsContainer);
    },
    [mode],
  );

  if (!needsBlur) {
    return (
      <div className={cn("relative w-full overflow-hidden", aspectRatio, className)} style={style}>
        <img src={imgSrc} alt={alt} onError={handleError} onLoad={handleLoad} className="size-full object-cover" />
      </div>
    );
  }

  const blurPx = BLUR_PX[blurLevel];

  return (
    <div
      className={cn("relative w-full overflow-hidden flex items-center justify-center", aspectRatio, className)}
      style={style}
    >
      <div
        className="absolute inset-0 scale-110"
        style={{
          backgroundImage: `url(${imgSrc})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: `blur(${blurPx}px) brightness(${brightness})`,
        }}
      />
      <img
        src={imgSrc}
        alt={alt}
        onError={handleError}
        onLoad={handleLoad}
        className="relative z-10 max-h-[85%] max-w-[85%]
          object-contain drop-shadow-2xl"
      />
    </div>
  );
}

export default AppImage;
