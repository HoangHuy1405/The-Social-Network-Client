import { useMediaQuery } from "usehooks-ts";

const MOBILE_BREAKPOINT = "(max-width: 767px)";

export function useIsMobile(): boolean {
  return useMediaQuery(MOBILE_BREAKPOINT);
}
