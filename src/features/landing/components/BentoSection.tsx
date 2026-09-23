import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { Bookmark, Bell, Library, CalendarDays } from "lucide-react";

export function BentoSection() {
  return (
    <section className="relative z-20 w-full min-h-dvh bg-background flex flex-col items-center justify-center p-8 md:p-20">
      <h2 className="text-foreground font-black text-4xl md:text-6xl mb-4 text-center uppercase tracking-tight">
        More Anime Content
      </h2>
      <p className="text-zinc-400 text-lg max-w-2xl text-center mb-16">
        Sigue haciendo scroll para descubrir más noticias, blogs, y arte de la
        comunidad. El scrollbar personalizado que acabamos de diseñar te
        acompañará en todo el viaje.
      </p>

      {/* Anime Bento Grid Section */}
      <BentoGrid className="w-full max-w-6xl mt-8">
        <BentoCard
          name="Mi Lista Personal"
          className="lg:col-span-1"
          background={
            <div className="absolute inset-0 bg-neutral-100 dark:bg-neutral-900/50" />
          }
          Icon={Bookmark}
          description="Guarda y organiza tus animes favoritos. Continuá viéndolos desde el episodio exacto donde te quedaste sin perder el hilo."
          href="#"
          cta="Ver mi lista"
        />
        <BentoCard
          name="Notificaciones Simultáneas"
          className="lg:col-span-2"
          background={
            <div className="absolute inset-0 bg-neutral-100 dark:bg-neutral-900/50" />
          }
          Icon={Bell}
          description="Alertas en tiempo real. Entérate al segundo cuando un nuevo episodio de temporada es subido a la plataforma y sé el primero en verlo."
          href="#"
          cta="Configurar alertas"
        />
        <BentoCard
          name="Catálogo Ilimitado"
          className="lg:col-span-2"
          background={
            <div className="absolute inset-0 bg-neutral-100 dark:bg-neutral-900/50" />
          }
          Icon={Library}
          description="Explora miles de series, desde clásicos shonen que definieron épocas hasta joyas ocultas, todo categorizado perfectamente para ti."
          href="#"
          cta="Explorar catálogo"
        />
        <BentoCard
          name="Estrenos Diarios"
          className="lg:col-span-1"
          background={
            <div className="absolute inset-0 bg-neutral-100 dark:bg-neutral-900/50" />
          }
          Icon={CalendarDays}
          description="Filtra y descubre los animes en emisión por días de la semana y no te pierdas ningún simulcast."
          href="#"
          cta="Ver calendario"
        />
      </BentoGrid>
    </section>
  );
}
