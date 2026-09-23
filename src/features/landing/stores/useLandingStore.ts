import { create } from "zustand";

export interface AnimeData {
  acronym: string;
  title: string;
  description: string;
  bg: string;
}

export const BASE_ANIMES: AnimeData[] = [
  {
    acronym: "BNHA",
    title: "MY HERO ACADEMIA",
    description:
      "In a world where 80% of the population has superpowers called 'Quirks', Izuku Midoriya is born without one. Follow his journey to become the greatest hero.",
    // Explosión de colores / Acción (Rojo/Naranja) - Ultra Wide
    bg: "https://plus.unsplash.com/premium_photo-1681554601855-e04b390b5a4a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    acronym: "JJK",
    title: "JUJUTSU KAISEN",
    description:
      "Yuji Itadori, a kind-hearted teenager, joins his school's Occult Club for fun, but discovers that its members are actual sorcerers who can manipulate the energy between beings.",
    // Oscuro / Neón / Magia (Morado/Oscuro) - Vertical
    bg: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&h=1600&fit=crop",
  },
  {
    acronym: "KNY",
    title: "DEMON SLAYER",
    description:
      "After his family is slaughtered and his younger sister Nezuko is turned into a demon, Tanjiro Kamado sets out on a dangerous journey to find a cure and avenge his family.",
    // Naturaleza Tradicional (Verde brillante) - Cuadrado
    bg: "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?q=80&w=1200&h=1200&fit=crop",
  },
  {
    acronym: "AOT",
    title: "ATTACK ON TITAN",
    description:
      "Humanity is forced to live in cities surrounded by three enormous walls that protect them from gigantic man-eating humanoids referred to as Titans.",
    // Estructuras masivas / Muros (Gris/Azul) - Standard HD
    bg: "https://images.unsplash.com/photo-1706076463257-20b41d9519f0?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

interface LandingState {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  activeAnime: AnimeData;
}

export const useLandingStore = create<LandingState>((set) => ({
  activeIndex: 0,
  setActiveIndex: (index: number) =>
    set(() => ({
      activeIndex: index,
      activeAnime: BASE_ANIMES[index % BASE_ANIMES.length],
    })),
  activeAnime: BASE_ANIMES[0],
}));
