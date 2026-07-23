import { createFileRoute } from "@tanstack/react-router";
import { Users, Award, Handshake, Leaf } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import warehouse from "@/assets/equipo.png";

export const Route = createFileRoute("/quienes-somos")({
  head: () => ({
    meta: [
      { title: "Quiénes Somos | Logiservicios Mónaco" },
      { name: "description", content: "Conoce a Logiservicios Mónaco: empresa guatemalteca de logística y transporte comprometida con la excelencia y la puntualidad." },
      { property: "og:title", content: "Quiénes Somos | Logiservicios Mónaco" },
      { property: "og:description", content: "Empresa guatemalteca de logística con más de 10 años de experiencia." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <SiteLayout>
      <section className="bg-hero-gradient text-primary-foreground py-20">
        <div className="max-w-5xl mx-auto px-4">
          <span className="text-gold font-semibold uppercase text-sm tracking-wider">Nuestra historia</span>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold">Quiénes Somos</h1>
          <p className="mt-4 max-w-2xl text-primary-foreground/85 text-lg">
            Logiservicios Mónaco es una empresa guatemalteca dedicada al transporte y la logística integral. Nacimos con la convicción de que un buen servicio logístico transforma la operación de nuestros clientes.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
        <img src={warehouse} alt="Equipo Logiservicios Mónaco" className="rounded-xl shadow-elegant w-full" width={1200} height={800} loading="lazy" />
        <div>
          <h2 className="text-3xl font-bold">Una empresa comprometida</h2>
          <p className="mt-4 text-muted-foreground">
            Con más de una década de experiencia acumulada por nuestro equipo, entendemos los desafíos del mercado guatemalteco: geografía diversa, tiempos ajustados y clientes exigentes. Por eso hemos construido una operación flexible, humana y respaldada por tecnología.
          </p>
          <p className="mt-3 text-muted-foreground">
            Trabajamos con empresas de manufactura, comercio, retail y distribución, entregando soluciones que se ajustan a cada industria.
          </p>
        </div>
      </section>

      <section className="bg-muted/40 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center">Nuestros valores</h2>
          <div className="grid md:grid-cols-4 gap-6 mt-10">
            {[
              { i: Handshake, t: "Compromiso", d: "Cumplimos lo que prometemos, cada envío, cada cliente." },
              { i: Award, t: "Excelencia", d: "Buscamos siempre la mejora continua en cada proceso." },
              { i: Users, t: "Trabajo en equipo", d: "Nuestra gente es el motor de la operación." },
              { i: Leaf, t: "Responsabilidad", d: "Operamos con conciencia social y ambiental." },
            ].map(({ i: Icon, t, d }) => (
              <div key={t} className="rounded-xl bg-card border border-border p-6 shadow-card text-center">
                <div className="mx-auto h-12 w-12 rounded-lg bg-gold-gradient text-gold-foreground flex items-center justify-center mb-3">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold">{t}</h3>
                <p className="text-sm text-muted-foreground mt-1">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
