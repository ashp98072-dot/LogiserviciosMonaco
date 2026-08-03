import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/mision")({
  component: RedirectToFilosofia,
});

function RedirectToFilosofia() {
  return <Navigate to="/filosofia" replace />;
}
