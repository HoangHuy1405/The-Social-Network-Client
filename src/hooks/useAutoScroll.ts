import { useEffect } from "react";

export const useAutoScroll = (offset: number = 150, delay: number = 100) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      // Find the main scrollable container in the app layout
      const scrollContainer = document.querySelector("main");
      if (scrollContainer) {
        scrollContainer.scrollTo({ top: offset, behavior: "smooth" });
      } else {
        window.scrollTo({ top: offset, behavior: "smooth" });
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [offset, delay]);
};
