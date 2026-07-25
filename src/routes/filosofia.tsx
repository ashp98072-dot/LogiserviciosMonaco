import { createFileRoute, Link } from "@tanstack/react-router";
import { Target, Eye, Sparkles, ShieldCheck, HeartHandshake, Compass, Award, Palette, ArrowRight, CheckCircle2 } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";

export const Route = createFileRoute("/filosofia")({
  head: () => ({
    meta: [
      { title: "Filosofía Empresarial | Logiservicios Mónaco" },
      { name: "description", content: "Conoce nuestra Misión, Visión, Principios, ADN y Código Visual de Cultura en Logiservicios Mónaco. La excelencia nos mueve." },
      { property: "og:title", content: "Filosofía Empresarial | Logiservicios Mónaco" },
      { property: "og:description", content: "Misión, Visión, Principios Mónaco y el acrónimo IMPULSO que rigen nuestra excelencia logística." },
    ],
  }),
  component: Page,
});

const IMPULSO_LETTERS = [
  { letter: "I", word: "Innovación", desc: "Búsqueda constante de nuevas tecnologías y mejoras en la ruta." },
  { letter: "M", word: "Mejora continua", desc: "Evolución constante en cada uno de nuestros procesos logísticos." },
  { letter: "P", word: "Pasión", desc: "Entrega total en cada envío y compromiso con el cliente." },
  { letter: "U", word: "Unidad", desc: "Trabajamos coordinados como un solo equipo sólido." },
  { letter: "L", word: "Liderazgo", desc: "Guiamos el sector con rigor, ética y altos estándares." },
  { letter: "S", word: "Servicio", desc: "Atención personalizada enfocada en superar expectativas." },
  { letter: "O", word: "Optimismo", desc: "Visión positiva y determinación para superar cualquier reto." },
];

const PRINCIPIOS = [
  { num: "01", title: "La seguridad es nuestra prioridad.", desc: "Protocolos estrictos en carretera, mantenimiento preventivo y custodia integral." },
  { num: "02", title: "El cliente siempre está en el centro.", desc: "Diseñamos soluciones a la medida para respaldar la cadena de valor de nuestros clientes." },
  { num: "03", title: "Trabajamos como un solo equipo, buscamos la excelencia.", desc: "Sinergia en cada departamento entre el centro de operaciones y la ruta." },
  { num: "04", title: "Actuamos con integridad.", desc: "Transparencia, honestidad y ética en todos nuestros compromisos." },
  { num: "05", title: "Cuidamos los recursos de la empresa.", desc: "Responsabilidad y uso eficiente de nuestra infraestructura y flota." },
  { num: "06", title: "Representamos con orgullo Mónaco.", desc: "Proactividad, orgullo de marca y profesionalismo en cada destino." },
];

const BRAND_COLORS = [
  {
    name: "Rojo Mónaco",
    pantone: "Pantone #D60303",
    hex: "#D60303",
    bgClass: "bg-[#D60303]",
    textClass: "text-[#D60303]",
    borderClass: "border-[#D60303]",
    meaning: "Representa la fuerza motriz que mantiene a nuestra flota en constante avance hacia el destino, genera pasión, orgullo de marca y proactividad en el talento humano.",
  },
  {
    name: "Gris Claro",
    pantone: "Pantone #ACA7A7",
    hex: "#ACA7A7",
    bgClass: "bg-[#ACA7A7]",
    textClass: "text-[#8C8787]",
    borderClass: "border-[#ACA7A7]",
    meaning: "Simboliza la capacidad de la organización para coordinar flujos de información y adaptarse a las demandas del mercado. Representa la armonía entre los departamentos, promoviendo una comunicación transparente y continua entre el centro de operaciones y la ruta.",
  },
  {
    name: "Gris Oscuro",
    pantone: "Pantone #4A4A4A",
    hex: "#4A4A4A",
    bgClass: "bg-[#4A4A4A]",
    textClass: "text-[#4A4A4A]",
    borderClass: "border-[#4A4A4A]",
    meaning: "Refleja la seriedad institucional, el cumplimiento estricto de protocolos de seguridad y el rigor en la gestión de riesgos. Evoca la fortaleza del asfalto, el acero de las unidades y simboliza la resiliencia organizacional para mantener la continuidad del negocio ante cualquier entorno variable.",
  },
  {
    name: "Blanco Mónaco",
    pantone: "Pantone #FFFFFF",
    hex: "#FFFFFF",
    bgClass: "bg-white border border-slate-300",
    textClass: "text-slate-800",
    borderClass: "border-slate-300",
    meaning: "El Blanco en el ADN Mónaco no es solamente ausencia de color: representa la pureza y la honestidad en el servicio. Es el lienzo sobre el cual se escriben los procesos claros, la apertura al diálogo y el aprendizaje continuo.",
  },
];

function Page() {
  return (
    <SiteLayout>
      {/* Hero Section */}
      <section className="bg-hero-gradient text-primary-foreground py-20 relative overflow-hidden">
        <div className="absolute -right-20 -top-20 opacity-10 pointer-events-none">
          <Award className="w-96 h-96 text-gold" />
        </div>
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold/20 text-gold font-semibold uppercase text-xs tracking-wider border border-gold/30">
            <Sparkles className="h-3.5 w-3.5" /> Cultura Organizacional
          </span>
          <h1 className="mt-3 text-4xl md:text-6xl font-extrabold tracking-tight">
            Filosofía Empresarial
          </h1>
          <p className="mt-4 max-w-2xl text-primary-foreground/90 text-lg md:text-xl font-light leading-relaxed">
            Nuestros principios, misión y valores nos impulsan día a día. En Logiservicios Mónaco, <strong className="text-gold font-semibold">la excelencia nos mueve</strong>.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl text-xs md:text-sm font-semibold border border-white/15">
              <Compass className="h-4 w-4 text-gold" /> ADN Mónaco: Servir con excelencia
            </div>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl text-xs md:text-sm font-semibold border border-white/15">
              <Award className="h-4 w-4 text-gold" /> Lema: La excelencia nos mueve
            </div>
          </div>
        </div>
      </section>

      {/* Misión y Visión Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-20">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Misión Card */}
          <div className="rounded-2xl border border-border bg-card p-8 shadow-card hover:shadow-elegant transition-all flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 text-primary font-bold text-xs uppercase tracking-wider mb-4">
                <Target className="h-4 w-4" /> Nuestra Misión
              </div>
              <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
                Brindar soluciones integrales de transporte y logística a nivel nacional e internacional, con altos estándares de calidad, seguridad y puntualidad. Impulsando el crecimiento de nuestros colaboradores para garantizar que nuestros clientes reciban un servicio confiable mediante la innovación constante.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground font-semibold">
              <span>Nivel Nacional e Internacional</span>
              <span className="text-primary font-bold">Logiservicios Mónaco</span>
            </div>
          </div>

          {/* Visión Card */}
          <div className="rounded-2xl border border-border bg-card p-8 shadow-card hover:shadow-elegant transition-all flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-xs uppercase tracking-wider mb-4">
                <Eye className="h-4 w-4" /> Nuestra Visión
              </div>
              <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
                Ser la empresa de transporte y logística a nivel nacional e internacional, reconocida por la excelencia de nuestro servicio, la innovación en nuestros procesos, la seguridad de nuestras operaciones y el compromiso con nuestros colaboradores, clientes y el medio ambiente.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground font-semibold">
              <span>Líderes en Logística Integral</span>
              <span className="text-amber-600 dark:text-amber-400 font-bold">Visión de Futuro</span>
            </div>
          </div>
        </div>
      </section>

      {/* Acrónimo MÓNAC0 Section: IMPULSO */}
      <section className="bg-muted/40 py-16 md:py-20 border-y border-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-primary font-extrabold uppercase text-xs tracking-widest">Nuestra Filosofía de Trabajo</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mt-1">Acrónimo MÓNAC0: IMPULSO</h2>
            <p className="text-muted-foreground mt-2 text-sm md:text-base">
              Cada letra de la palabra <strong>IMPULSO</strong> define el marco conceptual sobre el cual construimos nuestras operaciones diarias y guiamos a nuestro equipo.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-3 md:gap-4">
            {IMPULSO_LETTERS.map((item) => (
              <div
                key={item.letter}
                className="group rounded-2xl border border-border bg-card p-4 text-center shadow-sm hover:shadow-elegant hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-between"
              >
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[#D60303] to-red-800 text-white flex items-center justify-center text-2xl font-black shadow-md group-hover:scale-110 transition-transform">
                  {item.letter}
                </div>
                <h3 className="font-extrabold text-sm md:text-base text-foreground mt-3 group-hover:text-primary transition-colors">
                  {item.word}
                </h3>
                <p className="text-[11px] text-muted-foreground mt-2 leading-tight">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Esencia, Lema & ADN Banner */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-20">
        <div className="rounded-3xl bg-neutral-900 text-white p-8 md:p-14 shadow-2xl relative overflow-hidden border border-neutral-800">
          <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
            <Award className="w-80 h-80 text-primary" />
          </div>

          <div className="max-w-3xl relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D60303]/30 text-[#D60303] font-bold text-xs uppercase tracking-wider border border-[#D60303]/40">
              Nuestra Esencia Mónaco
            </div>

            <blockquote className="text-2xl md:text-4xl font-extrabold leading-tight text-white italic">
              &ldquo;El éxito no es el destino, es la dirección. Sigamos advancing con pasos firmes hacia nuestra mejor versión.&rdquo;
            </blockquote>

            <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-neutral-800">
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <span className="text-xs uppercase font-bold text-neutral-400 block">ADN MÓNACO</span>
                <strong className="text-lg font-bold text-amber-400 mt-1 block">&ldquo;Servir con excelencia.&rdquo;</strong>
              </div>
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <span className="text-xs uppercase font-bold text-neutral-400 block">NUESTRO LEMA</span>
                <strong className="text-lg font-bold text-red-500 mt-1 block">&ldquo;La excelencia nos mueve.&rdquo;</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Principios Mónaco */}
      <section className="bg-muted/40 py-16 md:py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-primary font-extrabold uppercase text-xs tracking-widest">Compromiso Institucional</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mt-1">Principios Mónaco</h2>
            <p className="text-muted-foreground mt-2 text-sm">
              Los 6 pilares innegociables que sustentan nuestra ética operacional y relación con nuestros clientes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRINCIPIOS.map((p) => (
              <div
                key={p.num}
                className="rounded-2xl border border-border bg-card p-6 shadow-card hover:shadow-elegant transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-[#D60303] bg-[#D60303]/10 px-3 py-1 rounded-xl">
                      {p.num}
                    </span>
                    <ShieldCheck className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="font-bold text-base md:text-lg text-foreground group-hover:text-primary transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-border/60 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Principio Activo
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Código Visual de Nuestra Cultura */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-20">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-primary font-extrabold uppercase text-xs tracking-widest flex items-center justify-center gap-1.5">
            <Palette className="h-4 w-4 text-primary" /> Identidad e Historia de Marca
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mt-1">Código Visual de Nuestra Cultura</h2>
          <blockquote className="text-sm md:text-base text-muted-foreground italic mt-3 max-w-2xl mx-auto">
            &ldquo;Los colores de Mónaco no solo identifican nuestra flota; definen la fuerza, la precisión y la integridad con la que movemos el futuro de la logística.&rdquo;
          </blockquote>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {BRAND_COLORS.map((color) => (
            <div
              key={color.name}
              className="rounded-2xl border border-border bg-card p-6 shadow-card flex flex-col sm:flex-row gap-5 items-start transition hover:shadow-elegant"
            >
              {/* Color swatch */}
              <div className="flex flex-col items-center shrink-0 w-full sm:w-28">
                <div className={`w-full h-20 sm:h-24 rounded-xl ${color.bgClass} shadow-md flex items-center justify-center font-mono text-xs font-bold text-white drop-shadow`} />
                <span className="text-[11px] font-mono font-bold text-muted-foreground mt-2">{color.pantone}</span>
              </div>

              {/* Color info */}
              <div className="space-y-2 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-lg text-foreground">{color.name}</h3>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${color.bgClass} text-white`}>
                    {color.hex}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {color.meaning}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to action */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="rounded-3xl bg-hero-gradient text-primary-foreground p-10 md:p-14 shadow-elegant text-center flex flex-col items-center">
          <HeartHandshake className="h-12 w-12 text-gold mb-3" />
          <h2 className="text-2xl md:text-4xl font-extrabold">Forma parte de la experiencia Mónaco</h2>
          <p className="mt-3 text-primary-foreground/85 max-w-xl text-sm md:text-base">
            ¿Buscas un socio logístico guiado por la excelencia o deseas unirte a nuestro equipo? Conoce nuestras oportunidades laborales o contáctanos.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link
              to="/contacto"
              className="inline-flex items-center gap-2 bg-gold-gradient text-gold-foreground rounded-xl px-6 py-3 font-semibold hover:brightness-105 transition shadow-card"
            >
              Cotizar con Nosotros <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/trabaja-con-nosotros"
              className="inline-flex items-center gap-2 border border-white/30 text-primary-foreground rounded-xl px-6 py-3 font-semibold hover:bg-white/10 transition"
            >
              Ver Plazas Disponibles
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
