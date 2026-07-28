import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Send, MessageCircle } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import { useSiteData } from "@/context/SiteDataContext";
import DynamicSections from "@/components/DynamicSections";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto | Logiservicios Mónaco" },
      { name: "description", content: "Contáctanos para cotizar tus servicios de transporte y logística en Guatemala. Estamos para atenderte." },
      { property: "og:title", content: "Contacto | Logiservicios Mónaco" },
      { property: "og:description", content: "Cotiza tus servicios logísticos en Guatemala." },
    ],
  }),
  component: Page,
});

function Page() {
  const { siteData } = useSiteData();
  const contact = siteData.contactInfo;
  const mapPos = contact.mapPosition || "bottom";

  return (
    <SiteLayout>
      <section className="bg-hero-gradient text-primary-foreground py-20">
        <div className="max-w-5xl mx-auto px-4">
          <span className="text-gold font-semibold uppercase text-sm tracking-wider">Estamos para servirte</span>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold">Contáctanos</h1>
          <p className="mt-4 max-w-2xl text-primary-foreground/85">
            Cuéntanos sobre tu operación y te enviaremos una propuesta a la medida.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12 space-y-8">
        {/* Map on Top */}
        {contact.showMap !== false && mapPos === "top" && (
          <MapComponent contact={contact} />
        )}

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-4">
            {[
              { i: Phone, t: "Teléfono", v: contact.phone },
              { i: Mail, t: "Correo", v: contact.emailInfo },
              { i: MapPin, t: "Dirección", v: contact.address },
              { i: MessageCircle, t: "Chat en línea", v: "Usa Mónaco Bot ↘" },
            ].map(({ i: Icon, t, v }) => (
              <div key={t} className="rounded-xl bg-card border border-border p-5 shadow-card flex gap-3">
                <div className="h-10 w-10 rounded-lg bg-gold-gradient text-gold-foreground flex items-center justify-center shrink-0">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{t}</div>
                  <div className="font-medium text-sm">{v}</div>
                </div>
              </div>
            ))}

            {/* Map in Sidebar */}
            {contact.showMap !== false && mapPos === "sidebar" && (
              <MapComponent contact={contact} />
            )}
          </div>

          <form action={contact.formspreeUrl || "https://formspree.io/f/xzdndgdq"} method="POST" className="md:col-span-2 rounded-xl border border-border bg-card p-6 md:p-8 shadow-elegant space-y-4">
            <h2 className="text-2xl font-bold">{contact.formTitle || "Solicita tu cotización"}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Nombre" name="nombre" required />
              <Field label="Empresa" name="empresa" />
              <Field label="Correo" name="correo" type="email" required />
              <Field label="Teléfono" name="telefono" />
            </div>
            <div>
              <label className="text-sm font-medium">Mensaje</label>
              <textarea
                name="mensaje" required rows={5}
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Cuéntanos qué necesitas mover, origen, destino y frecuencia..."
              />
            </div>
            <button type="submit" className="inline-flex items-center gap-2 bg-gold-gradient text-gold-foreground rounded-md px-6 py-3 font-semibold hover:brightness-105 shadow-card">
              Enviar solicitud <Send className="h-4 w-4" />
            </button>
          </form>
        </div>

        {/* Map on Bottom */}
        {contact.showMap !== false && mapPos === "bottom" && (
          <MapComponent contact={contact} />
        )}
      </section>

      <DynamicSections page="contacto" />
    </SiteLayout>
  );
}

function MapComponent({ contact }: { contact: any }) {
  const embedUrl = contact.mapEmbedUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.423985108253!2d-90.5367!3d14.575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8589a3f25c78278b%3A0x6bd6c666f0e4b868!2sCalzada%20Atanasio%20Tzul%2C%20Ciudad%20de%20Guatemala!5e0!3m2!1ses!2sgt!4v1710000000000!5m2!1ses!2sgt";
  const height = contact.mapHeight || "350px";

  return (
    <div className="rounded-xl overflow-hidden border border-border shadow-card bg-card">
      <div className="p-3 bg-muted/40 border-b border-border flex items-center justify-between">
        <span className="text-xs font-bold flex items-center gap-1.5 text-foreground">
          <MapPin className="h-4 w-4 text-gold" /> Ubicación: {contact.address || "Calzada Atanasio Tzul, Guatemala"}
        </span>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address || "Calzada Atanasio Tzul, Guatemala")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] font-semibold text-primary hover:underline"
        >
          Abrir en Google Maps ↗
        </a>
      </div>
      <iframe
        src={embedUrl}
        width="100%"
        height={height}
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Ubicación en Google Maps"
        className="w-full"
      />
    </div>
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
