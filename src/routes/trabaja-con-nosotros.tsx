import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Send, Briefcase, Mail, MapPin, Award, CheckCircle2, Calendar, MessageCircle, Eye, X, Sparkles } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import { useSiteData, Vacancy } from "@/context/SiteDataContext";
import DynamicSections from "@/components/DynamicSections";

export const Route = createFileRoute("/trabaja-con-nosotros")({
  head: () => ({
    meta: [
      { title: "Únete al equipo y Plazas Disponibles | Logiservicios Mónaco" },
      { name: "description", content: "Conoce nuestras plazas disponibles para pilotos de cabezales, 5TN y 10TN en Guatemala. Aplica directamente con nosotros." },
      { property: "og:title", content: "Plazas Disponibles | Logiservicios Mónaco" },
      { property: "og:description", content: "Postúlate como piloto de transporte pesado o distribución. Oportunidades laborales activas en Guatemala." },
    ],
  }),
  component: Page,
});

function Page() {
  const { siteData } = useSiteData();
  const vacancies = siteData.vacancies.filter((v) => v.active !== false);
  const contact = siteData.contactInfo;

  const [selectedFlyer, setSelectedFlyer] = useState<Vacancy | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<string>("");

  const handleSelectPosition = (title: string) => {
    setSelectedPosition(title);
    const formElement = document.getElementById("formulario-aplicacion");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const heroTitle = siteData.generalInfo?.trabajaHeroTitle || "Únete a Nuestro Equipo";
  const heroSubtitle = siteData.generalInfo?.trabajaHeroSubtitle || "Forma parte de la red logística líder en Guatemala. Buscamos pilotos profesionales de transporte pesado y distribución comprometidos con la excelencia.";

  const gridCols = siteData.generalInfo?.vacanciesGridCols || "3";
  const alignment = siteData.generalInfo?.vacanciesAlignment || "center";

  let gridContainerClass = "grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
  if (gridCols === "1") {
    gridContainerClass = "grid gap-8 grid-cols-1 max-w-2xl mx-auto";
  } else if (gridCols === "2") {
    gridContainerClass = "grid gap-8 grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto";
  } else if (gridCols === "auto") {
    gridContainerClass = `flex flex-wrap gap-8 ${alignment === "center" ? "justify-center" : "justify-start"}`;
  }

  return (
    <SiteLayout>
      {/* Hero Header */}
      <section className="bg-hero-gradient text-primary-foreground py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4 text-center md:text-left">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/20 text-gold font-semibold uppercase text-xs tracking-wider border border-gold/30">
            <Sparkles className="h-3.5 w-3.5" /> Oportunidades Laborales Activas
          </span>
          <h1 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight">{heroTitle}</h1>
          <p className="mt-4 max-w-2xl text-primary-foreground/85 text-base md:text-lg">
            {heroSubtitle}
          </p>
        </div>
      </section>

      {/* Active Job Vacancies (Plazas Disponibles) */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-primary font-bold uppercase text-xs tracking-widest">Contratación Inmediata</span>
            <h2 className="text-3xl font-extrabold text-foreground mt-1">Plazas Disponibles</h2>
            <p className="text-muted-foreground mt-1">
              Conoce los requisitos de nuestras plazas abiertas y postúlate directamente por WhatsApp, correo o nuestro formulario.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3 py-1.5 rounded-full border border-emerald-500/20 w-fit">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Recibiendo solicitudes
          </div>
        </div>

        {/* Job Cards Grid */}
        <div className={gridContainerClass}>
          {vacancies.map((vacancy) => {
            const waNumber = vacancy.whatsappNumber || contact.whatsappRRHH || "50230137849";
            return (
              <div
                key={vacancy.id}
                className={`group rounded-2xl border border-border bg-card shadow-card hover:shadow-elegant transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                  gridCols === "auto" ? "w-full sm:w-[320px] md:w-[350px] shrink-0" : ""
                }`}
              >
                <div>
                  {/* Header Banner & Image Thumbnail */}
                  <div className="relative bg-neutral-900 h-48 overflow-hidden group">
                    {vacancy.flyerImage ? (
                      <img
                        src={vacancy.flyerImage}
                        alt={`Afiche de ${vacancy.title}`}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary to-neutral-800 flex items-center justify-center p-4 text-center text-white">
                        <Briefcase className="h-12 w-12 text-gold opacity-80" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    
                    {/* Badge & Zoom Action */}
                    <div className="absolute top-3 right-3 flex items-center gap-2">
                      {vacancy.flyerImage && (
                        <button
                          onClick={() => setSelectedFlyer(vacancy)}
                          className="inline-flex items-center gap-1.5 bg-black/60 hover:bg-primary text-white text-xs font-medium px-2.5 py-1 rounded-lg backdrop-blur-md transition shadow-md"
                          title="Ver afiche oficial"
                        >
                          <Eye className="h-3.5 w-3.5" /> Ver Afiche
                        </button>
                      )}
                    </div>

                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="inline-block bg-primary text-primary-foreground font-bold text-[11px] px-2.5 py-0.5 rounded-md uppercase tracking-wider mb-1">
                        Plaza Disponible
                      </span>
                      <h3 className="text-xl font-bold text-white drop-shadow-sm">{vacancy.title}</h3>
                    </div>
                  </div>

                  {/* Key Details Pills */}
                  <div className="p-5 space-y-4">
                    <div className="space-y-2 text-xs text-foreground/90">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span><strong>Ubicación:</strong> {vacancy.location}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Award className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                        <span><strong>Requisito:</strong> {vacancy.license}</span>
                      </div>
                    </div>

                    {/* Requisitos List */}
                    <div className="border-t border-border pt-3">
                      <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Requisitos Clave</h4>
                      <ul className="space-y-1.5 text-xs text-muted-foreground">
                        {(vacancy.requirements ?? []).map((req, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Beneficios List */}
                    <div className="border-t border-border pt-3">
                      <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Beneficios</h4>
                      <ul className="space-y-1.5 text-xs text-muted-foreground">
                        {(vacancy.offers ?? []).map((off, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Calendar className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                            <span>{off}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-5 pt-0 space-y-2">
                  <a
                    href={`https://wa.me/${waNumber}?text=${encodeURIComponent(`Hola, quisiera más información y postularme para la plaza disponible de: ${vacancy.title}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs py-2.5 px-4 rounded-lg transition shadow-sm"
                  >
                    <MessageCircle className="h-4 w-4" /> Aplicar por WhatsApp
                  </a>
                  
                  <button
                    onClick={() => handleSelectPosition(vacancy.title)}
                    className="w-full inline-flex items-center justify-center gap-2 bg-accent/80 hover:bg-accent text-accent-foreground font-semibold text-xs py-2 px-4 rounded-lg border border-border transition"
                  >
                    Llenar Formulario Web
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Application Form Section */}
      <section id="formulario-aplicacion" className="max-w-4xl mx-auto px-4 pb-20 pt-8">
        <div className="mb-8 flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-gold-gradient text-gold-foreground flex items-center justify-center shadow-md">
            <Briefcase className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Formulario de Aplicación Directa</h2>
            <p className="text-sm text-muted-foreground">Completa tus datos y nuestro equipo de reclutamiento te evaluará a la brevedad.</p>
          </div>
        </div>

        <form
          action="https://formspree.io/f/xwvglayw"
          method="POST"
          className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-elegant space-y-5"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Nombre completo" name="nombre" required placeholder="Ej: Juan Pérez" />
            <Field label="Correo electrónico" name="correo" type="email" required placeholder="tu@correo.com" />
            <Field label="Teléfono de contacto" name="telefono" type="tel" required placeholder="Ej: 5555-5555" />
            
            <div>
              <label className="text-sm font-medium">Puesto o Plaza al que aplica</label>
              <select
                name="puesto"
                value={selectedPosition}
                onChange={(e) => setSelectedPosition(e.target.value)}
                required
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">-- Selecciona una plaza --</option>
                {vacancies.map((vacancy) => (
                  <option key={vacancy.id} value={vacancy.title}>
                    {vacancy.title}
                  </option>
                ))}
                <option value="Otro puesto / Transporte">Otro puesto o transporte</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Mensaje / Presentación o Experiencia</label>
            <textarea
              name="mensaje"
              rows={4}
              required
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Indica tu edad, tipo de licencia, años de experiencia conduciendo y disponibilidad..."
            />
          </div>

          <div>
            <label className="text-sm font-medium">Enlace a tu CV (opcional)</label>
            <input
              type="url"
              name="enlace_cv"
              placeholder="https://drive.google.com/..."
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <p className="mt-1 text-xs text-muted-foreground">
              Puedes adjuntar un enlace público de Google Drive, Dropbox u OneDrive con tu currículum vitae.
            </p>
          </div>

          <div className="pt-4 border-t border-border mt-4">
            <p className="text-sm font-medium text-foreground flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              O también puedes enviar tu CV directamente por correo electrónico:
            </p>
            <div className="mt-3 flex flex-wrap gap-2 md:gap-3 text-xs md:text-sm font-medium">
              <a
                href="mailto:recursoshumanos@logiserviciosmonaco.com?subject=Aplicación%20de%20empleo"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-border bg-accent/60 text-primary hover:bg-accent hover:border-primary/30 transition shadow-xs"
              >
                <Mail className="h-4 w-4 text-gold" />
                recursoshumanos@logiserviciosmonaco.com
              </a>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 bg-gold-gradient text-gold-foreground rounded-lg px-6 py-3 font-semibold hover:brightness-105 shadow-card w-full md:w-auto"
            >
              Enviar mi Aplicación <Send className="h-4 w-4" />
            </button>
          </div>
        </form>
      </section>

      {/* Modal Flyer Viewer */}
      {selectedFlyer && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedFlyer(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-card rounded-2xl overflow-hidden shadow-2xl border border-border"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-muted/40">
              <h3 className="font-bold text-sm text-foreground">Afiche Oficial - {selectedFlyer.title}</h3>
              <button
                onClick={() => setSelectedFlyer(null)}
                className="p-1 rounded-full hover:bg-accent text-muted-foreground hover:text-foreground transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-2 bg-black flex items-center justify-center max-h-[80vh]">
              <img
                src={selectedFlyer.flyerImage}
                alt={`Afiche de ${selectedFlyer.title}`}
                className="max-h-[75vh] w-auto object-contain rounded"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-4 bg-card border-t border-border flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs text-muted-foreground">
                Envía tu CV a <strong>recursoshumanos@logiserviciosmonaco.com</strong> con el asunto &quot;{selectedFlyer.subjectEmail}&quot;
              </span>
              <a
                href={`https://wa.me/50230137849?text=${encodeURIComponent(`Hola, vi el afiche de ${selectedFlyer.title} y deseo postularme.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-emerald-600 text-white font-semibold text-xs px-3 py-1.5 rounded-lg hover:bg-emerald-700 transition"
              >
                <MessageCircle className="h-3.5 w-3.5" /> WhatsApp 3013-7849
              </a>
            </div>
          </div>
        </div>
      )}

      <DynamicSections page="trabaja" />
    </SiteLayout>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input
        {...props}
        className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </div>
  );
}


