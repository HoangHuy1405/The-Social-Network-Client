type MediaType = "AVATAR" | "BANNER" | "COVER" | "POST_IMAGE" | "POST_VIDEO" | "AUDIO";

type MediaContext = "PROFILE" | "POST";

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

// Single-item register payload — used by useMediaUpload (avatar, banner, etc.)
type MediaRegisterPayload = {
  url: string;
  publicId: string;
  mediaType: MediaType;
  context: MediaContext;
};

// --- Batch types (used by useMediaUploadBatch) ---

// Lightweight result per file after Cloudinary upload — passed directly into POST /posts payload
type CloudinaryUploadedItem = {
  url: string;
  publicId: string;
  mediaType: MediaType;
};

// ---

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

// Single-file upload hook params/result
type UploadMediaParams = {
  file: File;
  mediaType: MediaType;
  context: MediaContext;
};

type UploadMediaResult = {
  url: string;
  publicId: string;
};

// One file entry for the batch upload hook
type UploadItem = {
  file: File;
  mediaType: MediaType;
};

// Batch upload hook params/result
type UploadBatchParams = {
  items: UploadItem[];
};

type UploadBatchResult = CloudinaryUploadedItem[];

export type {
  MediaType,
  MediaContext,
  CloudinarySignatureResponse,
  CloudinaryUploadResult,
  CloudinaryUploadedItem,
  MediaRegisterPayload,
  MediaRegisterResult,
  UploadMediaParams,
  UploadMediaResult,
  UploadItem,
  UploadBatchParams,
  UploadBatchResult,
};
