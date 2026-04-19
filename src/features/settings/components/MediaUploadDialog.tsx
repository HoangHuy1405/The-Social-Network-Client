import { useEffect } from "react";
import { ImageIcon } from "lucide-react";
import AppDialog from "@/components/core/AppDialog/AppDialog";
import { AppButton } from "@/components/core/AppButton";
import FileDropzoneInput from "@/components/shared/FileDropzoneInput";
import MediaPreviewer from "@/components/shared/MediaPreviewer";
import { cn } from "@/lib/utils";
import { useMediaStage } from "@/hooks/useMediaStage";
import { useMediaUpload } from "@/hooks/useMediaUpload";
import { handleApiError } from "@/utils/api";
import type { MediaType, MediaContext } from "@/types/media";

type MediaUploadDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  currentUrl?: string;
  defaultImages: string[];
  onSelect: (url: string) => void;
  onSuccess?: (url: string) => void;
  aspectRatio?: string;
  mediaType: MediaType;
  context: MediaContext;
};

function MediaUploadDialog({
  open,
  onOpenChange,
  title,
  currentUrl,
  defaultImages,
  onSelect,
  onSuccess,
  aspectRatio = "aspect-video",
  mediaType,
  context,
}: MediaUploadDialogProps) {
  const { stagedFile, previewUrl, isStaging, stageFile, stageUrl, stageRemoteUrl, clear } = useMediaStage();
  const { mutate: upload, isPending } = useMediaUpload();

  const isBusy = isPending || isStaging;

  useEffect(() => {
    // stageUrl for currentUrl — it's a known remote URL already on Cloudinary,
    // no need to re-fetch and re-upload it
    if (open && currentUrl) stageUrl(currentUrl);
    if (!open) clear();
  }, [open]);

  const handleConfirm = () => {
    if (!previewUrl) return;

    if (!stagedFile) {
      onSelect(previewUrl);
      onSuccess?.(previewUrl);
      onOpenChange(false);
      return;
    }

    upload(
      { file: stagedFile, mediaType, context },
      {
        onSuccess: ({ url }) => {
          onSelect(url);
          onSuccess?.(url);
          onOpenChange(false);
        },
        onError: (err) => handleApiError(err, "Upload failed. Please try again."),
      },
    );
  };

  return (
    <AppDialog open={open} onOpenChange={onOpenChange} width={560} className="max-h-[85vh] overflow-y-auto">
      <h3 className="text-base font-bold text-foreground pr-8">{title}</h3>

      {previewUrl ? (
        <MediaPreviewer file={stagedFile} src={previewUrl} onClear={clear} aspectRatio={aspectRatio} />
      ) : (
        <FileDropzoneInput onSelect={stageFile} accept="image/*" />
      )}

      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Recommended</p>
        <div className="grid grid-cols-4 gap-2">
          {defaultImages.map((url, i) => (
            <button
              key={i}
              type="button"
              onClick={() => void stageRemoteUrl(url)}
              disabled={isStaging}
              className={cn(
                "rounded-lg overflow-hidden border-2 transition-all",
                "hover:scale-105 hover:shadow-md",
                "disabled:opacity-60 disabled:cursor-not-allowed",
                previewUrl === url ? "border-primary ring-2 ring-primary/30" : "border-transparent",
              )}
            >
              <div className={cn("w-full relative", aspectRatio)}>
                <img src={url} alt={`Default ${i + 1}`} className="size-full object-cover" />
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <AppButton variant="ghost" size="sm" onClick={() => onOpenChange(false)} disabled={isBusy}>
          Cancel
        </AppButton>
        <AppButton size="sm" disabled={!previewUrl || isBusy} onClick={handleConfirm} loading={isBusy}>
          <ImageIcon className="size-4" />
          Apply
        </AppButton>
      </div>
    </AppDialog>
  );
}

export default MediaUploadDialog;
