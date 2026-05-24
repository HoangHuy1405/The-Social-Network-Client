import { useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { AppButton } from "@/components/core/AppButton";
import { AppInput } from "@/components/core/AppInput";
import { AppSelect } from "@/components/core/AppSelect";
import { POST_CATEGORIES, POST_VISIBILITY_OPTIONS } from "@/constants/post";
import type { PostCategory, PostVisibility } from "@/types/post";
import type { UploadItem } from "@/types/media";
import type { MediaItem } from "@/features/post/types";
import CoverImagePicker from "./components/CoverImagePicker";
import AudioSection from "./components/AudioSection";
import RichTextEditor from "@/components/shared/RichTextEditor";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "@/constants/routes";
import { Separator } from "@/components/ui/separator";
import { toApiEnum } from "@/utils/api";
import { useMediaUploadBatch } from "@/hooks/useMediaUploadBatch";
import { useCreatePost } from "@/features/post/hooks/useCreatePost";

type CreatePostFormValues = {
  title: string;
  description: string;
  category: PostCategory;
  visibility: PostVisibility;
  // Resolved display URLs (blob or remote) — used for preview only
  audioUrl: string | null;
  coverUrl: string;
};

function CreatePostPage() {
  const navigate = useNavigate();
  const { mutateAsync: uploadMedia, isPending: isUploading } = useMediaUploadBatch();
  const { mutateAsync: publishPost, isPending: isPublishing } = useCreatePost();

  // Raw File refs — populated by child pickers; null when a remote preset URL is used
  const audioFileRef = useRef<File | null>(null);
  const coverFileRef = useRef<File | null>(null);

  // Resolved remote URLs that bypassed Cloudinary (e.g. preset cover images)
  const remoteCoverUrlRef = useRef<string>("");

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<CreatePostFormValues>({
    defaultValues: {
      title: "",
      description: "",
      category: "voicenote",
      visibility: "everyone",
      audioUrl: null,
      coverUrl: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: CreatePostFormValues) => {
    if (!values.title.trim()) return;

    // Collect only locally-staged files that need Cloudinary upload
    const uploadItems: UploadItem[] = [];
    if (audioFileRef.current) uploadItems.push({ file: audioFileRef.current, mediaType: "AUDIO" });
    if (coverFileRef.current) uploadItems.push({ file: coverFileRef.current, mediaType: "POST_IMAGE" });

    // Pre-populate with remote preset URLs that bypass Cloudinary
    const preBuiltMediaItems: MediaItem[] = [];
    if (remoteCoverUrlRef.current) {
      preBuiltMediaItems.push({ url: remoteCoverUrlRef.current, publicId: "", mediaType: "POST_IMAGE" });
    }

    let mediaItems: MediaItem[] = preBuiltMediaItems;

    if (uploadItems.length > 0) {
      const uploaded = await uploadMedia({ items: uploadItems });
      mediaItems = [...preBuiltMediaItems, ...uploaded];
    }

    await publishPost({
      title: values.title,
      description: values.description || undefined,
      category: toApiEnum(values.category) as PostCategory,
      visibility: toApiEnum(values.visibility) as PostVisibility,
      mediaItems: mediaItems.length > 0 ? mediaItems : undefined,
    });
  };

  const categoryOptions = Object.entries(POST_CATEGORIES).map(([key, config]) => ({
    value: key,
    label: config.label,
  }));

  const isSubmitting = isUploading || isPublishing;

  return (
    <div className="mx-auto max-w-3xl p-4 md:p-6 lg:p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <header className="flex items-center justify-between pb-2">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Create Post</h1>
        </header>

        <Separator />

        <section className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-start gap-4">
            <div className="flex-1 min-w-0">
              <Controller
                name="title"
                control={control}
                rules={{ required: "Title is required" }}
                render={({ field, fieldState }) => (
                  <AppInput
                    label="Title"
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="What's this about?"
                    error={fieldState.error?.message}
                    fullWidth
                    required
                  />
                )}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold">Category</label>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <AppSelect
                    value={field.value}
                    onValueChange={field.onChange}
                    options={categoryOptions}
                    placeholder="Select a category"
                  />
                )}
              />
            </div>
          </div>

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold">Description</label>
                <RichTextEditor
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Add details, formatted text, and more..."
                />
              </div>
            )}
          />
        </section>

        <Separator />

        <Controller
          name="coverUrl"
          control={control}
          render={({ field }) => (
            <CoverImagePicker
              onSelect={(url) => {
                // If the URL is a blob, it came from a local file (ref already set by onFileChange)
                // If it's a remote preset, store it separately so it bypasses upload
                if (!url.startsWith("blob:")) remoteCoverUrlRef.current = url;
                else remoteCoverUrlRef.current = "";
                field.onChange(url);
              }}
              onFileChange={(file) => {
                coverFileRef.current = file;
              }}
            />
          )}
        />

        <Separator />

        <Controller
          name="audioUrl"
          control={control}
          render={({ field }) => (
            <AudioSection
              onChange={field.onChange}
              onFileChange={(file) => {
                audioFileRef.current = file;
              }}
              initialUrl={field.value}
            />
          )}
        />

        <Separator />

        <footer className="mt-2 flex items-center justify-between pb-6">
          <div className="w-48">
            <Controller
              name="visibility"
              control={control}
              render={({ field }) => (
                <AppSelect
                  value={field.value}
                  onValueChange={field.onChange}
                  options={POST_VISIBILITY_OPTIONS}
                  placeholder="Who can see this?"
                />
              )}
            />
          </div>

          <div className="flex gap-3 items-center">
            <AppButton variant="ghost" type="button" onClick={() => navigate(ROUTE_PATHS.HOME)}>
              Cancel
            </AppButton>
            <AppButton variant="default" type="submit" disabled={!isValid || isSubmitting} loading={isSubmitting}>
              {isSubmitting ? "Publishing…" : "Publish"}
            </AppButton>
          </div>
        </footer>
      </form>
    </div>
  );
}

export default CreatePostPage;
