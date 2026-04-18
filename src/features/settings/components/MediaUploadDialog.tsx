import { useState, useRef, useCallback } from "react";
import { Upload, ImageIcon, X } from "lucide-react";
import AppDialog from "@/components/core/AppDialog/AppDialog";
import { AppButton } from "@/components/core/AppButton";
import { cn } from "@/lib/utils";

type MediaUploadDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  currentUrl?: string;
  defaultImages: string[];
  onSelect: (url: string) => void;
  aspectRatio?: string;
};

function MediaUploadDialog({
  open,
  onOpenChange,
  title,
  currentUrl,
  defaultImages,
  onSelect,
  aspectRatio = "aspect-video",
}: MediaUploadDialogProps) {
  const [preview, setPreview] = useState<string | null>(currentUrl ?? null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile],
  );

  const handleConfirm = () => {
    if (preview) {
      onSelect(preview);
      onOpenChange(false);
    }
  };

  const handleReset = () => {
    setPreview(null);
  };

  return (
    <AppDialog open={open} onOpenChange={onOpenChange} width={560} className="max-h-[85vh] overflow-y-auto">
      <h3 className="text-base font-bold text-foreground pr-8">{title}</h3>

      {preview ? (
        <div className="relative">
          <div className={cn("w-full overflow-hidden rounded-lg border border-border", aspectRatio)}>
            <img src={preview} alt="Preview" className="size-full object-cover" />
          </div>
          <button
            type="button"
            onClick={handleReset}
            className={cn(
              "absolute top-2 right-2 size-8 rounded-full",
              "bg-background/80 backdrop-blur-sm",
              "flex items-center justify-center",
              "hover:bg-background transition-colors",
            )}
          >
            <X className="size-4" />
          </button>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={cn(
            "flex flex-col items-center justify-center gap-3",
            "border-2 border-dashed rounded-xl py-10 px-6",
            "transition-colors duration-200 cursor-pointer",
            isDragging ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground",
          )}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="size-12 rounded-full bg-muted flex items-center justify-center">
            <Upload className="size-5 text-muted-foreground" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-foreground">Drag & drop an image here</p>
            <p className="text-xs text-muted-foreground mt-1">or click to browse files</p>
          </div>
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileInput} />
        </div>
      )}

      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Recommended</p>
        <div className="grid grid-cols-4 gap-2">
          {defaultImages.map((url, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setPreview(url)}
              className={cn(
                "rounded-lg overflow-hidden border-2 transition-all",
                "hover:scale-105 hover:shadow-md",
                preview === url ? "border-primary ring-2 ring-primary/30" : "border-transparent",
              )}
            >
              <div className={cn("w-full", aspectRatio)}>
                <img src={url} alt={`Default ${i + 1}`} className="size-full object-cover" />
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <AppButton variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
          Cancel
        </AppButton>
        <AppButton size="sm" disabled={!preview} onClick={handleConfirm}>
          <ImageIcon className="size-4" />
          Apply
        </AppButton>
      </div>
    </AppDialog>
  );
}

export default MediaUploadDialog;
