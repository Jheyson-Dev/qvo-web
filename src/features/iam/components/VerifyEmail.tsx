import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { CheckCircle2, Loader2, MailX, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function VerifyEmail({ token }: { token?: string }) {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    token ? "loading" : "error",
  );

  // Simular la llamada a la API por el momento (solo UI)
  useEffect(() => {
    if (!token) {
      return;
    }

    const timer = setTimeout(() => {
      // Por ahora forzamos éxito para ver la UI
      setStatus("success");
    }, 2000);

    return () => clearTimeout(timer);
  }, [token]);

  return (
    <>
      {/* Logo */}
      <div className="flex items-center gap-2 mb-10">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-foreground text-background">
          <Sparkles className="w-4 h-4" />
        </div>
        <span className="text-xl font-bold tracking-tight text-foreground">
          QVO.
        </span>
      </div>

      <div className="flex flex-col items-center justify-center w-full max-w-sm text-center">
        {status === "loading" && (
          <div className="flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-500">
            <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 text-primary">
              <Loader2 className="w-10 h-10 animate-spin" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                Verificando tu correo
              </h1>
              <p className="text-sm text-muted-foreground">
                Estamos validando tu identidad, un momento por favor...
              </p>
            </div>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/10 text-emerald-500 shadow-[0_0_40px_rgba(16,185,129,0.2)]">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                ¡Cuenta verificada!
              </h1>
              <p className="text-sm text-muted-foreground">
                Tu correo electrónico ha sido confirmado exitosamente. Ya puedes
                acceder a todo el universo QVO.
              </p>
            </div>
            <Link to="/iam/login" className="w-full mt-4">
              <Button className="w-full h-12 text-sm font-semibold rounded-xl bg-foreground text-background hover:bg-foreground/90 transition-all shadow-lg shadow-foreground/10">
                Ir al Login
              </Button>
            </Link>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-destructive/10 text-destructive shadow-[0_0_40px_rgba(239,68,68,0.2)]">
              <MailX className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                Enlace inválido
              </h1>
              <p className="text-sm text-muted-foreground">
                El enlace de verificación ha expirado o es incorrecto. Por
                favor, solicita uno nuevo desde tu cuenta.
              </p>
            </div>
            <Link to="/iam/login" className="w-full mt-4">
              <Button
                variant="outline"
                className="w-full h-12 text-sm font-semibold rounded-xl transition-all"
              >
                Volver al Login
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
