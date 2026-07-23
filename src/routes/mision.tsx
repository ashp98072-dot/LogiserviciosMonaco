import { createFileRoute } from "@tanstack/react-router";
import { Target, CheckCircle2 } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";

export const Route = createFileRoute("/mision")({
  head: () => ({
    meta: [
      { title: "Misión | Logiservicios Mónaco" },
      { name: "description", content: "Nuestra misión: brindar soluciones de transporte y logística seguras, eficientes y personalizadas en toda Guatemala." },
      { property: "og:title", content: "Misión | Logiservicios Mónaco" },
      { property: "og:description", content: "Brindar soluciones de transporte y logística seguras y eficientes en Guatemala." },
    ],
  }),
  component: Page,
});

function Page() {
  const pillars = [
    "Servicio confiable y puntual en cada entrega",
    "Atención personalizada a cada cliente",
    "Uso responsable de la tecnología y los recursos",
    "Desarrollo continuo de nuestro talento humano",
  ];
  return (
    <SiteLayout>
      <section className="bg-hero-gradient text-primary-foreground py-20">
        <div className="max-w-5xl mx-auto px-4">
          <span className="text-gold font-semibold uppercase text-sm tracking-wider">Propósito</span>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold">Nuestra Misión</h1>
        </div>
      </section>
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="rounded-2xl border border-border bg-card p-8 md:p-12 shadow-elegant">
          <div className="h-14 w-14 rounded-xl bg-gold-gradient text-gold-foreground flex items-center justify-center mb-6">
            <Target className="h-7 w-7" />
          </div>
          <p className="text-xl md:text-2xl leading-relaxed text-foreground">
            Brindar soluciones integrales de transporte y logística en Guatemala, con altos estándares de calidad, seguridad y puntualidad, apoyando el crecimiento de nuestros clientes mediante un servicio confiable, humano y tecnológicamente respaldado.
          </p>
        </div>
        <div className="mt-10 grid md:grid-cols-2 gap-4">
          {pillars.map((p) => (
            <div key={p} className="flex items-start gap-3 rounded-lg bg-muted/50 p-4">
              <CheckCircle2 className="h-5 w-5 text-gold mt-0.5" />
              <span className="text-sm">{p}</span>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
