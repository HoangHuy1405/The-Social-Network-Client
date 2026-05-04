import { Toaster } from "sonner";

function AppToaster() {
  return (
    <Toaster
      position="top-center"
      visibleToasts={3}
      closeButton
      toastOptions={{
        duration: 3000,
        classNames: {
          toast: ["!bg-card !text-card-foreground", "!border !border-border", "!shadow-popup"].join(" "),
          title: "!text-card-foreground !font-semibold",
          description: "!text-muted-foreground",
          closeButton: ["!bg-muted !text-muted-foreground !border-border", "hover:!bg-border/60 hover:!text-foreground"].join(
            " ",
          ),
          success: "!text-primary [&_svg]:!text-primary",
          error: "!text-destructive [&_svg]:!text-destructive",
          warning: "!text-amber-500 [&_svg]:!text-amber-500",
          info: "!text-blue-400 [&_svg]:!text-blue-400",
        },
      }}
    />
  );
}

export default AppToaster;
