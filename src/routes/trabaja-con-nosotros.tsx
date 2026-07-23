import { createFileRoute } from "@tanstack/react-router";
import { Send, Briefcase, Mail } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";

export const Route = createFileRoute("/trabaja-con-nosotros")({
  head: () => ({
    meta: [
      { title: "Únete al equipo | Logiservicios Mónaco" },
      { name: "description", content: "Únete al equipo de Logiservicios Mónaco. Aplica como piloto, transportista o personal administrativo." },
      { property: "og:title", content: "Únete al equipo | Logiservicios Mónaco" },
      { property: "og:description", content: "Postúlate y forma parte de nuestro equipo logístico en Guatemala." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <SiteLayout>
      <section className="bg-hero-gradient text-primary-foreground py-20">
        <div className="max-w-5xl mx-auto px-4">
          <span className="text-gold font-semibold uppercase text-sm tracking-wider">Oportunidades laborales</span>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold">Únete al equipo</h1>
          <p className="mt-4 max-w-2xl text-primary-foreground/85">
            Buscamos pilotos, transportistas y personal comprometido con la excelencia. Envíanos tu información y nuestro equipo de reclutamiento te contactará.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="mb-8 flex items-center gap-3">
          <div className="h-12 w-12 rounded-lg bg-gold-gradient text-gold-foreground flex items-center justify-center">
            <Briefcase className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Formulario de aplicación</h2>
            <p className="text-sm text-muted-foreground">Completa tus datos y comparte el enlace a tu CV o portafolio.</p>
          </div>
        </div>

        <form
          action="https://formspree.io/f/xwvglayw"
          method="POST"
          className="rounded-xl border border-border bg-card p-6 md:p-8 shadow-elegant space-y-5"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Nombre completo" name="nombre" required />
            <Field label="Correo electrónico" name="correo" type="email" required />
            <Field label="Teléfono de contacto" name="telefono" type="tel" required />
            <Field label="Puesto al que aplica / Tipo de transporte" name="puesto" required placeholder="Ej: Piloto trailero, Auxiliar de bodega..." />
          </div>

          <div>
            <label className="text-sm font-medium">Mensaje / Presentación</label>
            <textarea
              name="mensaje" rows={5} required
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Cuéntanos sobre tu experiencia, licencias, disponibilidad..."
            />
          </div>

          <div>
            <label className="text-sm font-medium">Enlace a tu CV (opcional)</label>
            <input
              type="url" name="enlace_cv"
              placeholder="https://drive.google.com/..."
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <p className="mt-1 text-xs text-muted-foreground">
              Si lo deseas, sube tu CV a Google Drive, Dropbox u OneDrive y pega aquí el enlace público. Verifica que el enlace tenga permiso de visualización.
            </p>
          </div>

          <div className="pt-3 pb-1 border-t border-border mt-4">
            <p className="text-sm font-medium text-foreground flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              O comunícate con nosotros por medio de correo electrónico:
            </p>
            <div className="mt-2.5 flex flex-wrap gap-2 md:gap-3 text-sm font-medium">
              <a
                href="mailto:recursoshumanos@logiserviciosmonaco.com"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-accent/60 text-primary hover:bg-accent hover:border-primary/30 transition"
              >
                <Mail className="h-3.5 w-3.5 text-gold" />
                recursoshumanos@logiserviciosmonaco.com
              </a>
              <a
                href="mailto:reclutamiento@grupo-sitsa.com"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-accent/60 text-primary hover:bg-accent hover:border-primary/30 transition"
              >
                <Mail className="h-3.5 w-3.5 text-gold" />
                reclutamiento@grupo-sitsa.com
              </a>
            </div>
          </div>

          <div className="pt-2">
            <button type="submit" className="inline-flex items-center gap-2 bg-gold-gradient text-gold-foreground rounded-md px-6 py-3 font-semibold hover:brightness-105 shadow-card">
              Enviar aplicación <Send className="h-4 w-4" />
            </button>
          </div>
        </form>
      </section>
    </SiteLayout>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input {...props}
        className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
    </div>
  );
}

