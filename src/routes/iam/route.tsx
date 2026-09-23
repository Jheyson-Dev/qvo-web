/* eslint-disable react-refresh/only-export-components */
import { AuthLayout } from "@/features/iam/components/AuthLayout";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/iam")({
  component: IamLayout,
});

function IamLayout() {
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
}
