type MediaInputProps = {
  onSelect: (file: File) => void;
  accept?: string;
  disabled?: boolean;
};

type MediaPreviewProps = {
  src: string;
  onClear?: () => void;
  className?: string;
};

type UseMediaStageReturn = {
  stagedFile: File | null;
  previewUrl: string | null;
  isStaging: boolean;
  stageFile: (file: File) => void;
  stageUrl: (url: string) => void;
  stageRemoteUrl: (url: string) => Promise<void>;
  clear: () => void;
};

export type { MediaInputProps, MediaPreviewProps, UseMediaStageReturn };
