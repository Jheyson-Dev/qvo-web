import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Loader2, Sparkles, Mail, Lock } from "lucide-react";
import { MorphIcon } from "morphicons/react";
import { Eye, EyeOff } from "lucide";
import { Button } from "@/components/ui/button";
import { useForm } from "@tanstack/react-form";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { IconInput } from "@/components/ui/icon-input";
import { useLoginMutation } from "../api/useLoginMutation";
import { loginFrontendSchema } from "../schemas/login.schema";
import { useAuthStore } from "../stores/authStore";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const loginMutation = useLoginMutation();
  const navigate = useNavigate();
  const authLogin = useAuthStore((state) => state.login);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      // Cargamos FingerprintJS y obtenemos el visitorId
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      const fingerprint = result.visitorId;

      loginMutation.mutate(
        {
          ...value,
          fingerprint,
        },
        {
          onSuccess: (data) => {
            // Guardar en Zustand
            authLogin(data.accessToken, data.refreshToken, data.user);
            // Redirigir al inicio
            navigate({ to: "/" });
          },
        },
      );
    },
  });

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

      {/* Title */}
      <h1 className="text-3xl font-semibold mb-8 text-foreground tracking-tight">
        Sign In.
      </h1>

      <form
        className="flex flex-col gap-5 w-full"
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        {/* Email */}
        <form.Field
          name="email"
          validators={{
            onChange: ({ value }) => {
              const res = loginFrontendSchema.shape.email.safeParse(value);
              return res.success ? undefined : res.error.issues[0].message;
            },
          }}
        >
          {(field) => {
            return (
              <IconInput
                field={field}
                label="Email address"
                type="email"
                autoComplete="off"
                leftIcon={<Mail size={18} />}
              />
            );
          }}
        </form.Field>

        {/* Password */}
        <form.Field
          name="password"
          validators={{
            onChange: ({ value }) => {
              const res = loginFrontendSchema.shape.password.safeParse(value);
              return res.success ? undefined : res.error.issues[0].message;
            },
          }}
        >
          {(field) => {
            return (
              <IconInput
                field={field}
                label="Password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                leftIcon={<Lock size={18} />}
                rightElement={
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center z-10"
                    aria-label={
                      showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                    }
                  >
                    <MorphIcon
                      icon={showPassword ? Eye : EyeOff}
                      size={20}
                      strokeWidth={2}
                    />
                  </button>
                }
              />
            );
          }}
        </form.Field>

        {/* Global Error */}
        {loginMutation.error && (
          <div className="p-3 mt-2 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium">
            {loginMutation.error.message}
          </div>
        )}

        {/* Options Row */}
        <div className="flex items-center justify-between mt-1">
          <label className="flex items-center gap-2 cursor-pointer group">
            <div className="w-4 h-4 rounded border border-border/40 bg-transparent flex items-center justify-center group-hover:border-border/80 transition-colors">
              <input type="checkbox" className="opacity-0 absolute" />
              {/* Custom checkmark could go here */}
            </div>
            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
              Remember this device
            </span>
          </label>

          <a
            href="#"
            className="text-sm font-semibold text-foreground hover:opacity-70 transition-opacity"
          >
            Forgot Password?
          </a>
        </div>

        {/* Submit Button */}
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <Button
              type="submit"
              disabled={!canSubmit || isSubmitting || loginMutation.isPending}
              className="w-full h-12 mt-4 rounded-xl font-semibold text-base transition-all"
            >
              {isSubmitting || loginMutation.isPending ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Signing In...</span>
                </div>
              ) : (
                "Login"
              )}
            </Button>
          )}
        </form.Subscribe>

        {/* Register Link */}
        <p className="text-center text-sm font-medium text-muted-foreground mt-4">
          Don't have an account?{" "}
          <Link
            to="/iam/register"
            className="text-foreground font-semibold hover:underline"
          >
            Create an account
          </Link>
        </p>
      </form>
    </>
  );
}
