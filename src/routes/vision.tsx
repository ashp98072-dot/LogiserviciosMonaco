import { createFileRoute, Link } from "@tanstack/react-router";
import { Eye, TrendingUp, ArrowRight } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";

export const Route = createFileRoute("/vision")({
  head: () => ({
    meta: [
      { title: "Visión | Logiservicios Mónaco" },
      { name: "description", content: "Nuestra visión: ser la empresa de transporte y logística a nivel nacional e internacional reconocida por la excelencia de nuestro servicio." },
      { property: "og:title", content: "Visión | Logiservicios Mónaco" },
      { property: "og:description", content: "Ser la empresa de transporte y logística a nivel nacional e internacional reconocida por su excelencia." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <SiteLayout>
      <section className="bg-hero-gradient text-primary-foreground py-20">
        <div className="max-w-5xl mx-auto px-4">
          <span className="text-gold font-semibold uppercase text-sm tracking-wider">Hacia dónde vamos</span>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold">Nuestra Visión</h1>
        </div>
      </section>
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="rounded-2xl border border-border bg-card p-8 md:p-12 shadow-elegant">
          <div className="h-14 w-14 rounded-xl bg-gold-gradient text-gold-foreground flex items-center justify-center mb-6">
            <Eye className="h-7 w-7" />
          </div>
          <p className="text-xl md:text-2xl leading-relaxed text-foreground font-medium">
            Ser la empresa de transporte y logística a nivel nacional e internacional, reconocida por la excelencia de nuestro servicio, la innovación en nuestros procesos, la seguridad de nuestras operaciones y el compromiso con nuestros colaboradores, clientes y el medio ambiente.
          </p>
        </div>
        <div className="mt-10 rounded-xl bg-hero-gradient text-primary-foreground p-6 flex items-center gap-4">
          <TrendingUp className="h-8 w-8 text-gold shrink-0" />
          <p className="text-sm md:text-base text-primary-foreground/90">
            Aspiramos a expandir nuestra flota, integrar tecnología de última generación y consolidar alianzas estratégicas que fortalezcan la cadena de suministro internacional y nacional.
          </p>
        </div>

        <div className="mt-10 rounded-2xl bg-muted/60 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border border-border">
          <div>
            <h3 className="font-bold text-base text-foreground">¿Deseas conocer nuestra Filosofía Completa?</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Revisa nuestro acrónimo IMPULSO, Principios Mónaco y ADN institucional.</p>
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
