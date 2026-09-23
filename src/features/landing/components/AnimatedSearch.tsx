import { useState, useRef, useEffect } from "react";
import { MorphIcon } from "morphicons/react";
import { Search, X } from "lucide";
import { cn } from "@/lib/utils";

export function AnimatedSearch() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Cerrar al hacer click afuera (si está vacío)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        if (!searchValue) {
          setIsExpanded(false);
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchValue]);

  // Manejar tecla Escape
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      if (searchValue) {
        setSearchValue(""); // Limpia el texto si hay
      } else {
        setIsExpanded(false); // Cierra si está vacío
        inputRef.current?.blur();
      }
    }
  };

  const handleIconClick = () => {
    if (isExpanded) {
      if (searchValue) {
        setSearchValue("");
        inputRef.current?.focus(); // Mantiene el foco para seguir escribiendo
      } else {
        setIsExpanded(false);
      }
    } else {
      setIsExpanded(true);
      // Pequeño delay para que la transición inicie antes de forzar el foco
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex items-center h-10 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden",
        isExpanded ? "w-64" : "w-10",
      )}
    >
      <input
        ref={inputRef}
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Buscar..."
        className={cn(
          "absolute left-0 w-full h-10 pl-4 pr-10 rounded-full border border-border/40 bg-background/50 dark:bg-background/20 backdrop-blur-md text-sm text-foreground focus:outline-none focus:border-foreground/30 transition-opacity duration-300",
          isExpanded ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        tabIndex={isExpanded ? 0 : -1}
      />
      <button
        onClick={handleIconClick}
        aria-label="Toggle search"
        className="absolute right-0 z-10 w-10 h-10 flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors outline-none focus-visible:ring-1 focus-visible:ring-foreground rounded-full"
      >
        <MorphIcon icon={isExpanded ? X : Search} size={18} strokeWidth={2.5} />
      </button>
    </div>
  );
}
