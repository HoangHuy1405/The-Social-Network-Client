const BAR_COUNT = 21;

// Generate pseudo-random (but stable) configs for each bar to mimic chaotic audio
const BAR_DATA = Array.from({ length: BAR_COUNT }, (_, i) => {
  // Base delay: makes the wave sweep from left to right.
  // Left bars have run "longer" (more negative delay) than right bars.
  const sweepDelay = (BAR_COUNT - i) * 0.1;
  // Chaotic random offset
  const randomDelay = ((i * 13) % 10) * 0.02;
  const delay = `-${sweepDelay + randomDelay}s`;

  // Randomize duration so they bounce at slightly different speeds
  const duration = `${0.6 + ((i * 7) % 5) * 0.1}s`;

  // Different max bounce height for real audio spectrum feel
  const maxHeight = `${40 + ((i * 11) % 60)}%`;

  return { delay, duration, maxHeight };
});

const AppLoading = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
    <div className="flex items-center gap-[3px]" style={{ height: 48 }}>
      {BAR_DATA.map((bar, i) => (
        <div
          key={`loading-bar-${i}`}
          className="w-1 rounded-full bg-primary"
          style={
            {
              animation: `loading-wave ${bar.duration} ease-in-out infinite alternate`,
              animationDelay: bar.delay,
              height: "10%", // Starting min height
              "--max-height": bar.maxHeight,
            } as React.CSSProperties
          }
        />
      ))}
    </div>

    <style>{`
      @keyframes loading-wave {
        0% { height: 10%; }
        100% { height: var(--max-height, 100%); }
      }
    `}</style>
  </div>
);

export default AppLoading;
