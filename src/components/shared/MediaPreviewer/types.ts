type MediaPreviewerProps = {
  file: File | null;
  src: string;
  onClear: () => void;
  aspectRatio?: string;
  className?: string;
};

export type { MediaPreviewerProps };
