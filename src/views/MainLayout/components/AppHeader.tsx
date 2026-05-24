import { useRef } from "react";
import { Search, Bell, MessageCircle, Mic, Upload, Menu } from "lucide-react";
import { AppInput } from "@/components/core/AppInput";
import { useOnClickOutside, useToggle } from "usehooks-ts";
import { useIsMobile } from "@/hooks/useIsMobile";
import { AppButton } from "@/components/core/AppButton";
import { AppAvatar } from "@/components/core/AppAvatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import UserPopup from "./UserPopup";
import { useNavigate, useSearchParams } from "react-router-dom";
import { checkIsAuthenticated } from "@/utils/auth";
import { AppLogo } from "@/components/core/AppLogo";

type AppHeaderProps = {
  onMobileSidebarToggle: () => void;
};

function AppHeader({ onMobileSidebarToggle }: AppHeaderProps) {
  const [popupOpen, togglePopup, setPopupOpen] = useToggle(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const isMobile = useIsMobile();

  const isAuth = checkIsAuthenticated();
  const searchQuery = searchParams.get("search") ?? "";

  useOnClickOutside(popupRef as React.RefObject<HTMLElement>, () => setPopupOpen(false));

  return (
    <header
      className="h-14 flex items-center px-3 md:px-4 gap-2 md:gap-3
        bg-card border-b border-border shrink-0"
    >
      {/* Hamburger — mobile only */}
      {isMobile && (
        <AppButton variant="ghost" size="icon" className="shrink-0 rounded-full size-9" onClick={onMobileSidebarToggle}>
          <Menu className="size-5" />
        </AppButton>
      )}

      {/* Logo — desktop only */}
      {!isMobile && (
        <div className="w-[60px] shrink-0 flex items-center">
          <AppLogo />
        </div>
      )}

      {/* Search bar */}
      <AppInput
        variant="filled"
        placeholder="Search audio, creator, hashtag..."
        prefix={<Search className="size-4 text-muted-foreground" />}
        containerClassName="flex-1 max-w-md mx-auto"
        fullWidth
        value={searchQuery}
        onChange={(e) => {
          const val = e.target.value;
          if (window.location.pathname !== "/") {
            navigate(`/?search=${encodeURIComponent(val)}`);
          } else {
            setSearchParams((prev) => {
              if (val) {
                prev.set("search", val);
              } else {
                prev.delete("search");
              }
              return prev;
            });
          }
        }}
      />

      {/* Action buttons */}
      <div className="flex items-center gap-1 md:gap-2 shrink-0">
        {/* Record & Upload + Notifications — desktop + auth only */}
        {isAuth && !isMobile && (
          <>
            <AppButton size="sm" leadingIcon={<Mic className="size-4" />}>
              Record
            </AppButton>

            <AppButton size="sm" variant="outline" leadingIcon={<Upload className="size-4" />}>
              Upload
            </AppButton>

            <Tooltip>
              <TooltipTrigger asChild>
                <AppButton variant="ghost" size="icon" className="relative rounded-full size-9">
                  <Bell className="size-5" />
                  <span
                    className="absolute top-1.5 right-1.5 size-2 rounded-full
                      bg-primary"
                  />
                </AppButton>
              </TooltipTrigger>
              <TooltipContent>Notifications</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <AppButton variant="ghost" size="icon" className="relative rounded-full size-9">
                  <MessageCircle className="size-5" />
                </AppButton>
              </TooltipTrigger>
              <TooltipContent>Messages</TooltipContent>
            </Tooltip>
          </>
        )}

        {/* Avatar + popup or Login Button */}
        {isAuth ? (
          <div className="relative" ref={popupRef}>
            <button
              aria-label="Open user menu"
              onClick={togglePopup}
              className="rounded-full focus:outline-none focus:ring-2
                focus:ring-primary/50 transition-all"
            >
              <AppAvatar
                className="size-9 cursor-pointer
                  hover:ring-primary/60 transition-all"
              />
            </button>

            {popupOpen && (
              <div
                className="absolute right-[-12px] md:right-[-16px] top-[50px] z-50
                  animate-in fade-in-0 zoom-in-95 duration-150"
              >
                <UserPopup isMobile={isMobile} onViewProfile={() => setPopupOpen(false)} onLogout={() => setPopupOpen(false)} />
              </div>
            )}
          </div>
        ) : (
          <AppButton size="sm" onClick={() => navigate("/login")}>
            Log In
          </AppButton>
        )}
      </div>
    </header>
  );
}

export default AppHeader;
