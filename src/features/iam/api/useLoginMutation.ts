import { useMutation } from "@tanstack/react-query";
import { api } from "@/shared/lib/api";
import type { ApiResponse } from "@/shared/types/api.types";
import { ApiError } from "@/shared/lib/api";
import type { LoginFrontendValues } from "../schemas/login.schema";

import type { BasicUser } from "../stores/authStore";

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: BasicUser;
  mfaRequired: boolean;
}

export function useLoginMutation() {
  return useMutation<LoginResponse, ApiError, LoginFrontendValues>({
    mutationFn: async (payload: LoginFrontendValues) => {
      const response = await api
        .post("v1/iam/auth/login", {
          json: payload,
        })
        .json<ApiResponse<LoginResponse>>();

      return response.data;
    },
  });
}
