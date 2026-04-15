import type { ReactNode, CSSProperties, ComponentPropsWithoutRef } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

export type AppDialogProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  modal?: boolean;
  children: ReactNode;
  trigger?: ReactNode;
  showCloseButton?: boolean;
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  className?: string;
  overlayClassName?: string;

  /** Portal container to mount into, defaults to document.body */
  container?: ComponentPropsWithoutRef<typeof DialogPrimitive.Portal>["container"];

  onOpenAutoFocus?: ComponentPropsWithoutRef<typeof DialogPrimitive.Content>["onOpenAutoFocus"];
  onCloseAutoFocus?: ComponentPropsWithoutRef<typeof DialogPrimitive.Content>["onCloseAutoFocus"];
  onEscapeKeyDown?: ComponentPropsWithoutRef<typeof DialogPrimitive.Content>["onEscapeKeyDown"];
  onPointerDownOutside?: ComponentPropsWithoutRef<typeof DialogPrimitive.Content>["onPointerDownOutside"];
  onInteractOutside?: ComponentPropsWithoutRef<typeof DialogPrimitive.Content>["onInteractOutside"];
};
