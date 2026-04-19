import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";
import { Outlet } from "react-router-dom";
import { store, persistor } from "@/store";
import MessageProvider from "@/contexts/MessageProvider";
import { ThemeProvider } from "@/contexts/ThemeProvider";
import { LoadingProvider } from "@/components/core/AppLoading";
import { AuthGuard } from "@/router/AuthGuard";
import { GlobalLoadingBridge } from "@/contexts/GlobalLoadingBridge";

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <MessageProvider />
            <LoadingProvider>
              <GlobalLoadingBridge />
              <AuthGuard>
                <Outlet />
              </AuthGuard>
            </LoadingProvider>
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
