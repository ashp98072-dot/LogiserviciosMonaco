import { createFileRoute } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import mapImg from "@/assets/guatemala-map.jpg";
import { useSiteData } from "@/context/SiteDataContext";
import DynamicSections from "@/components/DynamicSections";

const DEPARTAMENTOS = [
  "Guatemala", "Sacatepéquez", "Chimaltenango", "Escuintla",
  "Santa Rosa", "Sololá", "Totonicapán", "Quetzaltenango",
  "Suchitepéquez", "Retalhuleu", "San Marcos", "Huehuetenango",
  "Quiché", "Baja Verapaz", "Alta Verapaz", "Petén",
  "Izabal", "Zacapa", "Chiquimula", "Jalapa",
  "Jutiapa", "El Progreso",
];

export const Route = createFileRoute("/cobertura")({
  head: () => ({
    meta: [
      { title: "Cobertura Nacional | Logiservicios Mónaco" },
      { name: "description", content: "Cobertura logística en los 22 departamentos de Guatemala. Consulta las regiones donde operamos." },
      { property: "og:title", content: "Cobertura Nacional | Logiservicios Mónaco" },
      { property: "og:description", content: "Operamos en los 22 departamentos de Guatemala." },
    ],
  }),
  component: Page,
});

function Page() {
  const { siteData } = useSiteData();
  const mapImage = siteData.branding?.coberturaMapUrl || mapImg;

  return (
    <SiteLayout>
      <section className="bg-hero-gradient text-primary-foreground py-20">
        <div className="max-w-5xl mx-auto px-4">
          <span className="text-gold font-semibold uppercase text-sm tracking-wider">Logística Guatemala</span>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold">
            {siteData.generalInfo?.coberturaHeroTitle || "Cobertura en todo el país"}
          </h1>
          <p className="mt-4 max-w-2xl text-primary-foreground/85 text-justify">
            {siteData.generalInfo?.coberturaHeroSubtitle || siteData.generalInfo?.coberturaText || "Movemos tu carga a los 22 departamentos de Guatemala, desde la costa hasta el altiplano y el oriente."}
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
        <img src={mapImage} alt="Mapa de Guatemala con rutas de Logiservicios Mónaco" className="rounded-xl shadow-elegant w-full" width={1200} height={900} loading="lazy" />
        <div>
          <h2 className="text-3xl font-bold">Departamentos que atendemos</h2>
          <p className="mt-3 text-muted-foreground">Servicio de transporte y distribución en todas las regiones del país.</p>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-2">
            {DEPARTAMENTOS.map((d) => (
              <div key={d} className="flex items-center gap-2 rounded-md bg-card border border-border px-3 py-2 shadow-card">
                <MapPin className="h-4 w-4 text-gold shrink-0" />
                <span className="text-sm font-medium">{d}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DynamicSections page="cobertura" />
    </SiteLayout>
  );
}
