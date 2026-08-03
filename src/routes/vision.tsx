import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/vision")({
  component: RedirectToFilosofia,
});

function RedirectToFilosofia() {
  return <Navigate to="/filosofia" replace />;
}
