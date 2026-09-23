import { z } from "zod";

export const registerFrontendSchema = z
  .object({
    email: z
      .string()
      .email({ message: "El formato del correo electrónico es inválido" }),
    password: z
      .string()
      .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/, {
        message:
          "Debe contener al menos una mayúscula, una minúscula y un número",
      }),
    confirmPassword: z.string().min(1, { message: "Confirma tu contraseña" }),
    username: z
      .string()
      .min(3, { message: "Debe tener al menos 3 caracteres" })
      .regex(/^[a-zA-Z0-9_-]+$/, {
        message: "Solo puede contener letras, números, guiones y guiones bajos",
      }),
    displayName: z
      .string()
      .min(2, { message: "Debe tener al menos 2 caracteres" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type RegisterFrontendValues = z.infer<typeof registerFrontendSchema>;
