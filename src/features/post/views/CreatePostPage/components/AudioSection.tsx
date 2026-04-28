import { useEffect, useRef } from "react";
import { useMediaStage } from "@/hooks/useMediaStage";
import AudioRecorder from "@/components/shared/AudioRecorder";
import AudioPlayer from "@/components/shared/AudioPlayer";
import FileDropzoneInput from "@/components/shared/FileDropzoneInput";

type AudioSectionProps = {
  onChange: (url: string | null) => void;
  onFileChange: (file: File | null) => void;
  initialUrl?: string | null;
};

function AudioSection({ onChange, onFileChange, initialUrl }: AudioSectionProps) {
  const { stagedFile, previewUrl, mediaKind, stageFile, clear } = useMediaStage();

  const initializedRef = useRef(false);
  useEffect(() => {
    if (initializedRef.current || !initialUrl) return;
    initializedRef.current = true;
  }, [initialUrl]);

  useEffect(() => {
    onChange(previewUrl);
    onFileChange(stagedFile);
  }, [previewUrl, stagedFile, onChange, onFileChange]);

  const displayUrl = previewUrl ?? initialUrl ?? null;
  const showPlayer = displayUrl !== null && (mediaKind === "audio" || initialUrl);

  const handleClear = () => {
    clear();
    onChange(null);
    onFileChange(null);
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-semibold text-foreground">Audio Recording</h3>

      {showPlayer ? (
        <AudioPlayer src={displayUrl!} onClear={handleClear} />
      ) : (
        <>
          <AudioRecorder onRecorded={stageFile} enableSpacebarShortcut={true} />

          <FileDropzoneInput
            onSelect={stageFile}
            accept="audio/*"
            label="Drag & drop an audio file here"
            hint="MP3, WAV, OGG, WEBM · max 50 MB"
          />
        </>
      )}
    </div>
  );
}

export default AudioSection;
