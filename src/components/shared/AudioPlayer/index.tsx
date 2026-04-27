import { useEffect, useRef, useState, useCallback } from "react";
import WaveSurfer from "wavesurfer.js";
import { Play, Pause, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import AppButton from "@/components/core/AppButton/AppButton";
import { formatTime } from "@/utils/format";

const SPEED_OPTIONS = [0.5, 0.75, 1, 1.25, 1.5, 2] as const;
type PlaybackRate = (typeof SPEED_OPTIONS)[number];

type AudioPlayerProps = {
  src: string;
  onClear?: () => void;
  className?: string;
};

function AudioPlayer({ src, onClear, className }: AudioPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wsRef = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState<PlaybackRate>(1);

  useEffect(() => {
    if (!containerRef.current) return;

    const ws = WaveSurfer.create({
      container: containerRef.current,
      url: src,
      waveColor: "hsl(var(--primary) / 0.3)",
      progressColor: "hsl(var(--primary))",
      height: 72,
      barWidth: 2,
      barGap: 1,
      barRadius: 2,
      interact: true,
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
  }, [src]);

  const togglePlay = useCallback(() => {
    wsRef.current?.playPause();
  }, []);

  const handleSpeedChange = useCallback((rate: PlaybackRate) => {
    setSpeed(rate);
    wsRef.current?.setPlaybackRate(rate);
  }, []);

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div ref={containerRef} className={cn("rounded-lg px-3 py-2 min-h-[72px]", "bg-primary/5 ring-1 ring-primary/30")} />

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

        <div className="flex items-center gap-1.5">
          {SPEED_OPTIONS.map((rate) => (
            <button
              key={rate}
              type="button"
              onClick={() => handleSpeedChange(rate)}
              className={cn(
                "rounded px-1.5 py-0.5 text-[11px] font-medium transition-colors",
                speed === rate ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {rate}x
            </button>
          ))}
        </div>

        {onClear && (
          <AppButton type="button" variant="ghost" size="sm" leadingIcon={<RotateCcw className="size-3.5" />} onClick={onClear}>
            Re-record
          </AppButton>
        )}
      </div>
    </div>
  );
}

export default AudioPlayer;
