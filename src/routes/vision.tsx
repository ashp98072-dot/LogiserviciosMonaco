import { createFileRoute } from "@tanstack/react-router";
import { Eye, TrendingUp } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";

export const Route = createFileRoute("/vision")({
  head: () => ({
    meta: [
      { title: "Visión | Logiservicios Mónaco" },
      { name: "description", content: "Nuestra visión: ser la empresa líder en logística y transporte en Guatemala, reconocidos por innovación, calidad y compromiso." },
      { property: "og:title", content: "Visión | Logiservicios Mónaco" },
      { property: "og:description", content: "Ser la empresa líder en logística y transporte en Guatemala." },
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
          <p className="text-xl md:text-2xl leading-relaxed text-foreground">
            Ser reconocidos como la empresa líder en soluciones logísticas y de transporte en Guatemala, distinguidos por nuestra innovación, calidad de servicio, cobertura nacional y compromiso genuino con el éxito de nuestros clientes y colaboradores.
          </p>
        </div>
        <div className="mt-10 rounded-xl bg-hero-gradient text-primary-foreground p-6 flex items-center gap-4">
          <TrendingUp className="h-8 w-8 text-gold" />
          <p className="text-sm md:text-base text-primary-foreground/90">
            Aspiramos a expandir nuestra flota, integrar tecnología de última generación y consolidar alianzas estratégicas que fortalezcan la cadena de suministro de Guatemala.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
