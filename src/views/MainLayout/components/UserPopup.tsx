import { User, LogOut, Sun, Moon } from "lucide-react";
import { AppCard } from "@/components/common/AppCard";
import { AppButton } from "@/components/common/AppButton";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/hooks";
import { useLogout } from "@/features/auth/hooks/useLogout";
import type { ButtonVariant } from "@/components/common/AppButton";
import { useAppSelector } from "@/store";

type UserPopupProps = {
  onViewProfile: () => void;
  onLogout?: () => void;
};

type MenuItem =
  | { type: "separator" }
  | {
      type: "button";
      label: string;
      icon: React.ReactNode;
      onClick: () => void;
      variant?: ButtonVariant;
      className?: string;
    };

function UserPopup({ onViewProfile, onLogout }: UserPopupProps) {
  const { theme, toggleTheme } = useTheme();
  const { handleLogout } = useLogout();
  const { username } = useAppSelector((state) => state.auth);

  const handleToggleTheme = () => {
    toggleTheme();
  };

  const MENU_ITEMS: MenuItem[] = [
    {
      type: "button",
      label: "View Profile",
      icon: <User className="size-4 shrink-0" />,
      onClick: onViewProfile,
      variant: "ghost",
    },
    {
      type: "button",
      label: "Display Mode",
      icon: theme === "dark" ? <Sun className="size-5 shrink-0" /> : <Moon className="size-5 shrink-0" />,
      onClick: handleToggleTheme,
      variant: "ghost",
    },
    { type: "separator" },
    {
      type: "button",
      label: "Logout",
      icon: <LogOut className="size-4 shrink-0" />,
      onClick: () => {
        handleLogout();
        if (onLogout) onLogout();
      },
      variant: "ghost",
      className: "text-destructive hover:text-destructive",
    },
  ];

  return (
    <AppCard variant="default" radius="md" className="w-52 p-0 shadow-lg border border-border">
      <div className="flex flex-col gap-1 p-2">
        <div className="px-3 py-2">
          <span className="text-sm font-semibold text-foreground truncate block w-full text-center">{username || "Guest"}</span>
        </div>
        <Separator className="my-1" />

        {MENU_ITEMS.map((item, index) => {
          if (item.type === "separator") {
            return <Separator key={`sep-${index}`} className="my-1" />;
          }

          return (
            <AppButton
              key={item.label}
              variant={item.variant}
              className={`w-full justify-start text-sm font-normal h-9 px-3 ${item.className || ""}`}
              leadingIcon={item.icon}
              onClick={item.onClick}
            >
              {item.label}
            </AppButton>
          );
        })}
      </div>
    </AppCard>
  );
}

export default UserPopup;
