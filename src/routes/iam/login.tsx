/* eslint-disable react-refresh/only-export-components */
import { LoginForm } from "@/features/iam/components/LoginForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/iam/login")({
  component: IamLoginPage,
});

function IamLoginPage() {
  return <LoginForm />;
}
