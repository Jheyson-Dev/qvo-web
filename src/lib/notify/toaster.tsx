import { Toaster as SonnerToaster, type ToasterProps } from "sonner";
import {
  CircleCheck,
  CircleX,
  TriangleAlert,
  Info,
  LoaderCircle,
} from "lucide-react";
import { useThemeStore } from "@/shared/stores/themeStore";

export function Toaster({
  toastOptions,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  icons: _icons,
  ...behaviorProps
}: ToasterProps) {
  // Obtenemos el tema actual del store de Zustand (light, dark, system)
  const theme = useThemeStore((state) => state.theme);

  // Ignoramos intencionalmente "classNames" y "style" provenientes de toastOptions
  // para blindar la estética global del proyecto.
  const safeToastOptions = { ...toastOptions };
  delete safeToastOptions.classNames;
  delete safeToastOptions.style;

  return (
    <SonnerToaster
      className="toaster group"
      theme={theme}
      richColors={true}
      toastOptions={{
        ...safeToastOptions, // Solo opciones de comportamiento (duration, etc.)
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-popover group-[.toaster]:text-popover-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg rounded-xl",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      icons={{
        success: <CircleCheck className="size-5" />,
        error: <CircleX className="size-5" />,
        warning: <TriangleAlert className="size-5" />,
        info: <Info className="size-5" />,
        loading: (
          <LoaderCircle className="size-5 animate-spin text-muted-foreground" />
        ),
      }}
      {...behaviorProps}
    />
  );
}
