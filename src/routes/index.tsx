import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Truck, MapPin, ShieldCheck, Package, Snowflake, Users, Shield, Check, Layers, Sparkles } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import hero from "@/assets/logo_1.png";
import warehouse from "@/assets/warehouse.jpg";
import logoMark from "@/assets/logo-mark.png";
import { useSiteData } from "@/context/SiteDataContext";
import DynamicSections from "@/components/DynamicSections";

import cabezalImg from "@/assets/cabezales.png";
import fuso5Img from "@/assets/Unidades de 5 Ton.png";
import fuso12Img from "@/assets/Unidades de 12 Ton.png";
import isuzu2Img from "@/assets/Unidades de 2.7 Ton.png";
import liteace1Img from "@/assets/Panele 1 Ton .png";
import hiace15Img from "@/assets/Panel 1.5 Ton.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Logiservicios Mónaco | Transporte y Logística en Guatemala" },
      { name: "description", content: "Empresa guatemalteca de transporte y logística con cobertura en los 22 departamentos. Carga seca, carga refrigerada, distribución y almacenaje." },
      { property: "og:title", content: "Logiservicios Mónaco | Transporte y Logística en Guatemala" },
      { property: "og:description", content: "Cobertura nacional en los 22 departamentos de Guatemala. Transporte, carga refrigerada y distribución." },
    ],
  }),
  component: Home,
});

const TRUCK_CATALOG = [
  {
    id: "cabezales",
    name: "Cabezales",
    model: "Freightliner / Kenworth",
    capacity: "20 t - 23 t / 400 qq",
    dimensions: "45' x 8' | 53' - 48' x 8'",
    type: "Carga Pesada & Rastreros",
    refrigerated: false,
    image: cabezalImg,
    description: "Para transporte masivo e interdepartamental de gran tonelaje con furgones de 53'/48' o plataformas.",
  },
  {
    id: "fuso-5",
    name: "Unidades de 5 Ton / Fuso",
    model: "Mitsubishi Fuso",
    capacity: "5 t / 100 qq (y 10 t / 200 qq)",
    dimensions: "16' x 8' (y 24' x 8')",
    type: "Carga Seca & Carga Refrigerada",
    refrigerated: true,
    image: fuso5Img,
    description: "Versátiles para distribución mediana. Disponibles con furgón seco y equipo termoking para productos refrigerados.",
  },
  {
    id: "fuso-12",
    name: "Unidades de 12 Ton / Fuso FJ",
    model: "Fuso FJ",
    capacity: "12 t / 240 qq",
    dimensions: "24' x 8'",
    type: "Carga Seca Pesada",
    refrigerated: false,
    image: fuso12Img,
    description: "Capacidad de alto rendimiento para traslados industriales y distribución de volumen interurbana.",
  },
  {
    id: "isuzu-2",
    name: "Unidades de 2.7 Ton / Isuzu",
    model: "Isuzu NPR / NQR",
    capacity: "2.7 t / 50 qq",
    dimensions: "12' x 5'",
    type: "Distribución Mediana / Urbana",
    refrigerated: false,
    image: isuzu2Img,
    description: "Camión compacto diseñado para maniobrar fácilmente en rutas urbanas, mercados y plazas comerciales.",
  },
  {
    id: "liteace-1",
    name: "Panele 1 Ton / Lite Ace",
    model: "Toyota Lite Ace",
    capacity: "1 t / Mensajería",
    dimensions: "Formato panel compacto",
    type: "Mensajería & Distribución Ligera",
    refrigerated: false,
    image: liteace1Img,
    description: "Excelente economía y agilidad para envíos pequeños, paquetería y entregas inmediatas de ciudad.",
  },
  {
    id: "hiace-15",
    name: "Panel 1.5 Ton / Hiace",
    model: "Toyota Hiace",
    capacity: "1.5 t / Carga Ligera",
    dimensions: "Formato van mediano",
    type: "Repartos & Última Milla",
    refrigerated: false,
    image: hiace15Img,
    description: "Panel de mayor volumen interior ideal para rutas diarias de distribución comercial y logística urgente.",
  },
];

function Home() {
  const { siteData } = useSiteData();
  const [activeTab, setActiveTab] = useState<"catalog" | "specs">("catalog");

  const heroImage = siteData.branding?.heroBgUrl || hero;
  const warehouseImage = siteData.branding?.warehouseBgUrl || warehouse;
  const activeSections = (siteData.customSections || []).filter((s) => s.active !== false);

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-neutral-900 min-h-[600px] md:min-h-[700px]">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Logiservicios Mónaco"
            className="h-full w-full object-cover object-center"
            width={1792}
            height={1024}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 md:py-36 text-primary-foreground">
          <span className="inline-block px-3 py-1 rounded-full bg-gold text-gold-foreground text-xs font-semibold tracking-wide uppercase">
            {siteData.generalInfo?.heroBadge || "Logística Guatemala"}
          </span>
          <h1 className="mt-4 text-4xl md:text-6xl font-bold max-w-3xl leading-tight">
            {siteData.generalInfo?.heroTitle || "Movemos tu carga por toda Guatemala."}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-primary-foreground/90">
            {siteData.generalInfo?.heroSubtitle || "En Logiservicios Mónaco convertimos la logística en tu ventaja competitiva."}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contacto" className="inline-flex items-center gap-2 bg-white text-[#C00000] rounded-xl px-6 py-3 font-extrabold shadow-lg hover:bg-slate-100 transition">
              Solicitar cotización <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/filosofia" className="inline-flex items-center gap-2 border-2 border-white text-white rounded-xl px-6 py-3 font-bold hover:bg-white/10 transition">
              Nuestra Filosofía
            </Link>
          </div>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl">
            {[
              [siteData.generalInfo?.heroStat1Number || "22", siteData.generalInfo?.heroStat1Label || "Departamentos"],
              [siteData.generalInfo?.heroStat2Number || "24/7", siteData.generalInfo?.heroStat2Label || "Monitoreo"],
              [siteData.generalInfo?.heroStat3Number || "+10", siteData.generalInfo?.heroStat3Label || "Años de experiencia"],
              [siteData.generalInfo?.heroStat4Number || "100%", siteData.generalInfo?.heroStat4Label || "Compromiso"],
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
            { i: Truck, t: "Transporte de carga", d: "Unidades de distintos tonelajes para carga seca y refrigerada con control térmico." },
            { i: Package, t: "Distribución nacional", d: "Última milla en las principales ciudades y municipios del país." },
            { i: MapPin, t: "Rutas dedicadas", d: "Ajustamos horarios y logística integral a tus operaciones." },
            { i: ShieldCheck, t: "Carga asegurada", d: "Rastreo GPS en tiempo real y protocolo de seguridad 24/7." },
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

      {/* Nuestra Flota y Catálogo de Camiones */}
      <section className="bg-muted/40 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-gold font-semibold uppercase text-sm tracking-wider">Capacidades e infraestructura</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold">Nuestra flota de transporte</h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              Contamos con una variedad de unidades listas para adaptarse a cualquier exigencia de tonelaje, volumen y temperatura.
            </p>

            {/* Selector de vista */}
            <div className="mt-8 inline-flex p-1 rounded-xl bg-card border border-border shadow-sm">
              <button
                type="button"
                onClick={() => setActiveTab("catalog")}
                className={`flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                  activeTab === "catalog"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Truck className="h-4 w-4" />
                Catálogo visual de unidades
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("specs")}
                className={`flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                  activeTab === "specs"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Layers className="h-4 w-4" />
                Tabla de capacidades y medidas
              </button>
            </div>
          </div>

          {/* Vista 1: Catálogo Visual */}
          {activeTab === "catalog" && (() => {
            const fleetItems = siteData.fleet && siteData.fleet.length > 0 ? siteData.fleet : TRUCK_CATALOG.map(t => ({ id: t.id, title: t.name, capacity: t.capacity, description: t.description, image: t.image }));
            const gridCols = siteData.generalInfo?.fleetGridCols || "3";
            const alignment = siteData.generalInfo?.fleetAlignment || "center";

            let gridContainerClass = "grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
            if (gridCols === "2") {
              gridContainerClass = "grid gap-8 grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto";
            } else if (gridCols === "4") {
              gridContainerClass = "grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
            } else if (gridCols === "auto") {
              gridContainerClass = `flex flex-wrap gap-8 ${alignment === "center" ? "justify-center" : "justify-start"}`;
            }

            return (
              <div className={gridContainerClass}>
                {fleetItems.map((item) => (
                  <div
                    key={item.id}
                    className={`rounded-2xl border border-border bg-card overflow-hidden shadow-card hover:shadow-elegant transition-all duration-300 group flex flex-col ${
                      gridCols === "auto" ? "w-full sm:w-[320px] md:w-[360px] shrink-0" : ""
                    }`}
                  >
                    {/* Image container */}
                    <div className="relative h-56 md:h-60 bg-white overflow-hidden flex items-center justify-center p-3 border-b border-border">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-contain object-center group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                          onError={(e) => {
                            const target = e.currentTarget;
                            target.onerror = null;
                            target.src = "/fleet/cabezales.png";
                          }}
                        />
                      ) : (
                        <div className="h-full w-full bg-accent flex items-center justify-center text-muted-foreground font-semibold text-xs">
                          Sin imagen
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors text-center">
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-2 text-center line-clamp-3">
                          {item.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-border bg-muted/30 p-2.5 rounded-xl text-center">
                        <span className="block text-muted-foreground text-[10px] font-bold uppercase tracking-wider">Capacidad / Tonelaje</span>
                        <strong className="text-foreground text-xs font-bold block mt-0.5">{item.capacity}</strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}

          {/* Vista 2: Tablas de Capacidades y Dimensiones */}
          {activeTab === "specs" && (
            <div className="space-y-10">
              {/* Tabla Carga Seca */}
              <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
                <div className="bg-primary px-6 py-4 text-primary-foreground flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Truck className="h-5 w-5 text-gold" />
                    <h3 className="font-bold text-base md:text-lg">Flota Carga Seca (Capacidades y Dimensiones)</h3>
                  </div>
                  <span className="text-xs bg-white/10 px-3 py-1 rounded-full font-medium">9 Tipos de Unidades</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-muted text-muted-foreground text-left text-xs uppercase font-semibold">
                      <tr>
                        <th className="px-6 py-3.5">Tipo de unidad</th>
                        <th className="px-6 py-3.5">Capacidad (Ton / Quintales)</th>
                        <th className="px-6 py-3.5">Dimensiones (Largo × Ancho)</th>
                        <th className="px-6 py-3.5 text-right">Modalidad</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {[
                        ["Rastra", "23 t / 400 qq", "45' × 8'", "Carga Masiva"],
                        ["Furgón 53' / 48'", "20 t / 400 qq", "53' – 48' × 8'", "Volumen Alto"],
                        ["Doble eje", "15 t / 300 qq", "24' × 8'", "Carga Pesada"],
                        ["Camión 12 toneladas", "12 t / 240 qq", "24' × 8'", "Interurbano"],
                        ["Camión 10 toneladas", "10 t / 200 qq", "24' × 8'", "Distribución Nacional"],
                        ["Camión 5 toneladas", "5 t / 100 qq", "16' × 8'", "Distribución Mediana"],
                        ["Camión 2.7 toneladas", "2.7 t / 50 qq", "12' × 5'", "Acceso Urbano"],
                        ["Panel 1 t", "1 t", "Formatos Panel", "Urbano Compacto"],
                        ["Pickups / Mensajería", "Hasta 1 t", "Abierto / Cerrado", "Exprés"],
                      ].map(([u, c, d, m]) => (
                        <tr key={u} className="hover:bg-accent/40 transition-colors">
                          <td className="px-6 py-3.5 font-semibold text-foreground">{u}</td>
                          <td className="px-6 py-3.5 text-muted-foreground">{c}</td>
                          <td className="px-6 py-3.5 text-muted-foreground">{d}</td>
                          <td className="px-6 py-3.5 text-right font-medium text-xs text-primary">{m}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Tabla Carga Refrigerada */}
              <div className="rounded-xl border border-sky-200 dark:border-sky-900 bg-card shadow-card overflow-hidden">
                <div className="bg-sky-600 px-6 py-4 text-white flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Snowflake className="h-5 w-5" />
                    <h3 className="font-bold text-base md:text-lg">Flota Carga Refrigerada (Temperatura Controlada)</h3>
                  </div>
                  <span className="text-xs bg-white/20 px-3 py-1 rounded-full font-medium">Equipos Termoking</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-sky-50 dark:bg-sky-950/50 text-sky-900 dark:text-sky-200 text-left text-xs uppercase font-semibold">
                      <tr>
                        <th className="px-6 py-3.5">Tipo de unidad</th>
                        <th className="px-6 py-3.5">Capacidad (Ton / Quintales)</th>
                        <th className="px-6 py-3.5">Dimensiones (Largo × Ancho)</th>
                        <th className="px-6 py-3.5 text-right">Especificación</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {[
                        ["Camión 10 toneladas", "10 t / 200 qq", "24' × 8'", "Carga Refrigerada / Congelada"],
                        ["Camión 5 toneladas", "5 t / 100 qq", "16' × 8'", "Carga Refrigerada / Perecederos"],
                      ].map(([u, c, d, m]) => (
                        <tr key={u} className="hover:bg-sky-50/50 dark:hover:bg-sky-950/30 transition-colors">
                          <td className="px-6 py-3.5 font-semibold text-foreground flex items-center gap-2">
                            <Snowflake className="h-4 w-4 text-sky-500 shrink-0" />
                            {u}
                          </td>
                          <td className="px-6 py-3.5 text-muted-foreground">{c}</td>
                          <td className="px-6 py-3.5 text-muted-foreground">{d}</td>
                          <td className="px-6 py-3.5 text-right font-medium text-xs text-sky-600 dark:text-sky-400">{m}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
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
            { i: ShieldCheck, t: "Custodios en unidad", d: "Recomendado para mercancías sensibles o de alto valor." },
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

      {/* Sobre la empresa */}
      <section className="bg-muted/40 py-20">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          <img src={warehouseImage} alt="Bodega y operación logística" className="rounded-xl shadow-elegant w-full h-auto object-cover max-h-[450px]" width={1200} height={800} loading="lazy" />
          <div>
            <span className="text-gold font-semibold uppercase text-sm tracking-wider">La empresa</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold">Guatemaltecos moviendo a Guatemala</h2>
            <p className="mt-4 text-muted-foreground text-justify">
              Logiservicios Mónaco nace para ofrecer un servicio logístico confiable, transparente y a la medida de cada cliente. Combinamos experiencia, tecnología y compromiso humano para entregar resultados que impulsan tu negocio.
            </p>
            <Link to="/filosofia" className="mt-6 inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
              Conoce más sobre nuestra filosofía empresarial <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Secciones Dinámicas Personalizables */}
      <DynamicSections page="inicio" />

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="rounded-2xl bg-hero-gradient text-primary-foreground p-10 md:p-14 shadow-elegant text-center">
          <h2 className="text-3xl md:text-4xl font-bold">¿Listo para optimizar tu logística?</h2>
          <p className="mt-3 text-primary-foreground/85 max-w-xl mx-auto">Contáctanos hoy y recibe una propuesta a la medida de tu operación.</p>
          <Link to="/contacto" className="mt-6 inline-flex items-center gap-2 bg-white text-[#C00000] rounded-xl px-6 py-3 font-extrabold shadow-lg hover:bg-slate-100 transition">
            Hablemos <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}

