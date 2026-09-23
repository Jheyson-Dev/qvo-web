/* eslint-disable react-refresh/only-export-components */
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { ThemeProvider } from "@/app/providers/ThemeProvider";
import { Toaster } from "@/lib/notify";

const RootLayout = () => (
  <ThemeProvider>
    <Outlet />
    <Toaster position="top-right" />
  </ThemeProvider>
);

export const Route = createRootRoute({
  component: RootLayout,
});
