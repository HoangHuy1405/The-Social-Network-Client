import { useState } from "react";
import { Mic, Upload, Globe, GraduationCap, Music, Check, ChevronDown } from "lucide-react";
import { AppDialog } from "@/components/common/AppDialog";
import { AppAvatar } from "@/components/common/AppAvatar";
import { AppButton } from "@/components/common/AppButton";
import { cn } from "@/lib/utils";
import type { PostType, PostTypeConfig } from "./type";

const POST_TYPE_OPTIONS: PostTypeConfig[] = [
  {
    key: "quick-record",
    label: "Quick Record",
    icon: Mic,
    activeClassName: "bg-primary text-primary-foreground",
  },
  {
    key: "podcast",
    label: "Podcast",
    icon: Music,
    activeClassName: "bg-purple-500/20 text-purple-400",
  },
  {
    key: "lecture",
    label: "Lecture",
    icon: GraduationCap,
    activeClassName: "bg-amber-500/20 text-amber-400",
  },
];

type QuickRecordDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function QuickRecordDialog({ open, onOpenChange }: QuickRecordDialogProps) {
  const [postType, setPostType] = useState<PostType>("quick-record");

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
        {POST_TYPE_OPTIONS.map(({ key, label, icon: Icon, activeClassName }) => (
          <button
            key={key}
            type="button"
            onClick={() => setPostType(key)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5",
              "text-xs font-medium transition-colors duration-200",
              "cursor-pointer",
              postType === key ? activeClassName : "bg-muted text-muted-foreground hover:bg-muted/80",
            )}
          >
            <Icon className="size-3.5" />
            {label}
            {postType === key && <Check className="size-3" />}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-border pt-3">
        <AppButton variant="ghost" size="sm" leadingIcon={<Globe className="size-4" />}>
          Everyone
          <ChevronDown className="size-3.5" />
        </AppButton>
        <AppButton variant="default" size="sm">
          Post
        </AppButton>
      </div>
    </AppDialog>
  );
}

export default QuickRecordDialog;
