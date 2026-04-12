import { Outlet } from "react-router-dom";
import { useToggle } from "usehooks-ts";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppHeader from "./components/AppHeader";
import AppSidebar from "./components/AppSidebar";

function MainLayout() {
  const [sidebarCollapsed, toggleSidebar] = useToggle(false);

  return (
    <TooltipProvider>
      <div className="flex flex-col h-screen bg-background overflow-hidden">
        <AppHeader />

        <div className="flex flex-1 overflow-hidden">
          <AppSidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />

          <main className="flex-1 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}

export default MainLayout;
