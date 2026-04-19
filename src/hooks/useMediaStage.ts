import { useState, useRef, useCallback, useEffect } from "react";
import type { UseMediaStageReturn } from "@/types/mediaStage";

/**
 * Manages the temporary "staging area" between the user picking a file and actually uploading it.
 * Responsible for creating Blob URLs for local preview and revoking them when the file changes,
 * is cleared, or the component unmounts — preventing memory leaks from orphaned object URLs.
 *
 * Uses a ref (not state) to track the current blob URL so cleanup callbacks are never stale.
 */
export const useMediaStage = (): UseMediaStageReturn => {
  const [stagedFile, setStagedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isStaging, setIsStaging] = useState(false);
  const blobUrlRef = useRef<string | null>(null);

  const revokePrevious = useCallback(() => {
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
      blobUrlRef.current = null;
    }
  }, []);

  const stageFile = useCallback(
    (file: File) => {
      revokePrevious();
      const url = URL.createObjectURL(file);
      blobUrlRef.current = url;
      setStagedFile(file);
      setPreviewUrl(url);
    },
    [revokePrevious],
  );

  // Remote URL — no blob to track
  const stageUrl = useCallback(
    (url: string) => {
      revokePrevious();
      setStagedFile(null);
      setPreviewUrl(url);
    },
    [revokePrevious],
  );

  // Fetches a remote URL, wraps the blob as a File, then stages it for upload
  const stageRemoteUrl = useCallback(
    async (url: string) => {
      setIsStaging(true);
      try {
        const res = await fetch(url);
        const blob = await res.blob();
        const ext = blob.type.split("/")[1] ?? "png";
        const file = new File([blob], `default.${ext}`, { type: blob.type });
        stageFile(file);
      } finally {
        setIsStaging(false);
      }
    },
    [stageFile],
  );

  const clear = useCallback(() => {
    revokePrevious();
    setStagedFile(null);
    setPreviewUrl(null);
  }, [revokePrevious]);

  useEffect(() => {
    return () => revokePrevious();
  }, [revokePrevious]);

  return { stagedFile, previewUrl, isStaging, stageFile, stageUrl, stageRemoteUrl, clear };
};
