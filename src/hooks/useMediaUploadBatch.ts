import { useMutation } from "@tanstack/react-query";
import { getSignature, uploadToCloudinary } from "@/api/mediaApi";
import { useLoading, LOADING_TYPE } from "@/hooks/useLoading";
import type { UploadBatchParams, UploadBatchResult, CloudinaryUploadedItem, CloudinaryUploadResult } from "@/types/media";

// Sign once → upload all files in parallel → return lightweight results for POST /posts payload
const executeBatchUpload = async ({ items }: UploadBatchParams): Promise<UploadBatchResult> => {
  const signatureData = await getSignature();

  const settled = await Promise.allSettled(items.map(({ file }) => uploadToCloudinary(file, signatureData)));

  // Pair each result with its original item; drop failed uploads
  const successful: CloudinaryUploadedItem[] = settled
    .map((result, i) => ({ result, item: items[i] }))
    .filter(({ result }) => result.status === "fulfilled")
    .map(({ result, item }) => ({
      url: (result as PromiseFulfilledResult<CloudinaryUploadResult>).value.secure_url,
      publicId: (result as PromiseFulfilledResult<CloudinaryUploadResult>).value.public_id,
      mediaType: item.mediaType,
    }));

  if (successful.length === 0) {
    throw new Error("All file uploads failed.");
  }

  return successful;
};

export const useMediaUploadBatch = () => {
  const { show: showLoading, hide: hideLoading } = useLoading(LOADING_TYPE.TOPBAR);

  return useMutation<UploadBatchResult, Error, UploadBatchParams>({
    mutationFn: executeBatchUpload,
    onMutate: () => showLoading(),
    onSettled: () => hideLoading(),
  });
};
