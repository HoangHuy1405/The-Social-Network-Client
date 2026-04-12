const BAR_COUNT = 5;

const ANIMATION_DELAYS = ["0s", "0.15s", "0.3s", "0.15s", "0s"];

const AppLoading = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
    <div className="flex items-end gap-1.5" style={{ height: 48 }}>
      {Array.from({ length: BAR_COUNT }, (_, i) => (
        <div
          key={`loading-bar-${i}`}
          className="w-1.5 rounded-full bg-primary"
          style={{
            animation: "loading-wave 0.8s ease-in-out infinite alternate",
            animationDelay: ANIMATION_DELAYS[i],
            height: "20%",
          }}
        />
      ))}
    </div>

    <style>{`
      @keyframes loading-wave {
        0% { height: 20%; }
        100% { height: 100%; }
      }
    `}</style>
  </div>
);

export default AppLoading;
