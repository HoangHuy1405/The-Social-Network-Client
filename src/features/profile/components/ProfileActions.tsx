import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Share2, Mic, Copy, Check } from "lucide-react";
import { AppButton } from "@/components/core/AppButton";
import { QuickRecordDialog } from "@/components/shared/QuickRecordDialog";
import AppDialog from "@/components/core/AppDialog/AppDialog";
import { AppInput } from "@/components/core/AppInput";

type ProfileActionsProps = {
  isOwner: boolean;
};

function ProfileActions({ isOwner }: ProfileActionsProps) {
  const navigate = useNavigate();
  const [recordOpen, setRecordOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const currentUrl = window.location.href;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <AppButton size="sm" leadingIcon={<Mic className="size-4" />} onClick={() => setRecordOpen(true)}>
          Record
        </AppButton>

        <AppButton
          variant="outline"
          size="sm"
          className="rounded-full size-9 p-0"
          aria-label="Share profile"
          onClick={() => setShareOpen(true)}
        >
          <Share2 className="size-4" />
        </AppButton>

        {isOwner && (
          <AppButton
            variant="outline"
            size="sm"
            className="rounded-full size-9 p-0"
            aria-label="Edit profile"
            onClick={() => navigate("/settings/profile")}
          >
            <Pencil className="size-4" />
          </AppButton>
        )}
      </div>

      <QuickRecordDialog open={recordOpen} onOpenChange={setRecordOpen} />

      <AppDialog open={shareOpen} onOpenChange={setShareOpen} title="Share Profile" width={480}>
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-foreground">Share this profile</h2>
          <div className="flex items-center gap-2">
            <AppInput value={currentUrl} readOnly fullWidth containerClassName="flex-1" />
            <AppButton variant="secondary" onClick={handleCopy} className="w-24 shrink-0">
              {copied ? (
                <>
                  <Check className="size-4 mr-2" /> Copied
                </>
              ) : (
                <>
                  <Copy className="size-4 mr-2" /> Copy
                </>
              )}
            </AppButton>
          </div>
        </div>
      </AppDialog>
    </>
  );
}

export default ProfileActions;
