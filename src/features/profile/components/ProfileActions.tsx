import { useState } from "react";
import { Pencil, Share2, Mic } from "lucide-react";
import { AppButton } from "@/components/common/AppButton";
import { QuickRecordDialog } from "@/components/common/QuickRecordDialog";

type ProfileActionsProps = {
  isOwner: boolean;
};

function ProfileActions({ isOwner }: ProfileActionsProps) {
  const [recordOpen, setRecordOpen] = useState(false);

  return (
    <>
      <div className="flex items-center gap-2">
        <AppButton size="sm" leadingIcon={<Mic className="size-4" />} onClick={() => setRecordOpen(true)}>
          Record
        </AppButton>

        <AppButton variant="outline" size="sm" className="rounded-full size-9 p-0" aria-label="Share profile">
          <Share2 className="size-4" />
        </AppButton>

        {isOwner && (
          <AppButton variant="outline" size="sm" className="rounded-full size-9 p-0" aria-label="Edit profile">
            <Pencil className="size-4" />
          </AppButton>
        )}
      </div>

      <QuickRecordDialog open={recordOpen} onOpenChange={setRecordOpen} />
    </>
  );
}

export default ProfileActions;
