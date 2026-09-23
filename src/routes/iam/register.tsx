/* eslint-disable react-refresh/only-export-components */
import { RegisterForm } from "@/features/iam/components/RegisterForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/iam/register")({
  component: IamRegisterPage,
});

function IamRegisterPage() {
  return <RegisterForm />;
}
