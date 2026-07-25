import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/quienes-somos")({
  component: RedirectToFilosofia,
});

function RedirectToFilosofia() {
  return <Navigate to="/filosofia" replace />;
}
