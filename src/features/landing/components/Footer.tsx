import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
// import { X, GitHub, Discord } from "@monoic/icons";
import { Instagram, Github, Discord, X } from "@thesvg/react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-background border-t border-border/40 py-12 md:py-16 px-8 lg:px-16 flex flex-col items-center justify-center relative z-20">
      {/* --- TOP SECTION (Logo & Links) --- */}
      <div className="flex flex-col items-center gap-8 w-full max-w-5xl mb-12">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-md bg-foreground text-background">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="text-xl font-bold text-foreground tracking-tight">
            QVO.
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4">
          <Link
            to="/"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            Animes
          </Link>
          <Link
            to="/"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            Mangas
          </Link>
          <Link
            to="/"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            Comunidad
          </Link>
          <Link
            to="/"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            Premium
          </Link>
          <Link
            to="/"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            Privacidad
          </Link>
          <Link
            to="/"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            Términos
          </Link>
        </nav>
      </div>

      {/* --- DIVIDER --- */}
      <div className="w-full max-w-6xl border-t border-dashed border-border/60 mb-8" />

      {/* --- BOTTOM SECTION (Copyright & Socials) --- */}
      <div className="w-full max-w-6xl flex flex-col-reverse md:flex-row items-center justify-between gap-6">
        {/* Copyright */}
        <p className="text-xs text-muted-foreground">
          © {currentYear} QVO Anime. Todos los derechos reservados.
        </p>

        {/* Social Icons */}
        <div className="flex items-center gap-5">
          <a
            href="#"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-6 h-6" variant="mono" />
          </a>
          <a
            href="#"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Discord className="w-6 h-6" variant="mono" />
          </a>
          <a
            href="#"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="w-6 h-6" variant="mono" />
          </a>
          <a
            href="#"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Instagram className="w-6 h-6" variant="mono" />
          </a>
        </div>
      </div>
    </footer>
  );
}
