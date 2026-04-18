import { Outlet, NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { SETTINGS_TABS } from "../constants";

function SettingsLayout() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 w-full">
      <h2 className="text-xl font-bold text-foreground mb-6">Settings</h2>

      <nav className="flex gap-1 border-b border-border mb-8">
        {SETTINGS_TABS.map((tab) => (
          <NavLink
            key={tab.id}
            to={tab.path}
            end
            className={({ isActive }) =>
              cn(
                "px-4 py-2.5 text-sm font-medium transition-colors",
                "relative hover:text-foreground",
                isActive ? "text-primary" : "text-muted-foreground",
              )
            }
          >
            {({ isActive }) => (
              <>
                {tab.label}
                {isActive && <span className={cn("absolute bottom-0 left-0 right-0 h-0.5", "bg-primary rounded-full")} />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="flex flex-col gap-8">
        <Outlet />
      </div>
    </div>
  );
}

export { SettingsLayout };
