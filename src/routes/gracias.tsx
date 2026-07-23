import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";

export const Route = createFileRoute("/gracias")({
  head: () => ({
    meta: [
      { title: "Aplicación enviada | Logiservicios Mónaco" },
      { name: "description", content: "Hemos recibido tu aplicación. Nuestro equipo de reclutamiento te contactará pronto." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <SiteLayout>
      <section className="max-w-3xl mx-auto px-4 py-24 text-center">
        <div className="mx-auto h-16 w-16 rounded-full bg-gold-gradient text-gold-foreground flex items-center justify-center shadow-elegant">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h1 className="mt-6 text-3xl md:text-4xl font-bold">¡Aplicación enviada!</h1>
        <p className="mt-4 text-muted-foreground">
          Gracias por tu interés en formar parte de Logiservicios Mónaco. Hemos recibido tu información y tu CV.
          Nuestro equipo de reclutamiento revisará tu perfil y te contactará si avanzas al siguiente paso.
        </p>
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Link to="/" className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-md px-5 py-2.5 font-semibold hover:brightness-110">
            Volver al inicio
          </Link>
          <Link to="/contacto" className="inline-flex items-center gap-2 border border-border rounded-md px-5 py-2.5 font-semibold hover:bg-muted">
            Contactarnos
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
