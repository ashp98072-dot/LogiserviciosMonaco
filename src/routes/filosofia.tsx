import { createFileRoute, Link } from "@tanstack/react-router";
import { Target, Eye, Sparkles, ShieldCheck, HeartHandshake, Compass, Award, ArrowRight, CheckCircle2, RotateCcw, Truck, Users } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import DynamicSections from "@/components/DynamicSections";

export const Route = createFileRoute("/filosofia")({
  head: () => ({
    meta: [
      { title: "Filosofía Empresarial | Logiservicios Mónaco" },
      { name: "description", content: "Quiénes Somos, Nuestra Misión, Visión, Acrónimo IMPULSO, Esencia, Lema, ADN y Principios Mónaco." },
      { property: "og:title", content: "Filosofía Empresarial | Logiservicios Mónaco" },
      { property: "og:description", content: "Misión, Visión, Principios Mónaco, Acrónimo IMPULSO y Cultura de excelencia en Logiservicios Mónaco." },
    ],
  }),
  component: Page,
});

const IMPULSO_CARDS = [
  {
    letter: "I",
    title: "Innovación",
    desc: "Búsqueda constante de nuevas tecnologías y mejoras en la ruta.",
  },
  {
    letter: "M",
    title: "Mejora continua",
    desc: "Evolución constante en cada uno de nuestros procesos logísticos.",
  },
  {
    letter: "P",
    title: "Pasión",
    desc: "Entrega total en cada envío y compromiso con el cliente.",
  },
  {
    letter: "U",
    title: "Unidad",
    desc: "Trabajamos coordinados como un solo equipo sólido.",
  },
  {
    letter: "L",
    title: "Liderazgo",
    desc: "Guiamos el sector con rigor, ética y altos estándares.",
  },
  {
    letter: "S",
    title: "Servicio",
    desc: "Atención personalizada enfocada en superar expectativas.",
  },
  {
    letter: "O",
    title: "Optimismo",
    desc: "Visión positiva y determinación para superar cualquier reto.",
  },
];

const PRINCIPIOS = [
  { num: "01", text: "La seguridad es nuestra prioridad." },
  { num: "02", text: "El cliente siempre está en el centro." },
  { num: "03", text: "Trabajamos como un solo equipo, buscamos la excelencia." },
  { num: "04", text: "Actuamos con integridad." },
  { num: "05", text: "Cuidamos los recursos de la empresa." },
  { num: "06", text: "Representamos con orgullo Mónaco." },
];

function Page() {
  return (
    <SiteLayout>
      {/* Hero Section with Quiénes Somos */}
      <section className="bg-hero-gradient text-primary-foreground py-16 md:py-24 relative overflow-hidden">
        <div className="absolute -right-16 -top-16 opacity-10 pointer-events-none">
          <Award className="w-96 h-96 text-gold" />
        </div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/20 text-gold font-semibold uppercase text-xs tracking-wider border border-gold/30 mb-4">
            <Sparkles className="h-3.5 w-3.5" /> Filosofía Empresarial
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase">
            Quiénes Somos
          </h1>

          <div className="mt-6 max-w-4xl bg-white/10 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-white/15 shadow-2xl">
            <p className="text-base md:text-xl text-primary-foreground/95 leading-relaxed font-light">
              En <strong className="font-bold text-white">Logiservicios Mónaco</strong>, somos una empresa guatemalteca especializada en soluciones integrales de transporte, logística y gestión eficiente de recursos. Estamos comprometidos con impulsar la economía circular en el país a través del manejo, recolección y traslado estratégico de materiales reciclables e insumos industriales, asegurando un estricto control y monitoreo, puntualidad y altos estándares de seguridad en cada operación.
            </p>

            <div className="mt-6 pt-6 border-t border-white/15 flex flex-wrap items-center gap-6 text-xs md:text-sm font-semibold">
              <span className="flex items-center gap-2 text-gold">
                <RotateCcw className="h-4 w-4" /> Economía Circular & Reciclables
              </span>
              <span className="flex items-center gap-2 text-gold">
                <Truck className="h-4 w-4" /> Transporte & Logística Integral
              </span>
              <span className="flex items-center gap-2 text-gold">
                <ShieldCheck className="h-4 w-4" /> Estricto Control & Seguridad
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Nuestra Misión & Nuestra Visión */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-20">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Misión */}
          <div className="rounded-3xl border border-border bg-card p-8 md:p-10 shadow-card hover:shadow-elegant transition-all flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D60303]/10 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#D60303] text-white font-black text-xs uppercase tracking-widest mb-6 shadow-sm">
                <Target className="h-4 w-4" /> Nuestra Misión
              </div>
              <p className="text-base md:text-lg text-foreground font-medium leading-relaxed">
                Brindar soluciones integrales de transporte y logística a nivel nacional e internacional, con altos estándares de calidad, seguridad y puntualidad. Impulsando el crecimiento de nuestros colaboradores para garantizar que nuestros clientes reciban un servicio confiable mediante la innovación constante.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground font-bold">
              <span>Nacional e Internacional</span>
              <span className="text-[#D60303]">Logiservicios Mónaco</span>
            </div>
          </div>

          {/* Visión */}
          <div className="rounded-3xl border border-border bg-card p-8 md:p-10 shadow-card hover:shadow-elegant transition-all flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-neutral-900 text-gold font-black text-xs uppercase tracking-widest mb-6 shadow-sm border border-neutral-800">
                <Eye className="h-4 w-4 text-gold" /> Nuestra Visión
              </div>
              <p className="text-base md:text-lg text-foreground font-medium leading-relaxed">
                Ser la empresa de transporte y logística a nivel nacional e internacional, reconocida por la excelencia de nuestro servicio, la innovación en nuestros procesos, la seguridad de nuestras operaciones y el compromiso con nuestros colaboradores, clientes y el medio ambiente.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground font-bold">
              <span>Liderazgo & Excelencia</span>
              <span className="text-amber-600 dark:text-amber-400">Compromiso Total</span>
            </div>
          </div>
        </div>
      </section>

      {/* Acrónimo MÓNAC0: IMPULSO */}
      <section className="bg-slate-50/80 dark:bg-neutral-900/40 py-16 md:py-24 border-y border-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[#C00000] font-bold uppercase text-xs md:text-sm tracking-widest block mb-1">
              NUESTRA FILOSOFÍA DE TRABAJO
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              Acrónimo MÓNAC0: IMPULSO
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mt-3 text-sm md:text-base leading-relaxed">
              Cada letra de la palabra <strong className="text-slate-900 dark:text-white font-bold">IMPULSO</strong> define el marco conceptual sobre el cual construimos nuestras operaciones diarias y guiamos a nuestro equipo.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-3.5">
            {IMPULSO_CARDS.map((card) => (
              <div
                key={card.letter}
                className="rounded-2xl border border-slate-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 md:p-6 text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col items-center"
              >
                <div className="h-12 w-12 md:h-14 md:w-14 rounded-2xl bg-[#C00000] text-white flex items-center justify-center text-xl md:text-2xl font-black shadow-md mb-4 shrink-0">
                  {card.letter}
                </div>
                <h3 className="font-extrabold text-base md:text-lg text-slate-900 dark:text-white leading-tight mb-2">
                  {card.title}
                </h3>
                <p className="text-[11px] md:text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nuestra Esencia, Lema & ADN Mónaco */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-20">
        <div className="rounded-3xl bg-neutral-900 text-white p-8 md:p-14 shadow-2xl relative overflow-hidden border border-neutral-800">
          <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
            <Award className="w-80 h-80 text-primary" />
          </div>

          <div className="max-w-4xl relative z-10 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D60303] text-white font-black text-xs uppercase tracking-widest mb-4">
                Nuestra Esencia Mónaco
              </div>
              <blockquote className="text-2xl md:text-4xl font-extrabold leading-tight text-white italic">
                &ldquo;El éxito no es el destino, es la dirección. Sigamos avanzando con pasos firmes hacia nuestra mejor versión.&rdquo;
              </blockquote>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 pt-6 border-t border-neutral-800">
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                <span className="text-xs uppercase font-extrabold text-neutral-400 block tracking-wider">NUESTRO LEMA</span>
                <strong className="text-xl md:text-2xl font-black text-white mt-2 block">&ldquo;La excelencia nos mueve.&rdquo;</strong>
              </div>

              <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                <span className="text-xs uppercase font-extrabold text-neutral-400 block tracking-wider">ADN MÓNACO</span>
                <strong className="text-xl md:text-2xl font-black text-amber-400 mt-2 block">&ldquo;Servir con excelencia.&rdquo;</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Principios Mónaco */}
      <section className="bg-muted/40 py-16 md:py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[#D60303] font-black uppercase text-xs tracking-widest">Valores Innegociables</span>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mt-1 uppercase">Principios Mónaco</h2>
            <p className="text-muted-foreground mt-2 text-sm">
              Los 6 principios operacionales que definen nuestra conducta institucional.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {PRINCIPIOS.map((p) => (
              <div
                key={p.num}
                className="rounded-2xl border border-border bg-card p-6 shadow-card hover:shadow-elegant transition-all duration-300 flex items-start gap-4 group"
              >
                <span className="text-xl font-black text-white bg-[#D60303] h-10 w-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                  {p.num}
                </span>
                <div>
                  <h3 className="font-bold text-base md:text-lg text-foreground group-hover:text-primary transition-colors leading-snug">
                    {p.text}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="rounded-3xl bg-hero-gradient text-primary-foreground p-10 md:p-14 shadow-elegant text-center flex flex-col items-center">
          <HeartHandshake className="h-12 w-12 text-white mb-3" />
          <h2 className="text-2xl md:text-4xl font-black uppercase">Forma parte de la experiencia Mónaco</h2>
          <p className="mt-3 text-primary-foreground/90 max-w-xl text-sm md:text-base font-medium">
            ¿Buscas un socio logístico guiado por la excelencia o deseas unirte a nuestro equipo?
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link
              to="/contacto"
              className="inline-flex items-center gap-2 bg-white text-[#C00000] rounded-xl px-6 py-3.5 font-extrabold hover:bg-slate-100 transition shadow-lg text-sm md:text-base"
            >
              Cotizar con Nosotros <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/trabaja-con-nosotros"
              className="inline-flex items-center gap-2 border-2 border-white text-white rounded-xl px-6 py-3.5 font-bold hover:bg-white/15 transition text-sm md:text-base"
            >
              Ver Plazas Disponibles
            </Link>
          </div>
        </div>
      </section>

      <DynamicSections page="quienes-somos" />
    </SiteLayout>
  );
}
