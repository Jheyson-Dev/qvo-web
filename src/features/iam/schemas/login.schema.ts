import { z } from "zod";

export const loginFrontendSchema = z.object({
  email: z
    .string()
    .email({ message: "El formato del correo electrónico es inválido" }),
  password: z.string().min(1, { message: "La contraseña es requerida" }),
  fingerprint: z.string().max(255).optional(),
});

export type LoginFrontendValues = z.infer<typeof loginFrontendSchema>;
