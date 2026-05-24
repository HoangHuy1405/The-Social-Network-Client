import { DEFAULT_COVER_IMAGES } from "@/constants/post";
import MediaPreviewer from "@/components/shared/MediaPreviewer";
import FileDropzoneInput from "@/components/shared/FileDropzoneInput";
import { useMediaStage } from "@/hooks/useMediaStage";
import { cn } from "@/lib/utils";

type CoverImagePickerProps = {
  onSelect: (url: string) => void;
  onFileChange: (file: File | null) => void;
};

function CoverImagePicker({ onSelect, onFileChange }: CoverImagePickerProps) {
  const { stagedFile, previewUrl, isStaging, stageFile, stageRemoteUrl, clear } = useMediaStage();

  const handleClear = () => {
    clear();
    onSelect("");
    onFileChange(null);
  };

  const handleStageFile = (file: File) => {
    stageFile(file);
    onFileChange(file);
    onSelect(URL.createObjectURL(file));
  };

  const handleStageRemoteUrl = async (url: string) => {
    await stageRemoteUrl(url);
    // Remote preset URLs skip Cloudinary — notify parent with null file
    onFileChange(null);
    onSelect(url);
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-semibold text-foreground">Cover Image</h3>

      {previewUrl ? (
        <MediaPreviewer file={stagedFile} src={previewUrl} onClear={handleClear} aspectRatio="aspect-video" />
      ) : (
        <FileDropzoneInput onSelect={handleStageFile} accept="image/*" />
      )}

      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Recommended</p>
        <div className="grid grid-cols-4 gap-2">
          {DEFAULT_COVER_IMAGES.map((url, i) => (
            <button
              key={i}
              type="button"
              onClick={() => void handleStageRemoteUrl(url)}
              disabled={isStaging}
              className={cn(
                "overflow-hidden rounded-lg border-2 transition-all",
                "hover:scale-105 hover:shadow-md",
                "disabled:cursor-not-allowed disabled:opacity-60",
                previewUrl === url ? "border-primary ring-2 ring-primary/30" : "border-transparent",
              )}
            >
              <div className="relative w-full aspect-video">
                <img src={url} alt={`Default ${i + 1}`} className="object-cover size-full" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CoverImagePicker;
