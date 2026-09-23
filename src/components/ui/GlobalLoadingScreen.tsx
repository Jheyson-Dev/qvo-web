import { StarfieldBackground } from "@/components/ui/starfield";
import { Sparkles } from "lucide-react";
import { motion } from "motion/react";

export function GlobalLoadingScreen() {
  return (
    <div className="relative min-h-screen w-full bg-background font-sans">
      <StarfieldBackground />

      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="flex flex-col items-center gap-4"
        >
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-foreground text-background shadow-lg shadow-foreground/20">
            <Sparkles className="w-8 h-8 animate-pulse" />
          </div>
          <span className="text-2xl font-bold tracking-widest uppercase text-foreground animate-pulse">
            QVO
          </span>
          <p className="text-muted-foreground text-sm font-medium animate-pulse">
            Cargando el universo...
          </p>
        </motion.div>
      </div>
    </div>
  );
}
