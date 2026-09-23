import { useQuery } from "@tanstack/react-query";
import { api } from "@/shared/lib/api";
import type { ApiResponse } from "@/shared/types/api.types";
import { useAuthStore, type BasicUser } from "../stores/authStore";

export function useProfileQuery() {
  const token = useAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: ["iam", "profile", "me"],
    queryFn: async () => {
      const response = await api
        .get("v1/iam/profile/me")
        .json<ApiResponse<BasicUser>>();
      return response.data;
    },
    enabled: !!token,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
