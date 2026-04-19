import { useEffect, useRef } from "react";
import { useIsFetching } from "@tanstack/react-query";
import { useLoading, LOADING_TYPE } from "@/hooks/useLoading";

function GlobalLoadingBridge() {
  const isFetching = useIsFetching();
  const { show, hide } = useLoading(LOADING_TYPE.TOPBAR);
  const prevFetchingRef = useRef<number | null>(null);

  useEffect(() => {
    if (prevFetchingRef.current === isFetching) return;
    prevFetchingRef.current = isFetching;

    if (isFetching > 0) show();
    else hide();
  }, [isFetching, show, hide]);

  return null;
}

export { GlobalLoadingBridge };
