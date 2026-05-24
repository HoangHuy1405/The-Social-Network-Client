// import { useEffect, useRef } from "react";
// import { useIsFetching, useIsMutating } from "@tanstack/react-query";
// import { useLoading, LOADING_TYPE } from "@/hooks/useLoading";

// function GlobalLoadingBridge() {
//   const isFetching = useIsFetching();
//   const isMutating = useIsMutating();

//   const { show: showTopbar, hide: hideTopbar } = useLoading(LOADING_TYPE.TOPBAR);
//   const { show: showOverlay, hide: hideOverlay } = useLoading(LOADING_TYPE.OVERLAY);

//   const prevFetchingRef = useRef<number | null>(null);
//   const prevMutatingRef = useRef<number | null>(null);

//   // Handle Fetching -> TOPBAR
//   useEffect(() => {
//     const wasFetching = (prevFetchingRef.current || 0) > 0;
//     const isNowFetching = isFetching > 0;

//     if (wasFetching !== isNowFetching) {
//       if (isNowFetching) showTopbar();
//       else hideTopbar();
//     }

//     prevFetchingRef.current = isFetching;
//   }, [isFetching, showTopbar, hideTopbar]);

//   // Handle Mutating -> OVERLAY
//   useEffect(() => {
//     const wasMutating = (prevMutatingRef.current || 0) > 0;
//     const isNowMutating = isMutating > 0;

//     if (wasMutating !== isNowMutating) {
//       if (isNowMutating) showOverlay();
//       else hideOverlay();
//     }

//     prevMutatingRef.current = isMutating;
//   }, [isMutating, showOverlay, hideOverlay]);

//   return null;
// }

// export { GlobalLoadingBridge };
