import { useMutation } from "@tanstack/react-query";
import { api } from "@/shared/lib/api";
import type { ApiResponse } from "@/shared/types/api.types";
import { ApiError } from "@/shared/lib/api";
import type { RegisterFrontendValues } from "../schemas/register.schema";

interface RegisteredUserResponse {
  identityId: string;
  email: string;
  username: string;
  displayName: string;
  emailVerified: boolean;
  createdAt: string;
}

export function useRegisterMutation() {
  return useMutation<RegisteredUserResponse, ApiError, RegisterFrontendValues>({
    mutationFn: async (data: RegisterFrontendValues) => {
      // Excluimos confirmPassword del payload que enviamos al backend
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, ...payload } = data;

      const response = await api
        .post("v1/iam/registration", {
          json: payload,
        })
        .json<ApiResponse<RegisteredUserResponse>>();

      return response.data;
    },
  });
}
