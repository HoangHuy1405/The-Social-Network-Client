import axios from "axios";
import http from "@/api";
import { API_ENDPOINTS } from "@/constants/apiEndpoints";
import type {
  CloudinarySignatureResponse,
  CloudinaryUploadResult,
  MediaRegisterPayload,
  MediaRegisterResult,
} from "@/types/media";

const CLOUDINARY_UPLOAD_URL: string = String(import.meta.env.VITE_CLOUDINARY_UPLOAD_URL ?? "https://api.cloudinary.com/v1_1");

export const getSignature = (): Promise<CloudinarySignatureResponse> =>
  http.get<CloudinarySignatureResponse>(API_ENDPOINTS.media.signature);

export const uploadToCloudinary = async (
  file: File,
  signatureData: CloudinarySignatureResponse,
): Promise<CloudinaryUploadResult> => {
  const { cloudName, apiKey, timestamp, signature, folder } = signatureData;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", apiKey);
  formData.append("timestamp", String(timestamp));
  formData.append("signature", signature);
  formData.append("folder", folder);

  const { data } = await axios.post<CloudinaryUploadResult>(`${CLOUDINARY_UPLOAD_URL}/${cloudName}/auto/upload`, formData);

  return data;
};

export const registerMedia = (payload: MediaRegisterPayload): Promise<MediaRegisterResult> =>
  http.post<MediaRegisterResult>(API_ENDPOINTS.media.register, payload);
