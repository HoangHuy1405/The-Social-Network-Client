import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const AppTopBarLoading = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev;
        const remaining = 90 - prev;
        return prev + remaining * 0.08;
      });
    }, 200);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-[3px]">
      <div className={cn("h-full bg-primary", "transition-[width] duration-200 ease-out")} style={{ width: `${progress}%` }} />
    </div>
  );
};

export default AppTopBarLoading;
