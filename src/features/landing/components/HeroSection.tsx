import { Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";
import { useLandingStore } from "../stores/useLandingStore";

export function HeroSection() {
  const activeAnime = useLandingStore((state) => state.activeAnime);

  return (
    <div className="flex flex-col items-start gap-6 max-w-150 w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeAnime.acronym}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex flex-col gap-6"
        >
          <h1 className="text-foreground font-black text-6xl md:text-8xl leading-[0.9] tracking-tight uppercase">
            {activeAnime.title.split(" ").map((word, i) => (
              <span key={i}>
                {word}
                <br />
              </span>
            ))}
          </h1>

          <p className="text-muted-foreground dark:text-[#E5E5E5] text-lg leading-relaxed max-w-125">
            {activeAnime.description}
          </p>
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center gap-4 mt-4">
        <Button
          size="icon"
          variant="outline"
          className="border-foreground/40 text-foreground hover:bg-foreground/10 dark:border-white dark:text-white dark:hover:bg-white/10 w-12 h-12 min-w-12 bg-transparent"
        >
          <Bookmark className="w-5 h-5 fill-transparent" />
        </Button>
        <Button
          variant="outline"
          className="border-foreground/40 text-foreground font-medium hover:bg-foreground/10 dark:border-white dark:text-white dark:font-light text-base px-8 h-12 bg-transparent dark:hover:bg-white/10"
        >
          explore blogs
        </Button>
      </div>
    </div>
  );
}
