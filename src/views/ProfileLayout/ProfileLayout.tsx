import { Outlet } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppHeader } from "@/components/core/AppHeader";

function ProfileLayout() {
  return (
    <TooltipProvider>
      <div className="flex flex-col h-screen bg-background overflow-hidden">
        <AppHeader />

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </TooltipProvider>
  );
}

export { ProfileLayout };
