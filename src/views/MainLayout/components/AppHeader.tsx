import { useRef } from "react";
import { Search, Bell, MessageCircle, Mic, Upload } from "lucide-react";
import { useOnClickOutside, useToggle } from "usehooks-ts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AppButton } from "@/components/common/AppButton";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import UserPopup from "./UserPopup";
import { useAppSelector } from "@/store";
import { useNavigate } from "react-router-dom";
import { checkIsAuthenticated } from "@/features/auth/utils/auth";

function AppHeader() {
  const [popupOpen, togglePopup, setPopupOpen] = useToggle(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const { username, avatarUrl } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const isAuth = checkIsAuthenticated();
  const userInitial = username ? username.charAt(0).toUpperCase() : "?";

  useOnClickOutside(popupRef as React.RefObject<HTMLElement>, () => setPopupOpen(false));

  return (
    <header
      className="h-14 flex items-center px-3 md:px-4 gap-2 md:gap-3
        bg-card border-b border-border shrink-0"
    >
      {/* Logo — hidden on mobile to save space */}
      <div className="hidden md:flex w-[60px] shrink-0 items-center">
        <span className="text-lg font-bold text-foreground leading-none">
          Echo<span className="text-primary">Wave</span>
        </span>
      </div>

      {/* Search bar — centered, responsive width */}
      <div className="flex-1 max-w-md mx-auto relative">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 size-4
            text-muted-foreground pointer-events-none"
        />
        <input
          type="text"
          placeholder="Search audio, creator, hashtag..."
          className="w-full h-9 rounded-full bg-muted pl-9 pr-4 text-sm
            text-foreground placeholder:text-muted-foreground
            border border-transparent focus:outline-none
            focus:border-primary focus:ring-2 focus:ring-primary/20
            transition-all"
        />
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-1 md:gap-2 shrink-0">
        {/* Record & Upload — hidden on small screens and for guest users */}
        {isAuth && (
          <>
            <AppButton size="sm" leadingIcon={<Mic className="size-4" />}>
              Record
            </AppButton>

            <AppButton size="sm" variant="outline" leadingIcon={<Upload className="size-4" />}>
              Upload
            </AppButton>
          </>
        )}

        {/* Notifications & Messages — hidden for guest users */}
        {isAuth && (
          <>
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
              onClick={togglePopup}
              className="rounded-full focus:outline-none focus:ring-2
                focus:ring-primary/50 transition-all"
            >
              <Avatar
                className="size-9 cursor-pointer ring-2 ring-transparent
                  hover:ring-primary/60 transition-all"
              >
                <AvatarImage src={avatarUrl || ""} />
                <AvatarFallback
                  className="bg-primary text-primary-foreground
                    text-sm font-bold"
                >
                  {userInitial}
                </AvatarFallback>
              </Avatar>
            </button>

            {popupOpen && (
              <div
                className="absolute right-[-12px] md:right-[-16px] top-[50px] z-50
                  animate-in fade-in-0 zoom-in-95 duration-150"
              >
                <UserPopup onViewProfile={() => setPopupOpen(false)} onLogout={() => setPopupOpen(false)} />
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
