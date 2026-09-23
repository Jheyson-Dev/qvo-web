import ky, { HTTPError } from "ky";
import { env } from "../config/env";
import type { ApiResponse } from "../types/api.types";
import { useAuthStore } from "@/features/iam/stores/authStore";

export class ApiError extends Error {
  public statusCode: number;
  public errorCode?: string;
  public errors?: { field: string; message: string; code?: string }[];

  constructor(
    message: string,
    statusCode: number,
    errorCode?: string,
    errors?: { field: string; message: string; code?: string }[],
  ) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.errors = errors;
  }
}

export const api = ky.create({
  prefix: env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  hooks: {
    beforeRequest: [
      ({ request }) => {
        const token = useAuthStore.getState().accessToken;
        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],
    beforeError: [
      async ({ error }) => {
        // En Ky, el error original se extrae del objeto de estado.
        // Solo intentamos leer el JSON si es un HTTPError con response.
        if (error instanceof HTTPError && error.response) {
          const body = error.data as ApiResponse | undefined;
          if (body && !body.success) {
            return new ApiError(
              body.message || "Ocurrió un error en el servidor.",
              body.statusCode || error.response.status,
              body.errorCode,
              body.errors,
            );
          }
        }
        return error;
      },
    ],
  },
});
