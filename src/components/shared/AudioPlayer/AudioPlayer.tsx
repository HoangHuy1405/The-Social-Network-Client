import { useRef, useState, useCallback, useEffect, useMemo } from "react";
import { Play, Pause, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AudioPlayerProps, PlaybackSpeed } from "./types";

const PLAYBACK_SPEEDS: PlaybackSpeed[] = [0.5, 0.75, 1, 1.25, 1.5, 2];
const BAR_COUNT = 80;
const BAR_GAP = 1.5;

function generateWaveformBars(seed: number): number[] {
  let hash = seed;
  return Array.from({ length: BAR_COUNT }, () => {
    hash = (hash * 16807 + 12345) & 0x7fffffff;
    return 0.15 + ((hash % 1000) / 1000) * 0.85;
  });
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function AudioPlayer({ src, duration, commentCount, className }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const waveformRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [speedIndex, setSpeedIndex] = useState(PLAYBACK_SPEEDS.indexOf(1));

  const bars = useMemo(() => generateWaveformBars(src.length + duration), [src, duration]);

  const progress = duration > 0 ? currentTime / duration : 0;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const togglePlayPause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const handleSeek = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = waveformRef.current?.getBoundingClientRect();
      if (!rect) return;

      const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const newTime = ratio * duration;
      setCurrentTime(newTime);
      if (audioRef.current) {
        audioRef.current.currentTime = newTime;
      }
    },
    [duration],
  );

  const cycleSpeed = useCallback(() => {
    const nextIndex = (speedIndex + 1) % PLAYBACK_SPEEDS.length;
    setSpeedIndex(nextIndex);
    if (audioRef.current) {
      audioRef.current.playbackRate = PLAYBACK_SPEEDS[nextIndex];
    }
  }, [speedIndex]);

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <audio ref={audioRef} src={src} preload="metadata" />

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={togglePlayPause}
          className="flex size-9 shrink-0 items-center justify-center
            rounded-full bg-primary/20 text-primary
            transition-colors hover:bg-primary/30"
        >
          {isPlaying ? <Pause className="size-4 fill-current" /> : <Play className="size-4 fill-current ml-0.5" />}
        </button>

        <div
          ref={waveformRef}
          role="slider"
          aria-label="Audio seek"
          aria-valuenow={Math.round(currentTime)}
          aria-valuemin={0}
          aria-valuemax={duration}
          tabIndex={0}
          onClick={handleSeek}
          className="flex flex-1 cursor-pointer items-end
            gap-[1.5px] h-10 select-none"
        >
          {bars.map((height, i) => {
            const barProgress = i / BAR_COUNT;
            const isPlayed = barProgress <= progress;
            return (
              <div
                key={i}
                className={cn(
                  "flex-1 rounded-full transition-colors duration-100",
                  isPlayed ? "bg-primary" : "bg-muted-foreground/25",
                )}
                style={{
                  height: `${height * 100}%`,
                  minWidth: BAR_GAP,
                }}
              />
            );
          })}
        </div>
      </div>

      <div
        className="flex items-center justify-between
        text-xs text-muted-foreground"
      >
        <div className="flex items-center gap-3">
          <span className="font-medium tabular-nums">{formatTime(currentTime)}</span>
          {commentCount !== undefined && commentCount > 0 && (
            <span className="flex items-center gap-1">
              <MessageCircle className="size-3" />
              {commentCount} bình luận
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={cycleSpeed}
            className="rounded px-1.5 py-0.5 font-semibold
              tabular-nums transition-colors
              hover:bg-muted"
          >
            {PLAYBACK_SPEEDS[speedIndex]}x
          </button>
          <span className="font-medium tabular-nums">{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}

export default AudioPlayer;
