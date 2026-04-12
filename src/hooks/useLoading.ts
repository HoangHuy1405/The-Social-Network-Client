import { useContext } from "react";
import { LoadingContext } from "@/contexts/LoadingProvider";

type LoadingHookReturn = {
  isLoading: boolean;
  show: () => void;
  hide: () => void;
};

export const useLoading = (): LoadingHookReturn => {
  const ctx = useContext(LoadingContext);
  if (!ctx) throw new Error("useLoading must be used within <LoadingProvider>");
  return ctx;
};
