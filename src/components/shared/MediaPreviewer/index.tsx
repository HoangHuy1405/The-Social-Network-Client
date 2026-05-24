import ImagePreview from "@/components/shared/ImagePreview";
import type { MediaPreviewerProps } from "./types";

function MediaPreviewer({ file, src, onClear, aspectRatio, className }: MediaPreviewerProps) {
  const isImage = file?.type.startsWith("image/") || /\.(jpe?g|png|gif|webp|svg)$/i.test(src);

  if (isImage) {
    return <ImagePreview src={src} onClear={onClear} aspectRatio={aspectRatio} className={className} />;
  }

  // Audio preview will be added in Phase 5
  // Fallback: generic file info
  return (
    <div className="flex items-center justify-between rounded-lg border border-border p-4">
      <div className="flex flex-col gap-0.5">
        <p className="text-sm font-medium text-foreground">{file?.name ?? "Unknown file"}</p>
        {file && <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>}
      </div>
      <button type="button" onClick={onClear} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
        Remove
      </button>
    </div>
  );
}

export default MediaPreviewer;
