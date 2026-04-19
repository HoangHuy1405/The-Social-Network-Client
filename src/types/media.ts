type MediaType = "AVATAR" | "BANNER" | "POST_IMAGE" | "POST_VIDEO" | "AUDIO";

type MediaContext = "PROFILE" | "FEED";

type CloudinarySignatureResponse = {
  signature: string;
  timestamp: number;
  cloudName: string;
  apiKey: string;
  folder: string;
};

type CloudinaryUploadResult = {
  secure_url: string;
  public_id: string;
};

type MediaRegisterPayload = {
  url: string;
  publicId: string;
  mediaType: MediaType;
  context: MediaContext;
};

type MediaRegisterResult = {
  id: string;
  ownerId: string;
  url: string;
  publicId: string;
  mediaType: MediaType;
  context: MediaContext;
  status: string;
  createdAt: string;
};

type UploadMediaParams = {
  file: File;
  mediaType: MediaType;
  context: MediaContext;
};

type UploadMediaResult = {
  url: string;
  publicId: string;
};

export type {
  MediaType,
  MediaContext,
  CloudinarySignatureResponse,
  CloudinaryUploadResult,
  MediaRegisterPayload,
  MediaRegisterResult,
  UploadMediaParams,
  UploadMediaResult,
};
