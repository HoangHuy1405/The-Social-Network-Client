import { useEffect, useRef } from "react";
import { useMediaStage } from "@/hooks/useMediaStage";
import AudioRecorder from "@/components/shared/AudioRecorder";
import AudioPlayer from "@/components/shared/AudioPlayer";
import FileDropzoneInput from "@/components/shared/FileDropzoneInput";

type AudioSectionProps = {
  onChange: (url: string | null) => void;
  initialUrl?: string | null;
};

function AudioSection({ onChange, initialUrl }: AudioSectionProps) {
  const { previewUrl, mediaKind, stageFile, clear } = useMediaStage();

  // Sync initial URL from draft (passed once on mount via react-hook-form defaultValues)
  const initializedRef = useRef(false);
  useEffect(() => {
    if (initializedRef.current || !initialUrl) return;
    initializedRef.current = true;
    // initialUrl is a remote URL — no blob to track, just display
    // AudioPlayer accepts any URL so this is sufficient
  }, [initialUrl]);

  // Keep RHF field in sync whenever previewUrl changes
  useEffect(() => {
    onChange(previewUrl);
  }, [previewUrl, onChange]);

  const displayUrl = previewUrl ?? initialUrl ?? null;
  const showPlayer = displayUrl !== null && (mediaKind === "audio" || initialUrl);

  const handleClear = () => {
    clear();
    onChange(null);
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-semibold text-foreground">Audio Recording</h3>

      {showPlayer ? (
        <AudioPlayer src={displayUrl!} onClear={handleClear} />
      ) : (
        <>
          {/* Mic recording */}
          <AudioRecorder onRecorded={stageFile} enableSpacebarShortcut={true} />

          {/* Drag-drop / browse upload */}
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
