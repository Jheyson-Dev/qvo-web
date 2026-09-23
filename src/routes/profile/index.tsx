/* eslint-disable react-refresh/only-export-components */
import { createFileRoute } from "@tanstack/react-router";
import { ProfileHeader } from "@/features/profile/components/ProfileHeader";
import { Navbar } from "@/features/landing/components/Navbar";

export const Route = createFileRoute("/profile/")({
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <div className="min-h-dvh bg-background text-foreground flex flex-col font-sans">
      {/* Reutilizamos el Navbar para mantener la navegación */}
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 pt-36 md:pt-40">
        <ProfileHeader />
      </main>
    </div>
  );
}
