import type { MediaInputProps } from "@/types/mediaStage";

type FileDropzoneInputProps = MediaInputProps & {
  label?: string;
  hint?: string;
};

export type { FileDropzoneInputProps };
