import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  CheckCircle2,
  Loader2,
  Sparkles,
  User,
  AtSign,
  Mail,
  Lock,
} from "lucide-react";
import { MorphIcon } from "morphicons/react";
import { Eye, EyeOff } from "lucide";
import { Button } from "@/components/ui/button";
import { useForm } from "@tanstack/react-form";
import { IconInput } from "@/components/ui/icon-input";
import { useRegisterMutation } from "../api/useRegisterMutation";
import { registerFrontendSchema } from "../schemas/register.schema";

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const registerMutation = useRegisterMutation();

  const form = useForm({
    defaultValues: {
      displayName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validators: {
      onChange: ({ value }) => {
        const result = registerFrontendSchema.safeParse(value);
        if (!result.success) {
          // Extraemos errores globales si hay (ej. confirmPassword refine)
          const formErrors = result.error.issues.filter(
            (e) => e.path.length === 0 || e.path[0] === "confirmPassword",
          );
          if (formErrors.length > 0) {
            return formErrors[0].message;
          }
        }
        return undefined;
      },
    },
    onSubmit: async ({ value }) => {
      const result = registerFrontendSchema.safeParse(value);
      if (!result.success) return;

      registerMutation.mutate(value, {
        onSuccess: () => {
          setIsSuccess(true);
        },
      });
    },
  });

  // Pantalla de Éxito: Revisa tu correo
  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center w-full max-w-sm text-center animate-in fade-in zoom-in duration-500">
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/10 text-emerald-500 shadow-[0_0_40px_rgba(16,185,129,0.2)] mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            ¡Revisa tu bandeja!
          </h1>
          <p className="text-sm text-muted-foreground">
            Te hemos enviado un correo de confirmación. Por favor, haz clic en
            el enlace para verificar tu cuenta.
          </p>
        </div>
        <Link to="/iam/login" className="w-full mt-6">
          <Button className="w-full h-12 text-sm font-semibold rounded-xl bg-foreground text-background hover:bg-foreground/90 transition-all shadow-lg shadow-foreground/10">
            Ya lo verifiqué, ir al Login
          </Button>
        </Link>
      </div>
    );
  }

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
        Create an account.
      </h1>

      {registerMutation.error && (
        <div className="mb-6 p-4 rounded-xl bg-destructive/10 text-destructive text-sm font-medium border border-destructive/20 animate-in fade-in slide-in-from-top-2">
          {registerMutation.error.message}
        </div>
      )}

      <form
        className="flex flex-col gap-5 w-full"
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div className="grid grid-cols-2 gap-4">
          {/* Display Name */}
          <form.Field
            name="displayName"
            validators={{
              onChange: ({ value }) => {
                const res =
                  registerFrontendSchema.shape.displayName.safeParse(value);
                return res.success ? undefined : res.error.issues[0].message;
              },
            }}
          >
            {(field) => {
              return (
                <IconInput
                  field={field}
                  label="Display Name"
                  type="text"
                  autoComplete="off"
                  leftIcon={<User size={18} />}
                />
              );
            }}
          </form.Field>

          {/* Username */}
          <form.Field
            name="username"
            validators={{
              onChange: ({ value }) => {
                const res =
                  registerFrontendSchema.shape.username.safeParse(value);
                return res.success ? undefined : res.error.issues[0].message;
              },
            }}
          >
            {(field) => {
              return (
                <IconInput
                  field={field}
                  label="Username"
                  type="text"
                  autoComplete="off"
                  leftIcon={<AtSign size={18} />}
                />
              );
            }}
          </form.Field>
        </div>

        {/* Email */}
        <form.Field
          name="email"
          validators={{
            onChange: ({ value }) => {
              const res = registerFrontendSchema.shape.email.safeParse(value);
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

        <div className="grid grid-cols-2 gap-4">
          {/* Password */}
          <form.Field
            name="password"
            validators={{
              onChange: ({ value }) => {
                const res =
                  registerFrontendSchema.shape.password.safeParse(value);
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
                        showPassword
                          ? "Ocultar contraseña"
                          : "Mostrar contraseña"
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

          {/* Confirm Password */}
          <form.Field
            name="confirmPassword"
            validators={{
              onChangeListenTo: ["password"],
              onChange: ({ value, fieldApi }) => {
                const password = fieldApi.form.getFieldValue("password");
                if (value && value !== password) {
                  return "Las contraseñas no coinciden";
                }
                return undefined;
              },
            }}
          >
            {(field) => {
              return (
                <IconInput
                  field={field}
                  label="Confirm Password"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  leftIcon={<Lock size={18} />}
                  rightElement={
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center z-10"
                      aria-label={
                        showConfirmPassword
                          ? "Ocultar contraseña"
                          : "Mostrar contraseña"
                      }
                    >
                      <MorphIcon
                        icon={showConfirmPassword ? Eye : EyeOff}
                        size={20}
                        strokeWidth={2}
                      />
                    </button>
                  }
                />
              );
            }}
          </form.Field>
        </div>

        {/* Password Strength Indicator */}
        <form.Subscribe selector={(state) => state.values.password}>
          {(password) => {
            const rules = [
              { label: "At least 8 characters", valid: password.length >= 8 },
              { label: "1 uppercase letter", valid: /[A-Z]/.test(password) },
              { label: "1 lowercase letter", valid: /[a-z]/.test(password) },
              { label: "1 number", valid: /\d/.test(password) },
            ];

            return (
              <div className="flex flex-col gap-2 mt-2 p-4 rounded-xl border border-border/40 bg-background/30">
                <p className="text-sm font-medium text-foreground mb-1">
                  Password requirements:
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {rules.map((rule, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center gap-2 text-xs transition-colors duration-300 ${
                        rule.valid
                          ? "text-emerald-500 font-medium"
                          : "text-muted-foreground"
                      }`}
                    >
                      <CheckCircle2
                        className={`w-4 h-4 transition-transform duration-300 ${
                          rule.valid ? "scale-110" : "scale-100 opacity-40"
                        }`}
                      />
                      <span>{rule.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          }}
        </form.Subscribe>

        {/* Submit Button */}
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <Button
              type="submit"
              disabled={
                !canSubmit || isSubmitting || registerMutation.isPending
              }
              className="w-full h-12 mt-4 rounded-xl font-semibold text-base transition-all"
            >
              {isSubmitting || registerMutation.isPending ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Creating Account...</span>
                </div>
              ) : (
                "Create Account"
              )}
            </Button>
          )}
        </form.Subscribe>

        {/* Login Link */}
        <p className="text-center text-sm font-medium text-muted-foreground mt-4">
          Already have an account?{" "}
          <Link
            to="/iam/login"
            className="text-foreground font-semibold hover:underline"
          >
            Sign in
          </Link>
        </p>
      </form>
    </>
  );
}
