import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Send, MessageCircle } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";

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

      <section className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-4">
          {[
            { i: Phone, t: "Teléfono", v: "+502 4017-5893" },
            { i: Mail, t: "Correo", v: "info@logiserviciosmonaco.com" },
            { i: MapPin, t: "Dirección", v: "17av. 45-35 avenida petapa zona 12 Ciudad de Guatemala, Guatemala" },
            { i: MessageCircle, t: "Chat en línea", v: "Usa Mónaco Bot ↘" },
          ].map(({ i: Icon, t, v }) => (
            <div key={t} className="rounded-xl bg-card border border-border p-5 shadow-card flex gap-3">
              <div className="h-10 w-10 rounded-lg bg-gold-gradient text-gold-foreground flex items-center justify-center shrink-0">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{t}</div>
                <div className="font-medium">{v}</div>
              </div>
            </div>
          ))}
        </div>

        <form action="https://formspree.io/f/xzdndgdq" method="POST" className="md:col-span-2 rounded-xl border border-border bg-card p-6 md:p-8 shadow-elegant space-y-4">
          <h2 className="text-2xl font-bold">Solicita tu cotización</h2>
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
