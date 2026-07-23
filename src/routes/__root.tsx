import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "LogiServicios Mónaco | Servicios de Transporte y Logística en Guatemala" },
      { name: "description", content: "Servicios de transporte y logística en Guatemala. Cobertura en los 22 departamentos: carga, distribución, almacenaje y rutas dedicadas con LogiServicios Mónaco." },
      { name: "keywords", content: "transporte Guatemala, logística Guatemala, servicios de transporte, distribución nacional, almacenaje, carga, fletes Guatemala, LogiServicios Mónaco" },
      { name: "author", content: "LogiServicios Mónaco" },
      { name: "robots", content: "index, follow" },
      { property: "og:site_name", content: "LogiServicios Mónaco" },
      { property: "og:title", content: "LogiServicios Mónaco | Servicios de Transporte y Logística en Guatemala" },
      { property: "og:description", content: "Empresa guatemalteca de transporte y logística con cobertura en los 22 departamentos de Guatemala." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://logiservicios-monaco-web.lovable.app/logo.png" },
      { property: "og:image:alt", content: "Logo LogiServicios Mónaco" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "LogiServicios Mónaco | Transporte y Logística en Guatemala" },
      { name: "twitter:description", content: "Servicios de transporte y logística con cobertura nacional en Guatemala." },
      { name: "twitter:image", content: "https://logiservicios-monaco-web.lovable.app/logo.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.png?v=2", type: "image/png" },
      { rel: "shortcut icon", href: "/favicon.png?v=2", type: "image/png" },
      { rel: "apple-touch-icon", href: "/logo.png" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "LogiServicios Mónaco",
          url: "https://logiservicios-monaco-web.lovable.app",
          logo: "https://logiservicios-monaco-web.lovable.app/logo.png",
          description: "Empresa guatemalteca de transporte y logística con cobertura nacional en los 22 departamentos.",
          areaServed: "GT",
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});


function RootShell({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
