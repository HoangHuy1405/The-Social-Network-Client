import { useMutation } from "@tanstack/react-query";
import { getSignature, uploadToCloudinary, registerMedia } from "@/api/mediaApi";
import { useLoading, LOADING_TYPE } from "@/hooks/useLoading";
import type { UploadMediaParams, UploadMediaResult } from "@/types/media";

const executeUpload = async ({ file, mediaType, context }: UploadMediaParams): Promise<UploadMediaResult> => {
  const signatureData = await getSignature();
  const { secure_url, public_id } = await uploadToCloudinary(file, signatureData);
  const registered = await registerMedia({
    url: secure_url,
    publicId: public_id,
    mediaType,
    context,
  });

  return { url: registered.url, publicId: registered.publicId };
};

export const useMediaUpload = () => {
  const { show: showLoading, hide: hideLoading } = useLoading(LOADING_TYPE.TOPBAR);

  return useMutation<UploadMediaResult, Error, UploadMediaParams>({
    mutationFn: executeUpload,
    onMutate: () => showLoading(),
    onSettled: () => hideLoading(),
  });
};
