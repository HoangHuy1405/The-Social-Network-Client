import { useContext } from "react";
import { LoadingContext } from "@/contexts/LoadingProvider";

export const LOADING_TYPE = {
  OVERLAY: "overlay",
  TOPBAR: "topbar",
} as const;

export type LoadingType = (typeof LOADING_TYPE)[keyof typeof LOADING_TYPE];

type LoadingHookReturn = {
  isLoading: boolean;
  show: () => void;
  hide: () => void;
};

export const useLoading = (type: LoadingType = LOADING_TYPE.OVERLAY): LoadingHookReturn => {
  const ctx = useContext(LoadingContext);
  if (!ctx) throw new Error("useLoading must be used within <LoadingProvider>");

  const slot = type === LOADING_TYPE.TOPBAR ? ctx.bar : ctx.overlay;
  return {
    isLoading: slot.count > 0,
    show: slot.inc,
    hide: slot.dec,
  };
};
