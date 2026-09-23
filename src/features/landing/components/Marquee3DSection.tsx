import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";

const reviews = [
  {
    name: "Naruto Uzumaki",
    username: "@hokage7",
    body: "¡La mejor plataforma para ver anime clásico y actual en altísima calidad!",
    img: "https://avatar.vercel.sh/naruto",
  },
  {
    name: "Eren Yeager",
    username: "@tatakae",
    body: "No puedo dejar de ver los nuevos simulcasts aquí. Increíble experiencia.",
    img: "https://avatar.vercel.sh/eren",
  },
  {
    name: "Gojo Satoru",
    username: "@limitless",
    body: "El diseño de esta página es infinito. Súper fluido y sin interrupciones.",
    img: "https://avatar.vercel.sh/gojo",
  },
  {
    name: "Makima",
    username: "@control",
    body: "Tienen absolutamente todo bajo control. El catálogo es inmenso.",
    img: "https://avatar.vercel.sh/makima",
  },
  {
    name: "Luffy",
    username: "@pirateking",
    body: "¡Es el One Piece de las plataformas de streaming! Me encanta el scroll 3D.",
    img: "https://avatar.vercel.sh/luffy",
  },
  {
    name: "Frieren",
    username: "@elf",
    body: "Podría pasar 1000 años viendo anime aquí sin aburrirme.",
    img: "https://avatar.vercel.sh/frieren",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-72 cursor-pointer overflow-hidden rounded-xl border p-5",
        "border-foreground/10 bg-foreground/5 hover:bg-foreground/10",
        "dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10",
        "transition-colors duration-300",
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <img className="rounded-full" width="40" height="40" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-base font-bold text-foreground">
            {name}
          </figcaption>
          <p className="text-sm font-medium text-muted-foreground">
            {username}
          </p>
        </div>
      </div>
      <blockquote className="mt-4 text-sm leading-relaxed text-foreground/80">
        "{body}"
      </blockquote>
    </figure>
  );
};

export function Marquee3DSection() {
  return (
    <section className="relative flex h-200 w-full flex-col items-center justify-center overflow-hidden bg-background">
      <div className="flex h-full w-full flex-col justify-center gap-4 py-4 perspective-[1000px][transform-style:preserve-3d]">
        <div className="flex w-full flex-col justify-center gap-6 transform-[rotateX(35deg)_rotateZ(-20deg)_scale(1.5)] md:transform-[rotateX(40deg)_rotateZ(-25deg)_scale(1.6)]">
          <Marquee pauseOnHover className="[--duration:25s]">
            {firstRow.map((review) => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:25s]">
            {secondRow.map((review) => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
          <Marquee pauseOnHover className="[--duration:25s]">
            {firstRow.map((review) => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:25s]">
            {secondRow.map((review) => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
          <Marquee pauseOnHover className="[--duration:25s]">
            {firstRow.map((review) => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
        </div>
      </div>

      {/* Degradados para ocultar bordes de forma elegante */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-linear-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-linear-to-l from-background to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-linear-to-b from-background to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-background to-transparent" />
    </section>
  );
}
