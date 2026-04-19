import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ImagePreviewProps } from "./types";

function ImagePreview({ src, onClear, className, aspectRatio = "aspect-video" }: ImagePreviewProps) {
  return (
    <div className={cn("relative", className)}>
      <div className={cn("w-full overflow-hidden rounded-lg border border-border", aspectRatio)}>
        <img src={src} alt="Preview" className="size-full object-cover" />
      </div>
      {onClear && (
        <button
          type="button"
          onClick={onClear}
          className={cn(
            "absolute top-2 right-2 size-8 rounded-full",
            "bg-background/80 backdrop-blur-sm",
            "flex items-center justify-center",
            "hover:bg-background transition-colors",
          )}
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  );
}

export default ImagePreview;
