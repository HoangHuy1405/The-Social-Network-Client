import { createContext, useCallback, useMemo, type ReactNode } from "react";
import { useTimeout, useCounter } from "usehooks-ts";
import AppLoading from "@/components/core/AppLoading/AppLoading";

type LoadingContextValue = {
  isLoading: boolean;
  show: () => void;
  hide: () => void;
};

export const LoadingContext = createContext<LoadingContextValue | null>(null);

const MAX_LOADING_MS = 30_000;

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const { count: activeCount, setCount, increment } = useCounter(0);
  const isLoading = activeCount > 0;

  // Auto-cancel and clear timeout cleanly using usehooks-ts
  // The timeout automatically cancels when delay is null (isLoading is false).
  // This completely eliminates the need for useEffect and useRef.
  useTimeout(
    () => {
      setCount(0);
    },
    isLoading ? MAX_LOADING_MS : null,
  );

  const show = useCallback(() => {
    increment();
  }, [increment]);

  const hide = useCallback(() => {
    setCount((prev) => Math.max(0, prev - 1));
  }, [setCount]);

  const value = useMemo(() => ({ isLoading, show, hide }), [isLoading, show, hide]);

  return (
    <LoadingContext.Provider value={value}>
      {children}
      {isLoading && <AppLoading />}
    </LoadingContext.Provider>
  );
};
