import { Button } from "@/components/ui/button";
import { Github, Discord, Google } from "@thesvg/react";
import { StarfieldBackground } from "@/components/ui/starfield";
import { useLocation } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { motion } from "motion/react";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { useThemeStore } from "@/shared/stores/themeStore";

interface AuthLayoutProps {
  children: ReactNode;
}

function SocialButton({
  icon: Icon,
  text,
}: {
  icon: React.ElementType;
  text: string;
}) {
  return (
    <Button
      variant="ghost"
      className="w-full h-12 rounded-xl flex items-center justify-center gap-3 border border-border/50 bg-input/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] hover:bg-input/60 text-foreground font-semibold transition-all"
    >
      <Icon className="w-5 h-5" variant="mono" />
      {text}
    </Button>
  );
}

export function AuthLayout({ children }: AuthLayoutProps) {
  const location = useLocation();
  const isRegister = location.pathname.includes("register");
  const { theme, setTheme } = useThemeStore();

  const currentTheme =
    theme === "system" && typeof window !== "undefined"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme === "dark"
        ? "dark"
        : "light";

  const actionText = isRegister ? "Sign up" : "Sign in";

  return (
    <div className="relative min-h-screen w-full bg-background font-sans selection:bg-primary selection:text-primary-foreground overflow-hidden">
      <StarfieldBackground />

      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden bg-background/40 dark:bg-background/20 backdrop-blur-3xl border border-border/50 shadow-2xl">
          {/* LEFT COLUMN: Injected Form */}
          <div className="p-10 md:p-14 flex flex-col justify-center border-r border-border/10">
            {children}
          </div>

          {/* RIGHT COLUMN: Socials */}
          <div className="p-10 md:p-14 flex flex-col justify-center bg-background/20 dark:bg-black/10">
            <div className="flex flex-col gap-4 w-full max-w-sm mx-auto">
              <SocialButton icon={Google} text={`${actionText} with Google`} />
              <SocialButton
                icon={Discord}
                text={`${actionText} with Discord`}
              />
              <SocialButton icon={Github} text={`${actionText} with GitHub`} />
            </div>

            <p className="text-center text-xs font-medium text-muted-foreground mt-12 mx-auto max-w-xs leading-relaxed">
              By {isRegister ? "signing up" : "signing in"}, you agree to our{" "}
              <a
                href="#"
                className="text-foreground font-semibold hover:underline underline-offset-2"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="text-foreground font-semibold hover:underline underline-offset-2"
              >
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Floating Theme Toggler */}
      <motion.div
        drag
        dragMomentum={false}
        className="fixed bottom-8 right-8 z-50 cursor-grab active:cursor-grabbing p-1 bg-background/50 backdrop-blur-md rounded-full border border-border/50 shadow-lg flex items-center justify-center"
      >
        <AnimatedThemeToggler
          variant="circle"
          theme={currentTheme}
          onThemeChange={setTheme}
        />
      </motion.div>
    </div>
  );
}
