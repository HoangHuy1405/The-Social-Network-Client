import { AppCard } from "@/components/core/AppCard";

type AudioSectionProps = {
  audioBlobUrl: string | null;
};

function AudioSection({ audioBlobUrl }: AudioSectionProps) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-semibold text-foreground">Audio Recording</h3>

      {audioBlobUrl ? (
        <div className="flex flex-col gap-4">
          <audio controls src={audioBlobUrl} className="w-full" />

          {/* WaveSurfer Stub Panel */}
          <AppCard variant="muted" className="flex items-center justify-center border border-dashed border-border/60 py-12">
            <p className="text-sm font-medium text-muted-foreground">Advanced audio tools — coming soon</p>
          </AppCard>
        </div>
      ) : (
        <AppCard
          variant="muted"
          className="flex flex-col items-center justify-center border border-dashed border-border/60 py-12"
        >
          <p className="text-sm font-medium text-muted-foreground">No audio recorded yet.</p>
          <p className="mt-1 text-xs text-muted-foreground/70">
            Use the Quick Record dialog or upload an audio file to get started.
          </p>
        </AppCard>
      )}
    </div>
  );
}

export default AudioSection;
