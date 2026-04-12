import { Toaster } from "sonner";

const MessageProvider = () => (
  <Toaster
    position="top-right"
    visibleToasts={3}
    richColors
    closeButton
    toastOptions={{
      duration: 3000,
    }}
  />
);

export default MessageProvider;
