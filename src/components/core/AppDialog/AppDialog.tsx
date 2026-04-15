import type { CSSProperties } from "react";
import { Dialog, DialogTrigger, DialogPortal, DialogOverlay, DialogClose } from "@/components/ui/dialog";
import { Dialog as DialogPrimitive } from "radix-ui";
import { AppButton } from "@/components/core/AppButton";
import { XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AppDialogProps } from "./types";

const DEFAULT_WIDTH = 480;

function AppDialog({
  open,
  onOpenChange,
  defaultOpen,
  modal,
  children,
  trigger,
  showCloseButton = true,
  width = DEFAULT_WIDTH,
  height,
  className,
  overlayClassName,
  container,
  onOpenAutoFocus,
  onCloseAutoFocus,
  onEscapeKeyDown,
  onPointerDownOutside,
  onInteractOutside,
}: AppDialogProps) {
  const inlineStyle: CSSProperties = {
    ...(width !== undefined && { width }),
    ...(height !== undefined && { height }),
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} defaultOpen={defaultOpen} modal={modal}>
      {trigger !== undefined && <DialogTrigger asChild>{trigger}</DialogTrigger>}

      <DialogPortal container={container}>
        <DialogOverlay className={cn("bg-black/40", overlayClassName)} />

        <DialogPrimitive.Content
          data-slot="dialog-content"
          style={inlineStyle}
          onOpenAutoFocus={onOpenAutoFocus}
          onCloseAutoFocus={onCloseAutoFocus}
          onEscapeKeyDown={onEscapeKeyDown}
          onPointerDownOutside={onPointerDownOutside}
          onInteractOutside={onInteractOutside}
          className={cn(
            "fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
            "flex flex-col gap-4 p-4 text-sm",
            "max-w-[calc(100%-2rem)]",
            "bg-card text-card-foreground rounded-xl ring-1 ring-foreground/10",
            "duration-100 outline-none",
            "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95",
            "data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            className,
          )}
        >
          {children}

          {showCloseButton && (
            <DialogClose asChild>
              <AppButton variant="ghost" size="icon-sm" className="absolute top-2 right-2">
                <XIcon />
                <span className="sr-only">Close</span>
              </AppButton>
            </DialogClose>
          )}
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}

export default AppDialog;
