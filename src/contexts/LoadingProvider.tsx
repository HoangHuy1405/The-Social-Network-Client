import { createContext, useCallback, useMemo, type ReactNode } from "react";
import { useTimeout, useCounter } from "usehooks-ts";
import AppLoading from "@/components/core/AppLoading/AppLoading";
import AppTopBarLoading from "@/components/core/AppLoading/AppTopBarLoading";

type LoadingSlot = {
  count: number;
  inc: () => void;
  dec: () => void;
};

export type LoadingContextValue = {
  overlay: LoadingSlot;
  bar: LoadingSlot;
};

export const LoadingContext = createContext<LoadingContextValue | null>(null);

const MAX_LOADING_MS = 30_000;

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const { count: overlayCount, setCount: setOverlay, increment: incOverlay } = useCounter(0);
  const { count: barCount, setCount: setBar, increment: incBar } = useCounter(0);

  const decOverlay = useCallback(() => setOverlay((prev) => Math.max(0, prev - 1)), [setOverlay]);
  const decBar = useCallback(() => setBar((prev) => Math.max(0, prev - 1)), [setBar]);

  useTimeout(() => setOverlay(0), overlayCount > 0 ? MAX_LOADING_MS : null);
  useTimeout(() => setBar(0), barCount > 0 ? MAX_LOADING_MS : null);

  const value = useMemo(
    () => ({
      overlay: { count: overlayCount, inc: incOverlay, dec: decOverlay },
      bar: { count: barCount, inc: incBar, dec: decBar },
    }),
    [overlayCount, barCount, incOverlay, decOverlay, incBar, decBar],
  );

  return (
    <LoadingContext.Provider value={value}>
      {barCount > 0 && <AppTopBarLoading />}
      {children}
      {overlayCount > 0 && <AppLoading />}
    </LoadingContext.Provider>
  );
};
