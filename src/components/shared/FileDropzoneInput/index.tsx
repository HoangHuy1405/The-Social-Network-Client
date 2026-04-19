import { useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FileDropzoneInputProps } from "./types";

function FileDropzoneInput({
  onSelect,
  accept = "image/*",
  disabled = false,
  label = "Drag & drop a file here",
  hint = "or click to browse files",
}: FileDropzoneInputProps) {
  const onDrop = useCallback(
    (accepted: File[]) => {
      const file = accepted[0];
      if (file) onSelect(file);
    },
    [onSelect],
  );

  const acceptMap = useMemo(() => {
    const entries = accept.split(",").map((mime) => mime.trim());
    return Object.fromEntries(entries.map((mime) => [mime, []]));
  }, [accept]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptMap,
    maxFiles: 1,
    disabled,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "flex flex-col items-center justify-center gap-3",
        "border-2 border-dashed rounded-xl py-10 px-6",
        "transition-colors duration-200 cursor-pointer",
        isDragActive ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground",
        disabled && "opacity-50 cursor-not-allowed",
      )}
    >
      <input {...getInputProps()} />
      <div className="size-12 rounded-full bg-muted flex items-center justify-center">
        <Upload className="size-5 text-muted-foreground" />
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground mt-1">{hint}</p>
      </div>
    </div>
  );
}

export default FileDropzoneInput;
