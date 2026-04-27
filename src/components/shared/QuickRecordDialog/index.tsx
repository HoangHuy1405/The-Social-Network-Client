import { useRef, useState } from "react";
import { Mic, Upload, ExternalLink, Check, Music, Podcast } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AppDialog } from "@/components/core/AppDialog";
import { AppAvatar } from "@/components/core/AppAvatar";
import { AppButton } from "@/components/core/AppButton";
import { AppInput } from "@/components/core/AppInput";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/store";
import { ROUTE_PATHS } from "@/constants/routes";
import { QUICK_POST_CATEGORIES, POST_CATEGORIES } from "@/constants/post";
import { useMediaStage } from "@/hooks/useMediaStage";
import { useMediaUpload } from "@/hooks/useMediaUpload";
import AudioRecorder from "@/components/shared/AudioRecorder";
import AudioPlayer from "@/components/shared/AudioPlayer";
import type { PostCategory } from "@/types/post";

type QuickRecordDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function QuickRecordDialog({ open, onOpenChange }: QuickRecordDialogProps) {
  const navigate = useNavigate();
  const { displayName, username } = useAppSelector((state) => state.auth);
  const [postCategory, setPostCategory] = useState<PostCategory>("voicenote");
  const [title, setTitle] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { stagedFile, previewUrl, mediaKind, clear, stageFile } = useMediaStage();
  const { mutate: upload, isPending } = useMediaUpload();

  const handleClose = (nextOpen: boolean) => {
    if (!nextOpen) clear();
    onOpenChange(nextOpen);
  };

  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) stageFile(file);
    // reset so same file can be re-selected
    e.target.value = "";
  };

  const handlePost = () => {
    if (!stagedFile) return;
    upload(
      { file: stagedFile, mediaType: "AUDIO", context: "FEED" },
      {
        onSuccess: () => {
          clear();
          onOpenChange(false);
          navigate(ROUTE_PATHS.CREATE_POST);
        },
      },
    );
  };

  const handleSwitchToEditor = () => {
    onOpenChange(false);
    navigate(ROUTE_PATHS.CREATE_POST);
  };

  const typeIcons = { mic: Mic, music: Music, podcast: Podcast } as const;

  return (
    <AppDialog open={open} onOpenChange={handleClose} width={600}>
      <div className="flex items-center gap-3">
        <AppAvatar size="lg" />
        <div className="flex flex-col">
          <span className="text-sm font-semibold leading-tight">{displayName || "User"}</span>
          <span className="text-xs text-muted-foreground">@{username || "username"}</span>
        </div>
      </div>

      <div className="pt-2">
        <AppInput
          as="textarea"
          variant="filled"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What's on your mind? (Title/Description)"
          className="min-h-[160px] text-sm"
          fullWidth
        />
      </div>

      {/* Waveform area: recorder until something is staged, then player */}
      {mediaKind !== "audio" ? (
        <AudioRecorder onRecorded={stageFile} enableSpacebarShortcut={false} />
      ) : (
        <AudioPlayer src={previewUrl!} onClear={clear} />
      )}

      <div className="flex items-center gap-3">
        <input ref={fileInputRef} type="file" accept="audio/*" className="hidden" onChange={handleUploadFile} />
        <AppButton
          variant="ghost"
          size="sm"
          leadingIcon={<Upload className="size-4" />}
          onClick={() => fileInputRef.current?.click()}
        >
          Upload file
        </AppButton>
      </div>

      <div className="flex items-center gap-2">
        {QUICK_POST_CATEGORIES.map((category) => {
          const config = POST_CATEGORIES[category];
          const Icon = typeIcons[config.iconKey as keyof typeof typeIcons] ?? Mic;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setPostCategory(category)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5",
                "text-xs font-medium transition-colors duration-200 cursor-pointer",
                postCategory === category ? config.className : "bg-muted text-muted-foreground hover:bg-muted/80",
              )}
            >
              <Icon className="size-3.5" />
              {config.label}
              {postCategory === category && <Check className="size-3" />}
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between border-t border-border pt-3">
        <AppButton variant="ghost" size="sm" onClick={handleSwitchToEditor} trailingIcon={<ExternalLink className="size-4" />}>
          Switch To Editor
        </AppButton>
        <AppButton variant="default" size="sm" disabled={!stagedFile || isPending} onClick={handlePost}>
          {isPending ? "Posting…" : "Post"}
        </AppButton>
      </div>
    </AppDialog>
  );
}

export default QuickRecordDialog;
export { QuickRecordDialog };
