import { Outlet } from "react-router-dom";
import { useToggle } from "usehooks-ts";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppHeader } from "@/components/common/AppHeader";
import AppSidebar from "./components/AppSidebar";

function MainLayout() {
  const [sidebarCollapsed, toggleSidebar] = useToggle(false);
  const [mobileSidebarOpen, , setMobileSidebarOpen] = useToggle(false);

  return (
    <TooltipProvider>
      <div className="flex flex-col h-screen bg-background overflow-hidden">
        <AppHeader onMobileSidebarToggle={() => setMobileSidebarOpen(true)} />

        <div className="flex flex-1 overflow-hidden">
          <AppSidebar
            collapsed={sidebarCollapsed}
            onToggle={toggleSidebar}
            mobileOpen={mobileSidebarOpen}
            onMobileClose={() => setMobileSidebarOpen(false)}
          />

          <main className="flex-1 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}

export default MainLayout;
