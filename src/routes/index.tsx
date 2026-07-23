import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Truck, MapPin, ShieldCheck, Package, Snowflake, Users, Shield } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import hero from "@/assets/logo_1.png";
import warehouse from "@/assets/warehouse.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Logiservicios Mónaco | Transporte y Logística en Guatemala" },
      { name: "description", content: "Empresa guatemalteca de transporte y logística con cobertura en los 22 departamentos. Carga, distribución, almacenaje y soluciones a la medida." },
      { property: "og:title", content: "Logiservicios Mónaco | Transporte y Logística en Guatemala" },
      { property: "og:description", content: "Cobertura nacional en los 22 departamentos de Guatemala. Transporte, distribución y almacenaje." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-neutral-900 min-h-[600px] md:min-h-[700px]">
        <div className="absolute inset-0">
          <img
            src={hero}
            alt="Camión de Logiservicios Mónaco en carretera de Guatemala con volcán al amanecer"
            className="h-full w-full object-cover object-center"
            width={1792}
            height={1024}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 md:py-36 text-primary-foreground">
          <span className="inline-block px-3 py-1 rounded-full bg-gold text-gold-foreground text-xs font-semibold tracking-wide uppercase">
            Logística Guatemala
          </span>
          <h1 className="mt-4 text-4xl md:text-6xl font-bold max-w-3xl leading-tight">
            Movemos tu carga por toda <span className="text-gold">Guatemala</span>.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-primary-foreground/90">
            En Logiservicios Mónaco convertimos la logística en tu ventaja competitiva. Cobertura a nivel nacional y un equipo comprometido con tu operación.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contacto" className="inline-flex items-center gap-2 bg-gold-gradient text-gold-foreground rounded-md px-6 py-3 font-semibold shadow-elegant hover:brightness-105 transition">
              Solicitar cotización <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/quienes-somos" className="inline-flex items-center gap-2 border border-white/30 text-primary-foreground rounded-md px-6 py-3 font-semibold hover:bg-white/10 transition">
              Conócenos
            </Link>
          </div>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl">
            {[
              ["22", "Departamentos"],
              ["24/7", "Monitoreo"],
              ["+10", "Años de experiencia"],
              ["100%", "Compromiso"],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="text-3xl font-bold text-gold">{n}</div>
                <div className="text-sm text-primary-foreground/75">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Nuestros servicios</h2>
        </div>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { i: Truck, t: "Transporte de carga", d: "Unidades de distintos tonelajes para carga seca y refrigerada." },
            { i: Package, t: "Distribución nacional", d: "Última milla en las principales ciudades y municipios del país." },
            { i: MapPin, t: "Rutas dedicadas", d: "Nos ajustamos a las necesidades de nuestros clientes." },
            { i: ShieldCheck, t: "Carga asegurada", d: "Protocolo de seguridad GPS." },
          ].map(({ i: Icon, t, d }) => (
            <div key={t} className="group rounded-xl border border-border bg-card p-6 shadow-card hover:shadow-elegant hover:-translate-y-1 transition">
              <div className="h-12 w-12 rounded-lg bg-gold-gradient flex items-center justify-center text-gold-foreground mb-4 group-hover:scale-110 transition">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-lg">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Nuestra flota */}
      <section className="bg-muted/40 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-gold font-semibold uppercase text-sm tracking-wider">Capacidades</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold">Nuestra flota</h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              Desde mensajería hasta rastras de 23 toneladas, con opción de carga seca o refrigerada.
            </p>
          </div>
          <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-card">
            <table className="w-full text-sm">
              <thead className="bg-primary text-primary-foreground">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">Tipo de unidad</th>
                  <th className="text-left px-4 py-3 font-semibold">Capacidad</th>
                  <th className="text-left px-4 py-3 font-semibold">Dimensiones (L × A)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  ["Rastra", "23 t / 400 qq", "45' × 8'"],
                  ["Furgón 53' / 48'", "20 t / 400 qq", "53' – 48' × 8'"],
                  ["Doble eje", "15 t / 300 qq", "24' × 8'"],
                  ["Camión 12 toneladas", "12 t / 240 qq", "24' × 8'"],
                  ["Camión 10 toneladas", "10 t / 200 qq", "24' × 8'"],
                  ["Camión 5 toneladas", "5 t / 100 qq", "16' × 8'"],
                  ["Camión 2.7 toneladas", "2.7 t / 50 qq", "12' × 5'"],
                  ["Panel 1 t / Pickups / Mensajería", "Hasta 1 t", "—"],
                ].map(([u, c, d]) => (
                  <tr key={u} className="hover:bg-accent/40 transition-colors">
                    <td className="px-4 py-3 font-medium">{u}</td>
                    <td className="px-4 py-3 text-muted-foreground">{c}</td>
                    <td className="px-4 py-3 text-muted-foreground">{d}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 text-sm">
            <Snowflake className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">
              <strong className="text-foreground">Carga refrigerada</strong> disponible en camiones de 5 y 10 toneladas.
            </span>
          </div>
        </div>
      </section>

      {/* Servicios adicionales */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-10">
          <span className="text-gold font-semibold uppercase text-sm tracking-wider">Complementos</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold">Servicios adicionales</h2>
        </div>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { i: Users, t: "Cuadrillas de carga y descarga", d: "Personal disponible para agilizar tu operación en origen y destino." },
            { i: Shield, t: "Vehículo de escolta", d: "Acompañamiento en ruta para trayectos que requieren mayor seguridad." },
            { i: ShieldCheck, t: "Custodios en unidad", d: "Recomendado para mercancíaa sensibles." },
            { i: Package, t: "Seguro completo de mercadería", d: "Cobertura ampliada opcional según el valor declarado de la carga." },
          ].map(({ i: Icon, t, d }) => (
            <div key={t} className="rounded-xl border border-border bg-card p-6 shadow-card hover:shadow-elegant hover:-translate-y-1 transition">
              <div className="h-11 w-11 rounded-lg bg-gold-gradient flex items-center justify-center text-gold-foreground mb-4">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>



      {/* Sobre */}
      <section className="bg-muted/40 py-20">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          <img src={warehouse} alt="Bodega y operación logística" className="rounded-xl shadow-elegant w-full h-auto" width={1200} height={800} loading="lazy" />
          <div>
            <span className="text-gold font-semibold uppercase text-sm tracking-wider">La empresa</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold">Guatemaltecos moviendo a Guatemala</h2>
            <p className="mt-4 text-muted-foreground">
              Logiservicios Mónaco nace para ofrecer un servicio logístico confiable, transparente y a la medida de cada cliente. Combinamos experiencia, tecnología y compromiso humano para entregar resultados que impulsan tu negocio.
            </p>
            <Link to="/quienes-somos" className="mt-6 inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
              Conoce más sobre nosotros <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="rounded-2xl bg-hero-gradient text-primary-foreground p-10 md:p-14 shadow-elegant text-center">
          <h2 className="text-3xl md:text-4xl font-bold">¿Listo para optimizar tu logística?</h2>
          <p className="mt-3 text-primary-foreground/85 max-w-xl mx-auto">Contáctanos hoy y recibe una propuesta a la medida de tu operación.</p>
          <Link to="/contacto" className="mt-6 inline-flex items-center gap-2 bg-gold-gradient text-gold-foreground rounded-md px-6 py-3 font-semibold hover:brightness-105">
            Hablemos <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
