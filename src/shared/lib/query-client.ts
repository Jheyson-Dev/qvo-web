import { QueryClient, MutationCache } from "@tanstack/react-query";
import { toast } from "@/lib/notify";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutos por defecto para evitar refetches innecesarios
      retry: 1, // Reintentar solo una vez por defecto si hay un fallo
      refetchOnWindowFocus: false, // Desactivar refetch al volver a la pestaña por defecto
    },
  },
  mutationCache: new MutationCache({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const errorMessage = error.message;
      toast.error(errorMessage);
    },
  }),
});
