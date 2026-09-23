import { Briefcase, MapPin, Calendar, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ProfileHeader() {
  return (
    <div className="w-full max-w-5xl mx-auto rounded-xl overflow-hidden border border-border/40 bg-card/40 backdrop-blur-md shadow-sm">
      {/* Banner */}
      <div className="h-48 w-full bg-[#111111] dark:bg-[#1a1a1a] relative overflow-hidden">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Decorative squares to match the grid aesthetic */}
        <div className="absolute top-8 left-12 w-10 h-10 bg-white/5 rounded-sm backdrop-blur-sm" />
        <div className="absolute top-24 left-1/3 w-10 h-10 bg-white/5 rounded-sm backdrop-blur-sm" />
        <div className="absolute top-12 right-1/4 w-10 h-10 bg-white/5 rounded-sm backdrop-blur-sm" />
      </div>

      {/* Info Section */}
      <div className="px-6 pb-5 sm:pb-6 relative flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 sm:gap-4">
        {/* Left Side: Avatar & Info */}
        <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-end flex-1 w-full">
          {/* Avatar */}
          <div className="-mt-10 relative z-10 shrink-0">
            <div className="w-26 h-26 rounded-2xl overflow-hidden border border-white/10 bg-[#111111] shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=256&q=80"
                alt="Profile Avatar"
                className="w-full h-full object-cover grayscale opacity-90"
              />
            </div>
          </div>

          {/* Text */}
          <div className="flex-1 pb-1 sm:pb-0.5">
            <h1 className="text-xl font-bold text-foreground tracking-tight leading-tight">
              John Doe
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mt-1 font-medium">
              <div className="flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5" />
                <span>UX Designer</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>India</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>April 2021</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Button */}
        <div className="shrink-0 w-full sm:w-auto pb-1 sm:pb-0.5">
          <Button
            variant="secondary"
            size="sm"
            className="w-full sm:w-auto rounded-md font-medium px-4 bg-white/5 hover:bg-white/10 border border-white/10 text-foreground transition-colors"
          >
            <UserCheck className="w-4 h-4 mr-2" />
            Connected
          </Button>
        </div>
      </div>
    </div>
  );
}
