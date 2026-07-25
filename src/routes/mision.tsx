import { createFileRoute, Link } from "@tanstack/react-router";
import { Target, CheckCircle2, ArrowRight } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";

export const Route = createFileRoute("/mision")({
  head: () => ({
    meta: [
      { title: "Misión | Logiservicios Mónaco" },
      { name: "description", content: "Nuestra misión: brindar soluciones integrales de transporte y logística a nivel nacional e internacional con altos estándares de calidad." },
      { property: "og:title", content: "Misión | Logiservicios Mónaco" },
      { property: "og:description", content: "Soluciones integrales de transporte y logística a nivel nacional e internacional." },
    ],
  }),
  component: Page,
});

function Page() {
  const pillars = [
    "Servicio confiable y puntual en cada entrega nacional e internacional",
    "Impulso continuo al crecimiento de nuestros colaboradores",
    "Garantía de calidad mediante la innovación constante",
    "Altos estándares de seguridad y atención personalizada",
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
          <p className="text-xl md:text-2xl leading-relaxed text-foreground font-medium">
            Brindar soluciones integrales de transporte y logística a nivel nacional e internacional, con altos estándares de calidad, seguridad y puntualidad. Impulsando el crecimiento de nuestros colaboradores para garantizar que nuestros clientes reciban un servicio confiable mediante la innovación constante.
          </p>
        </div>
        <div className="mt-10 grid md:grid-cols-2 gap-4">
          {pillars.map((p) => (
            <div key={p} className="flex items-start gap-3 rounded-xl bg-card border border-border p-4 shadow-sm">
              <CheckCircle2 className="h-5 w-5 text-[#D60303] shrink-0 mt-0.5" />
              <span className="text-sm font-medium">{p}</span>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl bg-muted/60 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border border-border">
          <div>
            <h3 className="font-bold text-base text-foreground">¿Deseas conocer más sobre nuestra cultura?</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Explora nuestros valores, acrónimo IMPULSO y código de color institucional.</p>
          </div>
          <Link
            to="/filosofia"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-xs font-semibold px-4 py-2.5 rounded-xl hover:bg-primary/90 transition shrink-0"
          >
            Ver Filosofía Empresarial <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
