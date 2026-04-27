import { useState } from "react";
import { Mic, Upload, ExternalLink, Check, Music, Podcast } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AppDialog } from "@/components/core/AppDialog";
import { AppAvatar } from "@/components/core/AppAvatar";
import { AppButton } from "@/components/core/AppButton";
import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { setDraft } from "@/store/postDraftSlice";
import { ROUTE_PATHS } from "@/constants/routes";
import { QUICK_POST_CATEGORIES, POST_CATEGORIES } from "@/constants/post";
import type { PostCategory } from "@/types/post";

type QuickRecordDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function QuickRecordDialog({ open, onOpenChange }: QuickRecordDialogProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [postCategory, setPostCategory] = useState<PostCategory>("voicenote");
  const [title, setTitle] = useState("");

  const handleSwitchToEditor = () => {
    dispatch(
      setDraft({
        title,
        category: postCategory,
        // audioBlobUrl would be set here if we had an actual recording blob implemented
      }),
    );
    onOpenChange(false);
    navigate(ROUTE_PATHS.CREATE_POST);
  };

  return (
    <AppDialog open={open} onOpenChange={onOpenChange} width={520}>
      <div className="flex items-center gap-3">
        <AppAvatar size="lg" />
        <div className="flex flex-col">
          <span className="text-sm font-semibold leading-tight">Bảo Trân</span>
          <span className="text-xs text-muted-foreground">@baotran</span>
        </div>
      </div>

      <div
        className={cn(
          "min-h-20 rounded-lg p-3",
          "bg-input-background text-foreground",
          "ring-1 ring-foreground/10",
          "focus-within:ring-primary/40",
          "transition-shadow duration-200",
        )}
      >
        <textarea
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What's on your mind? (Title/Description)"
          className={cn(
            "w-full resize-none bg-transparent outline-none",
            "placeholder:text-muted-foreground text-sm",
            "min-h-16",
          )}
        />
      </div>

      <div
        className={cn(
          "flex items-center justify-center rounded-lg p-4",
          "bg-input-background ring-1 ring-foreground/10",
          "min-h-16",
        )}
      >
        <div className="flex w-full items-center justify-center gap-px">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="w-0.5 rounded-full bg-muted-foreground/40"
              style={{ height: `${Math.random() * 20 + 4}px` }}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <AppButton variant="default" size="sm" leadingIcon={<Mic className="size-4" />}>
          Hold to record
        </AppButton>
        <AppButton variant="ghost" size="sm" leadingIcon={<Upload className="size-4" />}>
          Upload file
        </AppButton>
      </div>

      <div className="flex items-center gap-2">
        {QUICK_POST_CATEGORIES.map((category) => {
          const config = POST_CATEGORIES[category];
          const typeIcons = {
            mic: Mic,
            music: Music,
            podcast: Podcast,
          };
          const Icon = typeIcons[config.iconKey] || Mic;

          return (
            <button
              key={category}
              type="button"
              onClick={() => setPostCategory(category)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5",
                "text-xs font-medium transition-colors duration-200",
                "cursor-pointer",
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
        <AppButton variant="default" size="sm">
          Post
        </AppButton>
      </div>
    </AppDialog>
  );
}

export default QuickRecordDialog;
