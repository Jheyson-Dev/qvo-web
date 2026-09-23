import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/shared/lib/api";
import { ApiError } from "@/shared/lib/api";
import { useAuthStore } from "../stores/authStore";

interface LogoutPayload {
  refreshToken: string;
}

export function useLogoutMutation() {
  const queryClient = useQueryClient();
  const authLogout = useAuthStore((state) => state.logout);

  return useMutation<void, ApiError, LogoutPayload>({
    mutationFn: async (payload: LogoutPayload) => {
      await api.post("v1/iam/auth/logout", {
        json: payload,
      });
    },
    onSettled: () => {
      // Pase lo que pase (éxito o error de red), limpiamos la sesión local
      // para no dejar al usuario atrapado en el frontend
      authLogout();
      // Limpiamos el caché de React Query para que no queden datos cacheados
      queryClient.clear();
    },
  });
}
