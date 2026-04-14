import { Mic, Upload } from "lucide-react";
import { AppCard } from "@/components/common/AppCard";
import { AppButton } from "@/components/common/AppButton";
import { AppAvatar } from "@/components/common/AppAvatar";
import { AppInput } from "@/components/common/AppInput";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/useIsMobile";

function FeedCreatePostCard() {
  const isMobile = useIsMobile();

  return (
    <AppCard radius="lg" className={`gap-0 py-0${isMobile ? " rounded-none" : ""}`}>
      <div className="flex items-center gap-3 pt-4 pb-3">
        <AppAvatar size="lg" />
        <AppInput variant="filled" placeholder="Share your audio today..." fullWidth readOnly className="cursor-pointer" />
      </div>

      <Separator />

      <div className="flex gap-3 py-3">
        <AppButton variant="default" className="flex-1" leadingIcon={<Mic className="size-4" />}>
          Record now
        </AppButton>
        <AppButton variant="outline" className="flex-1" leadingIcon={<Upload className="size-4" />}>
          Upload audio file
        </AppButton>
      </div>
    </AppCard>
  );
}

export default FeedCreatePostCard;
