import { useEffect, useRef, useState, useCallback } from "react";
import WaveSurfer from "wavesurfer.js";
import RecordPlugin from "wavesurfer.js/dist/plugins/record.esm.js";
import { Mic, Square } from "lucide-react";
import { cn } from "@/lib/utils";
import { AppButton } from "@/components/core/AppButton";

type AudioRecorderProps = {
  onRecorded: (file: File) => void;
  onError?: (message: string) => void;
  enableSpacebarShortcut?: boolean;
};

function AudioRecorder({ onRecorded, onError, enableSpacebarShortcut = false }: AudioRecorderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wsRef = useRef<WaveSurfer | null>(null);
  const recordRef = useRef<ReturnType<typeof RecordPlugin.create> | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // True on touch/stylus devices — drives hold-to-record vs click-to-toggle
  const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

  const startRecording = useCallback(async () => {
    if (!recordRef.current || isRecording) return;
    try {
      await recordRef.current.startRecording();
      setIsRecording(true);
    } catch {
      onError?.("Microphone access denied. Please allow microphone permission.");
    }
  }, [isRecording, onError]);

  const stopRecording = useCallback(() => {
    if (!recordRef.current || !isRecording) return;
    recordRef.current.stopRecording();
    // isRecording set to false inside record-end handler
  }, [isRecording]);

  // Wire up WaveSurfer + RecordPlugin once on mount
  useEffect(() => {
    if (!containerRef.current) return;

    const ws = WaveSurfer.create({
      container: containerRef.current,
      waveColor: "var(--color-primary, hsl(var(--primary)))",
      progressColor: "var(--color-primary, hsl(var(--primary)))",
      height: 56,
      barWidth: 2,
      barGap: 1,
      barRadius: 2,
    });

    const record = ws.registerPlugin(RecordPlugin.create({ renderRecordedAudio: false }));

    record.on("record-end", (blob: Blob) => {
      const file = new File([blob], "recording.webm", { type: blob.type });
      onRecorded(file);
      setIsRecording(false);
    });

    wsRef.current = ws;
    recordRef.current = record;
    setIsReady(true);

    return () => {
      ws.destroy();
      wsRef.current = null;
      recordRef.current = null;
    };
    // onRecorded intentionally excluded — stable ref pattern not needed for this lifecycle
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Spacebar shortcut — only active when enableSpacebarShortcut=true
  useEffect(() => {
    if (!enableSpacebarShortcut) return;

    const isTextTarget = (el: EventTarget | null): boolean => {
      if (!(el instanceof HTMLElement)) return false;
      const tag = el.tagName.toLowerCase();
      return tag === "input" || tag === "textarea" || el.isContentEditable;
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code !== "Space" || e.repeat || isTextTarget(e.target)) return;
      e.preventDefault();
      startRecording();
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (e.code !== "Space" || isTextTarget(e.target)) return;
      stopRecording();
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [enableSpacebarShortcut, startRecording, stopRecording]);

  // --- Button event handlers (mobile: hold, desktop: click-to-toggle) ---

  const handlePointerDown = () => {
    if (isTouchDevice) startRecording();
  };

  const handlePointerUp = () => {
    if (isTouchDevice && isRecording) stopRecording();
  };

  const handlePointerLeave = () => {
    if (isTouchDevice && isRecording) stopRecording();
  };

  const handleClick = () => {
    if (isTouchDevice) return; // handled by pointer events
    if (isRecording) stopRecording();
    else startRecording();
  };

  let buttonLabel = "";
  if (isTouchDevice) {
    buttonLabel = isRecording ? "Release to stop" : "Hold to record";
  } else {
    buttonLabel = isRecording ? "Stop recording" : "Start recording";
  }

  return (
    <div className="flex flex-col gap-3">
      <div
        ref={containerRef}
        className={cn(
          "rounded-lg px-3 py-2 min-h-[72px] relative flex items-center justify-center overflow-hidden",
          "bg-input-background ring-1 ring-foreground/10",
          isRecording && "ring-primary/60 bg-primary/5",
          "transition-all duration-200",
        )}
      >
        {!isRecording && (
          <div className="absolute flex flex-col items-center gap-1 text-muted-foreground/60 pointer-events-none">
            <Mic className="size-6" />
            <span className="text-xs font-medium">Ready to record</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <AppButton
          type="button"
          variant={isRecording ? "destructive" : "default"}
          size="sm"
          leadingIcon={isRecording ? <Square className="size-4" /> : <Mic className="size-4" />}
          disabled={!isReady}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerLeave}
          onClick={handleClick}
        >
          {buttonLabel}
        </AppButton>

        {enableSpacebarShortcut && !isTouchDevice && (
          <span className="text-xs text-muted-foreground">
            or hold <kbd className="rounded border border-border px-1.5 py-0.5 font-mono text-[11px]">Space</kbd>
          </span>
        )}
      </div>
    </div>
  );
}

export default AudioRecorder;
