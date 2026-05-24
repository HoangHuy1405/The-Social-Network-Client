import { useEffect, useRef, useState, useCallback } from "react";
import WaveSurfer from "wavesurfer.js";
import { Play, Pause, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import AppButton from "@/components/core/AppButton/AppButton";
import { formatTime } from "@/utils/format";
import { useTheme } from "@/hooks";

const SPEED_OPTIONS = [0.5, 0.75, 1, 1.25, 1.5, 2] as const;
type PlaybackRate = (typeof SPEED_OPTIONS)[number];

type AudioPlayerProps = {
  src: string;
  onClear?: () => void;
  className?: string;
};

function resolveThemeColors(): { wave: string; progress: string; cursor: string } {
  const style = getComputedStyle(document.documentElement);
  const primary = style.getPropertyValue("--primary").trim();
  const muted = style.getPropertyValue("--muted-foreground").trim();
  return {
    // Unplayed bars: use muted-foreground at 55% opacity for light visibility
    wave: muted ? `color-mix(in srgb, ${muted} 55%, transparent)` : "rgba(130,148,166,0.55)",
    // Played bars: full primary color
    progress: primary || "rgb(96,154,104)",
    // Playhead cursor: primary color, fully opaque
    cursor: primary || "rgb(96,154,104)",
  };
}

function AudioPlayer({ src, onClear, className }: AudioPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wsRef = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState<PlaybackRate>(1);
  const { theme } = useTheme();

  useEffect(() => {
    if (!containerRef.current) return;

    // Destroy previous instance before re-creating with new theme colors
    wsRef.current?.destroy();

    const { wave, progress, cursor } = resolveThemeColors();

    const ws = WaveSurfer.create({
      container: containerRef.current,
      url: src,
      waveColor: wave,
      progressColor: progress,
      cursorColor: cursor,
      cursorWidth: 2,
      height: 64,
      barWidth: 2,
      barGap: 2,
      barRadius: 2,
      barHeight: 1,
      minPxPerSec: 1,
      interact: true,
      fillParent: true,
    });

    ws.on("ready", (dur: number) => setDuration(dur));
    ws.on("timeupdate", (time: number) => setCurrentTime(time));
    ws.on("play", () => setIsPlaying(true));
    ws.on("pause", () => setIsPlaying(false));
    ws.on("finish", () => setIsPlaying(false));

    wsRef.current = ws;

    return () => {
      ws.destroy();
      wsRef.current = null;
    };
  // Re-create when src or theme changes so colors update immediately
  }, [src, theme]);

  const togglePlay = useCallback(() => {
    wsRef.current?.playPause();
  }, []);

  const handleSpeedChange = useCallback((rate: PlaybackRate) => {
    setSpeed(rate);
    wsRef.current?.setPlaybackRate(rate);
  }, []);

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {/* Waveform container — flex-1 + w-full ensures 100% parent width */}
      <div
        className={cn(
          "w-full rounded-lg px-3 py-2",
          "bg-muted/60 ring-1 ring-border",
          "transition-all duration-200",
        )}
      >
        <div ref={containerRef} className="w-full" />
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <AppButton
            type="button"
            variant="default"
            size="icon-sm"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause className="size-4" /> : <Play className="size-4" />}
          </AppButton>

          <span className="min-w-[88px] text-xs tabular-nums text-muted-foreground">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>

        <div className="flex items-center gap-1">
          {SPEED_OPTIONS.map((rate) => (
            <button
              key={rate}
              type="button"
              onClick={() => handleSpeedChange(rate)}
              className={cn(
                "rounded px-1.5 py-0.5 text-[11px] font-medium transition-colors",
                speed === rate
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent",
              )}
            >
              {rate}x
            </button>
          ))}
        </div>

        {onClear && (
          <AppButton
            type="button"
            variant="ghost"
            size="sm"
            leadingIcon={<RotateCcw className="size-3.5" />}
            onClick={onClear}
          >
            Re-record
          </AppButton>
        )}
      </div>
    </div>
  );
}

export default AudioPlayer;
