export type AudioPlayerProps = {
  src: string;
  duration: number;
  commentCount?: number;
  className?: string;
};

export type PlaybackSpeed = 0.5 | 0.75 | 1 | 1.25 | 1.5 | 2;
