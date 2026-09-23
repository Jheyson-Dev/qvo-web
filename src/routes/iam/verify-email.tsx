/* eslint-disable react-refresh/only-export-components */
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { VerifyEmail } from "@/features/iam/components/VerifyEmail";

const verifyEmailSearchSchema = z.object({
  token: z.union([z.string()]).transform(String).optional(),
});

export const Route = createFileRoute("/iam/verify-email")({
  validateSearch: verifyEmailSearchSchema,
  component: VerifyEmailRoute,
});

function VerifyEmailRoute() {
  const { token } = Route.useSearch();
  return <VerifyEmail token={token} />;
}
