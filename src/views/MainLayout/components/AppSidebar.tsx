import { useLocation, useNavigate } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { AppButton } from "@/components/core/AppButton";
import { useAppSelector } from "@/store";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import {
  Menu,
  Home,
  Compass,
  Users,
  Hash,
  Bookmark,
  Mic,
  Upload,
  TrendingUp,
  Music,
  BookOpen,
  Podcast,
  StickyNote,
  Settings,
  X,
} from "lucide-react";
import { AppLogo } from "@/components/core/AppLogo";

type AppSidebarProps = {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
};
type NavItem = {
  label: string;
  icon: LucideIcon;
  path: string;
};
type NavSection = {
  title?: string;
  items: NavItem[];
};

export const SIDEBAR_EXPANDED_WIDTH = 240;
export const SIDEBAR_COLLAPSED_WIDTH = 64;
export const NAV_SECTIONS: NavSection[] = [
  {
    items: [
      { label: "Home", icon: Home, path: "/" },
      { label: "Explore", icon: Compass, path: "/explore" },
      { label: "Following", icon: Users, path: "/following" },
      { label: "Topics", icon: Hash, path: "/topics" },
      { label: "Saved", icon: Bookmark, path: "/saved" },
    ],
  },
  {
    title: "LIBRARY",
    items: [
      { label: "My Recordings", icon: Mic, path: "/library/recordings" },
      { label: "My Uploads", icon: Upload, path: "/library/uploads" },
      { label: "Trending", icon: TrendingUp, path: "/trending" },
    ],
  },
  {
    title: "CATEGORIES",
    items: [
      { label: "Music", icon: Music, path: "/category/music" },
      { label: "Lectures", icon: BookOpen, path: "/category/lecture" },
      { label: "Podcast", icon: Podcast, path: "/category/podcast" },
      { label: "Voice Note", icon: StickyNote, path: "/category/voicenote" },
    ],
  },
  {
    items: [{ label: "Settings", icon: Settings, path: "/settings" }],
  },
];

function NavContent({ collapsed, onItemClick }: { collapsed: boolean; onItemClick: (path: string) => void }) {
  const location = useLocation();
  const { email } = useAppSelector((state) => state.auth);

  return (
    <>
      <nav
        className="flex-1 overflow-y-auto overflow-x-hidden py-3 px-2
          flex flex-col gap-1"
      >
        {NAV_SECTIONS.map((section, sectionIdx) => (
          <div key={sectionIdx}>
            {sectionIdx > 0 && (
              <div className="px-3">
                <Separator className="my-2" />
              </div>
            )}
            {section.title && !collapsed && (
              <p
                className="px-3 pt-1 pb-1 text-xs font-semibold
                  text-muted-foreground tracking-wider truncate"
              >
                {section.title}
              </p>
            )}

            {section.items.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;

              const navButton = (
                <AppButton
                  key={item.path}
                  variant="ghost"
                  onClick={() => onItemClick(item.path)}
                  leadingIcon={
                    <Icon className={cn("size-5 shrink-0", isActive ? "text-sidebar-primary" : "text-muted-foreground")} />
                  }
                  className={cn(
                    "w-full justify-start rounded-md px-3 font-medium transition-colors h-10",
                    isActive
                      ? "bg-sidebar-primary/15 text-sidebar-primary font-bold shadow-sm hover:bg-sidebar-primary/20"
                      : "text-sidebar-foreground",
                  )}
                >
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </AppButton>
              );

              if (collapsed) {
                return (
                  <Tooltip key={item.path} delayDuration={0}>
                    <TooltipTrigger asChild>{navButton}</TooltipTrigger>
                    <TooltipContent side="right" className="text-xs">
                      {item.label}
                    </TooltipContent>
                  </Tooltip>
                );
              }

              return navButton;
            })}
          </div>
        ))}
      </nav>

      {email && (
        <div className="mt-auto p-3 border-t border-sidebar-border">
          {collapsed ? (
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <div className="flex justify-center">
                  <span className="text-xs font-semibold text-muted-foreground cursor-pointer truncate transition-colors hover:text-foreground">
                    @
                  </span>
                </div>
              </TooltipTrigger>
              <TooltipContent side="right" className="text-xs">
                {email}
              </TooltipContent>
            </Tooltip>
          ) : (
            <div className="flex justify-center overflow-hidden">
              <span className="text-sm text-muted-foreground truncate font-semibold">{email}</span>
            </div>
          )}
        </div>
      )}
    </>
  );
}

function AppSidebar({ collapsed, onToggle, mobileOpen, onMobileClose }: AppSidebarProps) {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
    onMobileClose();
  };

  const sidebarWidth = collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_EXPANDED_WIDTH;

  return (
    <>
      {/* Mobile overlay backdrop */}
      {mobileOpen && (
        <button
          aria-label="Close sidebar"
          className="fixed inset-0 z-40 w-full bg-black/50 md:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col bg-sidebar border-r border-sidebar-border",
          "transition-transform duration-300 ease-in-out md:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
        style={{ width: SIDEBAR_EXPANDED_WIDTH }}
      >
        <div className="flex items-center justify-between px-4 h-14 shrink-0 border-b border-sidebar-border">
          <AppLogo />
          <button
            onClick={onMobileClose}
            className="flex size-8 items-center justify-center rounded-full
              text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>
        <NavContent collapsed={false} onItemClick={handleNavigate} />
      </aside>

      {/* Desktop sidebar */}
      <aside
        style={{ width: sidebarWidth }}
        className="relative h-full bg-sidebar border-r border-sidebar-border
          hidden md:flex flex-col transition-[width] duration-300
          ease-in-out shrink-0 z-20"
      >
        <button
          onClick={onToggle}
          className="absolute -right-3.5 top-[16px] z-30 flex size-7 items-center justify-center
            rounded-full border border-sidebar-border bg-sidebar/90 shadow-md backdrop-blur-sm
            text-muted-foreground transition-all hover:bg-sidebar-accent hover:text-sidebar-foreground hover:cursor-pointer"
        >
          <Menu className="size-3.5" />
        </button>

        <NavContent collapsed={collapsed} onItemClick={(path) => navigate(path)} />
      </aside>
    </>
  );
}

export default AppSidebar;
