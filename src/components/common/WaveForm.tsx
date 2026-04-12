import { useEffect, useState } from "react";
import { AppLogo } from "@/components/common/AppLogo";

export const WaveForm = () => {
  const [waves, setWaves] = useState<{ id: string; height: number }[]>([]);

  useEffect(() => {
    setWaves(Array.from({ length: 60 }, (_, i) => ({ id: `wave-${i}`, height: Math.random() * 100 })));
    const interval = setInterval(() => {
      setWaves((prev) => {
        const newWaves = [...prev];
        const index = Math.floor(Math.random() * newWaves.length);
        newWaves[index] = { ...newWaves[index], height: Math.random() * 100 };
        return newWaves;
      });
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hidden lg:flex lg:w-[58%] relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="absolute inset-0 flex items-center justify-center px-16">
        <div className="w-full max-w-2xl">
          {/* CSS fade-in instead of framer-motion */}
          <div className="animate-in fade-in duration-700">
            <AppLogo size="xl" className="mb-6" />
            <p className="text-muted-foreground mb-12" style={{ fontSize: "1.125rem", maxWidth: "480px" }}>
              The audio sharing platform where people connect through voice and music.
            </p>
          </div>

          {/* Waveform bars — height driven by inline style + CSS transition */}
          <div className="flex items-end gap-1.5 h-48">
            {waves.map(({ id, height }, i) => {
              let backgroundColor = "var(--secondary)";
              if (i % 3 === 0) backgroundColor = "var(--primary)";
              else if (i % 3 === 1) backgroundColor = "var(--accent)";

              return (
                <div
                  key={id}
                  className="flex-1 rounded-full"
                  style={{
                    height: `${height}%`,
                    backgroundColor,
                    opacity: 0.7,
                    transition: "height 0.3s ease-out",
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Decorative blobs */}
      <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-32 right-32 w-48 h-48 rounded-full bg-accent/10 blur-3xl" />
    </div>
  );
};
