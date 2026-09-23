import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ChevronDown, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { useThemeStore } from "@/shared/stores/themeStore";
import { AnimatedSearch } from "./AnimatedSearch";
import { useAuthStore } from "@/features/iam/stores/authStore";
import { UserDropdown } from "@/features/iam/components/UserDropdown";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useThemeStore();
  const isAuthenticated = useAuthStore((state) => !!state.accessToken);

  const currentTheme =
    theme === "system" && typeof window !== "undefined"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme === "dark"
        ? "dark"
        : "light";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-50 flex items-center px-8 lg:px-16 transition-all duration-300",
        isScrolled
          ? "h-20 bg-background/30 dark:bg-background/20 backdrop-blur-md border-b border-black/5 dark:border-white/5 shadow-xs"
          : "h-24 bg-transparent border-transparent",
      )}
    >
      {/* Left Section: Logo */}
      <div className="flex-1 flex items-center justify-start">
        <Link
          to="/"
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-foreground text-background">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="text-xl font-black text-foreground tracking-tight">
            QVO.
          </span>
        </Link>
      </div>

      {/* Center Section: Navigation Links */}
      <div className="hidden lg:flex items-center justify-center gap-8">
        <Link
          to="/"
          className="flex items-center gap-1 text-sm font-semibold text-foreground/90 hover:text-foreground drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] dark:drop-shadow-[0_0_8px_rgba(0,0,0,0.8)] transition-all cursor-pointer"
        >
          Features <ChevronDown className="w-4 h-4 opacity-70" />
        </Link>
        <Link
          to="/"
          className="text-sm font-semibold text-foreground/90 hover:text-foreground drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] dark:drop-shadow-[0_0_8px_rgba(0,0,0,0.8)] transition-all cursor-pointer"
        >
          Integration
        </Link>
        <Link
          to="/"
          className="text-sm font-semibold text-foreground/90 hover:text-foreground drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] dark:drop-shadow-[0_0_8px_rgba(0,0,0,0.8)] transition-all cursor-pointer"
        >
          Support
        </Link>
        <Link
          to="/"
          className="text-sm font-semibold text-foreground/90 hover:text-foreground drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] dark:drop-shadow-[0_0_8px_rgba(0,0,0,0.8)] transition-all cursor-pointer"
        >
          Docs
        </Link>
        <Link
          to="/"
          className="text-sm font-semibold text-foreground/90 hover:text-foreground drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] dark:drop-shadow-[0_0_8px_rgba(0,0,0,0.8)] transition-all cursor-pointer"
        >
          Pricing
        </Link>
      </div>

      {/* Right Section: Auth Actions & Theme */}
      <div className="flex-1 flex items-center justify-end gap-3 h-full">
        {/* Animated Search Input */}
        <div className="hidden sm:block mr-2">
          <AnimatedSearch />
        </div>

        {isAuthenticated ? (
          <UserDropdown />
        ) : (
          <>
            {/* Register (Outline) */}
            <Link to="/iam/register">
              <Button variant="outline" className="font-medium px-5">
                Register
              </Button>
            </Link>

            {/* Login (Solid) */}
            <Link to="/iam/login">
              <Button className="font-medium px-5">Login</Button>
            </Link>
          </>
        )}

        <div className="w-1px h-6 bg-border mx-2 hidden sm:block" />

        <AnimatedThemeToggler
          variant="circle"
          theme={currentTheme}
          onThemeChange={setTheme}
        />
      </div>
    </nav>
  );
}
