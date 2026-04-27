import { useState } from "react";
import { Mic, Upload } from "lucide-react";
import { AppCard } from "@/components/core/AppCard";
import { AppButton } from "@/components/core/AppButton";
import { AppAvatar } from "@/components/core/AppAvatar";
import { AppInput } from "@/components/core/AppInput";
import { Separator } from "@/components/ui/separator";
import { QuickRecordDialog } from "@/components/shared/QuickRecordDialog";
import { useIsMobile } from "@/hooks/useIsMobile";
import { showInfoMessage } from "@/hooks/useMessage";
import { checkIsAuthenticated } from "@/utils/auth";

function FeedCreatePostCard() {
  const isMobile = useIsMobile();
  const [dialogOpen, setDialogOpen] = useState(false);

  const isAuth = checkIsAuthenticated();

  return (
    <>
      <AppCard radius="lg" className={`gap-0 py-0${isMobile ? " rounded-none" : ""}`}>
        <div className="flex items-center gap-3 pt-4 pb-3">
          <AppAvatar size="lg" />
          <AppInput
            variant="filled"
            placeholder="Share your audio today..."
            fullWidth
            readOnly
            className="cursor-pointer"
            onClick={() => setDialogOpen(true)}
          />
        </div>

        <Separator />

        <div className="flex gap-3 py-3">
          <AppButton
            variant="default"
            className="flex-1"
            leadingIcon={<Mic className="size-4" />}
            onClick={() => {
              if (isAuth) {
                setDialogOpen(true);
              } else {
                showInfoMessage("Please log in to record a post.");
              }
            }}
          >
            Record now
          </AppButton>
          <AppButton variant="outline" className="flex-1" leadingIcon={<Upload className="size-4" />}>
            Upload audio file
          </AppButton>
        </div>
      </AppCard>

      <QuickRecordDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  );
}

export default FeedCreatePostCard;
