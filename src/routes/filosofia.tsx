import { createFileRoute, Link } from "@tanstack/react-router";
import { Target, Eye, Sparkles, ShieldCheck, HeartHandshake, Compass, Award, Palette, ArrowRight, CheckCircle2, RotateCcw, Truck, Users } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";

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

const IMPULSO_ITEMS = [
  { letter: "I", topWord: "Innovación", bottomWord: null },
  { letter: "M", topWord: null, bottomWord: "Mejora continua" },
  { letter: "P", topWord: "Pasión", bottomWord: null },
  { letter: "U", topWord: null, bottomWord: "Unidad" },
  { letter: "L", topWord: "Liderazgo", bottomWord: null },
  { letter: "S", topWord: null, bottomWord: "Servicio" },
  { letter: "O", topWord: "Optimismo", bottomWord: null },
];

const PRINCIPIOS = [
  { num: "01", text: "La seguridad es nuestra prioridad." },
  { num: "02", text: "El cliente siempre está en el centro." },
  { num: "03", text: "Trabajamos como un solo equipo, buscamos la excelencia." },
  { num: "04", text: "Actuamos con integridad." },
  { num: "05", text: "Cuidamos los recursos de la empresa." },
  { num: "06", text: "Representamos con orgullo Mónaco." },
];

const BRAND_COLORS = [
  {
    name: "Rojo Mónaco",
    pantone: "Pantone #D60303",
    hex: "#D60303",
    bgStyle: { backgroundColor: "#D60303" },
    textColor: "text-[#D60303]",
    badgeClass: "bg-[#D60303] text-white",
    meaning: "Representa la fuerza motriz que mantiene a nuestra flota en constante avance hacia el destino, genera pasión, orgullo de marca y proactividad en el talento humano.",
  },
  {
    name: "Gris Claro",
    pantone: "Pantone #ACA7A7",
    hex: "#ACA7A7",
    bgStyle: { backgroundColor: "#ACA7A7" },
    textColor: "text-[#8C8787]",
    badgeClass: "bg-[#ACA7A7] text-slate-900",
    meaning: "Simboliza la capacidad de la organización para coordinar flujos de información y adaptarse a las demandas del mercado. Representa la armonía entre los departamentos, promoviendo una comunicación transparente y continua entre el centro de operaciones y la ruta.",
  },
  {
    name: "Gris Oscuro",
    pantone: "Pantone #4A4A4A",
    hex: "#4A4A4A",
    bgStyle: { backgroundColor: "#4A4A4A" },
    textColor: "text-[#4A4A4A]",
    badgeClass: "bg-[#4A4A4A] text-white",
    meaning: "Refleja la seriedad institucional, el cumplimiento estricto de protocolos de seguridad y el rigor en la gestión de riesgos. Evoca la fortaleza del asfalto, el acero de las unidades y simboliza la resiliencia organizacional para mantener la continuidad del negocio ante cualquier entorno variable.",
  },
  {
    name: "Blanco Mónaco",
    pantone: "Pantone #FFFFFF",
    hex: "#FFFFFF",
    bgStyle: { backgroundColor: "#FFFFFF" },
    textColor: "text-slate-800",
    badgeClass: "bg-white text-slate-900 border border-slate-300",
    meaning: "El Blanco en el ADN Mónaco no es solamente ausencia de color: representa la pureza y la honestidad en el servicio. Es el lienzo sobre el cual se escriben los procesos claros, la apertura al diálogo y el aprendizaje continuo.",
  },
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
      <section className="bg-neutral-950 text-white py-16 md:py-24 border-y border-neutral-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-[#D60303] font-black uppercase text-xs tracking-widest">Nuestra Filosofía de Trabajo</span>
            <h2 className="text-3xl md:text-5xl font-black text-white mt-2 uppercase tracking-tight">
              Acrónimo MÓNAC0
            </h2>
            <p className="text-neutral-400 mt-2 text-sm md:text-base">
              El pilar conceptual que guía cada paso operacional de nuestro equipo.
            </p>
          </div>

          {/* Visual Acronym Representation matching graphic slide */}
          <div className="max-w-5xl mx-auto bg-neutral-900 rounded-3xl p-6 md:p-12 border border-neutral-800 shadow-2xl relative overflow-hidden">
            {/* Top Words Row */}
            <div className="grid grid-cols-7 text-center gap-1 md:gap-2 mb-4">
              {IMPULSO_ITEMS.map((item, idx) => (
                <div key={idx} className="h-12 flex flex-col items-center justify-end pb-1">
                  {item.topWord && (
                    <span className="text-[11px] md:text-sm font-bold text-white tracking-tight leading-tight">
                      {item.topWord}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Red Connector Lines Top */}
            <div className="grid grid-cols-7 text-center gap-1 md:gap-2 mb-1">
              {IMPULSO_ITEMS.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center justify-center">
                  {item.topWord ? (
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D60303] shadow-[0_0_8px_#D60303]" />
                  ) : <div className="h-1.5" />}
                  {item.topWord && <div className="w-0.5 h-4 bg-[#D60303]" />}
                </div>
              ))}
            </div>

            {/* Red IMPULSO Bar */}
            <div className="bg-[#D60303] text-white rounded-xl py-4 md:py-6 shadow-xl relative z-10">
              <div className="grid grid-cols-7 text-center items-center font-black text-2xl sm:text-4xl md:text-6xl tracking-widest">
                {IMPULSO_ITEMS.map((item) => (
                  <span key={item.letter} className="drop-shadow-md">
                    {item.letter}
                  </span>
                ))}
              </div>
            </div>

            {/* Red Connector Lines Bottom */}
            <div className="grid grid-cols-7 text-center gap-1 md:gap-2 mt-1">
              {IMPULSO_ITEMS.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center justify-center">
                  {item.bottomWord && <div className="w-0.5 h-4 bg-[#D60303]" />}
                  {item.bottomWord ? (
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D60303] shadow-[0_0_8px_#D60303]" />
                  ) : <div className="h-1.5" />}
                </div>
              ))}
            </div>

            {/* Bottom Words Row */}
            <div className="grid grid-cols-7 text-center gap-1 md:gap-2 mt-2">
              {IMPULSO_ITEMS.map((item, idx) => (
                <div key={idx} className="h-12 flex flex-col items-center justify-start pt-1">
                  {item.bottomWord && (
                    <span className="text-[11px] md:text-sm font-bold text-white tracking-tight leading-tight">
                      {item.bottomWord}
                    </span>
                  )}
                </div>
              ))}
            </div>
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

      {/* Código Visual de Nuestra Cultura */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-20">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[#D60303] font-black uppercase text-xs tracking-widest flex items-center justify-center gap-1.5">
            <Palette className="h-4 w-4 text-[#D60303]" /> Identidad e Historia de Marca
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mt-1 uppercase">Código Visual de Nuestra Cultura</h2>
          <p className="text-sm md:text-base text-muted-foreground italic mt-3 max-w-2xl mx-auto">
            &ldquo;Los colores de Mónaco no solo identifican nuestra flota; definen la fuerza, la precisión y la integridad con la que movemos el futuro de la logística.&rdquo;
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {BRAND_COLORS.map((color) => (
            <div
              key={color.name}
              className="rounded-2xl border border-border bg-card p-6 shadow-card flex flex-col sm:flex-row gap-5 items-start transition hover:shadow-elegant"
            >
              {/* Color swatch */}
              <div className="flex flex-col items-center shrink-0 w-full sm:w-28">
                <div
                  style={color.bgStyle}
                  className="w-full h-20 sm:h-24 rounded-xl shadow-md flex items-center justify-center font-mono text-xs font-bold border border-black/10"
                />
                <span className="text-[11px] font-mono font-bold text-muted-foreground mt-2">{color.pantone}</span>
              </div>

              {/* Color info */}
              <div className="space-y-2 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-lg text-foreground">{color.name}</h3>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${color.badgeClass}`}>
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
          <h2 className="text-2xl md:text-4xl font-black uppercase">Forma parte de la experiencia Mónaco</h2>
          <p className="mt-3 text-primary-foreground/85 max-w-xl text-sm md:text-base">
            ¿Buscas un socio logístico guiado por la excelencia o deseas unirte a nuestro equipo?
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
