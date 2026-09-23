import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCallback, useEffect } from "react";
import { useLandingStore, BASE_ANIMES } from "../stores/useLandingStore";

// Duplicamos los elementos para asegurar que el carrusel desborde el contenedor
// y permita a Embla aplicar el loop y el scroll infinito.
const FEATURED_ANIMES = [...BASE_ANIMES, ...BASE_ANIMES, ...BASE_ANIMES].map(
  (anime, index) => ({
    ...anime,
    id: index,
  }),
);

export function FeaturedCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "start",
      loop: true,
    },
    [Autoplay({ delay: 3000, stopOnInteraction: false })],
  );

  const { activeIndex, setActiveIndex } = useLandingStore();

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
      emblaApi.plugins().autoplay?.reset();
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
      emblaApi.plugins().autoplay?.reset();
    }
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setActiveIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setActiveIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="w-full flex flex-col items-end gap-4">
      {/* Carousel Header */}
      <div className="flex items-center gap-2 mb-2 w-full max-w-113 md:max-w-lg justify-start">
        <span className="text-foreground dark:text-white text-sm font-medium dark:font-light">
          featured anime
        </span>
        <div className="w-1.5 h-1.5 rounded-full bg-green-500 dark:bg-green-400" />
      </div>

      {/* Embla Viewport */}
      <div
        className="overflow-hidden max-w-113 md:max-w-lg w-full"
        ref={emblaRef}
      >
        <div className="flex gap-4">
          {FEATURED_ANIMES.map((anime) => (
            <div
              key={anime.id}
              className="flex-[0_0_auto] w-35 h-70 md:w-40 md:h-80 rounded-2xl relative overflow-hidden group cursor-grab active:cursor-grabbing border border-border/10 shadow-lg dark:border-none"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url("${anime.bg}")` }}
              />
              {/* Gradient Overlay for text readability */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
              {/* Acronym Text */}
              <div className="absolute inset-x-0 bottom-4 px-4">
                <span className="text-white font-black text-3xl tracking-tight drop-shadow-md">
                  {anime.acronym}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Carousel Controls */}
      <div className="flex items-center gap-4 mt-6 w-full max-w-113 md:max-w-lg justify-start">
        {/* Progress Bar (Visual only for now) */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="w-10 h-10 rounded-full border-foreground/30 text-foreground hover:bg-foreground/10 dark:border-white/30 dark:text-white dark:hover:bg-white/10 bg-transparent flex items-center justify-center transition-colors"
            onClick={scrollPrev}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="w-10 h-10 rounded-full border-foreground/30 text-foreground hover:bg-foreground/10 dark:border-white/30 dark:text-white dark:hover:bg-white/10 bg-transparent flex items-center justify-center transition-colors"
            onClick={scrollNext}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex-1 h-px bg-foreground/20 dark:bg-white/20 mx-4 relative">
          <div
            className="absolute left-0 top-0 h-full bg-foreground dark:bg-white transition-all duration-300"
            style={{
              width: `${((activeIndex % BASE_ANIMES.length) + 1) * (100 / BASE_ANIMES.length)}%`,
            }}
          />
        </div>
        <span className="text-foreground dark:text-white font-light text-2xl md:text-3xl tracking-tighter tabular-nums">
          {String((activeIndex % BASE_ANIMES.length) + 1).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
