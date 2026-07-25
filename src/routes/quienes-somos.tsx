import { createFileRoute, Link } from "@tanstack/react-router";
import { Users, Award, Handshake, ShieldCheck, ArrowRight, Target, Eye, Sparkles } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import warehouse from "@/assets/equipo.png";

export const Route = createFileRoute("/quienes-somos")({
  head: () => ({
    meta: [
      { title: "Quiénes Somos | Logiservicios Mónaco" },
      { name: "description", content: "Conoce a Logiservicios Mónaco: empresa de logística y transporte comprometida con la excelencia, servir con excelencia y la responsabilidad operacional." },
      { property: "og:title", content: "Quiénes Somos | Logiservicios Mónaco" },
      { property: "og:description", content: "Empresa de logística y transporte a nivel nacional e internacional. La excelencia nos mueve." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <SiteLayout>
      <section className="bg-hero-gradient text-primary-foreground py-20">
        <div className="max-w-5xl mx-auto px-4">
          <span className="text-gold font-semibold uppercase text-sm tracking-wider">Nuestra historia y valores</span>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold">Quiénes Somos</h1>
          <p className="mt-4 max-w-2xl text-primary-foreground/85 text-lg">
            Logiservicios Mónaco es una empresa dedicada al transporte y la logística integral a nivel nacional e internacional. Nacimos con la convicción de que un buen servicio logístico transforma la operación de nuestros clientes.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
        <img src={warehouse} alt="Equipo Logiservicios Mónaco" className="rounded-2xl shadow-elegant w-full object-cover" width={1200} height={800} loading="lazy" />
        <div>
          <span className="text-[#D60303] font-extrabold uppercase text-xs tracking-wider">Compromiso y Pasión</span>
          <h2 className="text-3xl font-bold mt-1">Una empresa comprometida con la excelencia</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Con más de una década de experiencia acumulada por nuestro equipo, entendemos los desafíos del mercado logístico: rutas diversas, tiempos ajustados y clientes exigentes. Por eso hemos construido una operación flexible, humana y respaldada por innovación constante.
          </p>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Trabajamos con empresas de manufactura, comercio, retail y distribución a nivel nacional e internacional, entregando soluciones que se ajustan a cada industria con altos estándares de seguridad y puntualidad.
          </p>

          <div className="mt-6 p-4 rounded-xl bg-card border border-border shadow-sm flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-[#D60303] text-white flex items-center justify-center shrink-0 font-bold">
              ADN
            </div>
            <div>
              <span className="text-xs font-bold text-muted-foreground uppercase">ADN MÓNAC0</span>
              <p className="text-base font-bold text-foreground">&ldquo;Servir con excelencia.&rdquo;</p>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Misión & Visión */}
      <section className="bg-muted/40 py-16 border-y border-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-primary font-extrabold uppercase text-xs tracking-widest">Filosofía Empresarial</span>
            <h2 className="text-3xl font-extrabold text-foreground mt-1">Nuestra Razón de Ser</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-2xl border border-border bg-card p-8 shadow-card flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 text-primary font-bold text-xs uppercase tracking-wider mb-4">
                  <Target className="h-4 w-4" /> Misión
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Brindar soluciones integrales de transporte y logística a nivel nacional e internacional, con altos estándares de calidad, seguridad y puntualidad. Impulsando el crecimiento de nuestros colaboradores para garantizar que nuestros clientes reciban un servicio confiable mediante la innovación constante.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-8 shadow-card flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-xs uppercase tracking-wider mb-4">
                  <Eye className="h-4 w-4" /> Visión
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Ser la empresa de transporte y logística a nivel nacional e internacional, reconocida por la excelencia de nuestro servicio, la innovación en nuestros procesos, la seguridad de nuestras operaciones y el compromiso con nuestros colaboradores, clientes y el medio ambiente.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/filosofia"
              className="inline-flex items-center gap-2 bg-gold-gradient text-gold-foreground rounded-xl px-6 py-3 font-semibold shadow-card hover:brightness-105 transition"
            >
              <Sparkles className="h-4 w-4" /> Explorar Filosofía Empresarial Completa <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Valores / Principios Destacados */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center">Nuestros pilares fundamentales</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {[
              { i: ShieldCheck, t: "Seguridad Prioritaria", d: "La seguridad es nuestra prioridad en carretera y custodia." },
              { i: Award, t: "Excelencia", d: "Buscamos siempre la mejora continua en cada proceso." },
              { i: Users, t: "Un Solo Equipo", d: "Trabajamos coordinados entre operaciones y ruta." },
              { i: Handshake, t: "Integridad", d: "Actuamos con transparencia y honestidad siempre." },
            ].map(({ i: Icon, t, d }) => (
              <div key={t} className="rounded-2xl bg-card border border-border p-6 shadow-card text-center hover:shadow-elegant transition">
                <div className="mx-auto h-12 w-12 rounded-xl bg-gold-gradient text-gold-foreground flex items-center justify-center mb-3">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-base">{t}</h3>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
