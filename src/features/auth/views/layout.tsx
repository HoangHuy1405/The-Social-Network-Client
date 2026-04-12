import { Outlet } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { WaveForm } from "@/components/common/WaveForm";
import { useTheme } from "@/contexts/ThemeProvider";

export const AuthLayout = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex min-h-screen w-full">
      {/* Left — WaveForm branding panel */}
      <WaveForm />

      {/* Right — Active Auth Form */}
      <div className="flex w-full flex-col items-center justify-center relative px-6 py-12 lg:w-[42%] overflow-y-auto">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-muted transition-colors text-foreground"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <Outlet />
      </div>
    </div>
  );
};
