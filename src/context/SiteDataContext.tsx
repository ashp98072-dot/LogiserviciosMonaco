import React, { createContext, useContext, useState, useEffect } from "react";

// Default images imports
import logoImg from "@/assets/logo.png";
import heroImg from "@/assets/logo_1.png";
import warehouseImg from "@/assets/warehouse.jpg";
import mapImg from "@/assets/guatemala-map.jpg";

import cabezalImg from "@/assets/cabezales.png";
import fuso5Img from "@/assets/Unidades de 5 Ton.png";
import fuso12Img from "@/assets/Unidades de 12 Ton.png";
import isuzu2Img from "@/assets/Unidades de 2.7 Ton.png";
import liteace1Img from "@/assets/Panele 1 Ton .png";
import hiace15Img from "@/assets/Panel 1.5 Ton.png";

export interface ContactInfo {
  phone: string;
  whatsappMain: string;
  whatsappRRHH: string;
  emailInfo: string;
  emailRRHH: string;
  address: string;
  facebookUrl: string;
  schedule: string;
  formTitle?: string;
  showMap?: boolean;
  mapEmbedUrl?: string;
  mapPosition?: "top" | "bottom" | "sidebar";
  mapHeight?: string;
}

export interface Vacancy {
  id: string;
  title: string;
  location: string;
  license: string;
  salary: string;
  flyerImage: string;
  subjectEmail: string;
  whatsappNumber: string;
  emailContact: string;
  requirements: string[];
  offers: string[];
  active: boolean;
}

export interface FleetItem {
  id: string;
  title: string;
  capacity: string;
  description: string;
  image: string;
  dimensions?: string;
  modality?: string;
  category?: "seca" | "refrigerada";
}

export interface GeneralInfo {
  heroTitle: string;
  heroSubtitle: string;
  heroBadge?: string;
  heroStat1Number?: string;
  heroStat1Label?: string;
  heroStat2Number?: string;
  heroStat2Label?: string;
  heroStat3Number?: string;
  heroStat3Label?: string;
  heroStat4Number?: string;
  heroStat4Label?: string;
  misionText: string;
  visionText: string;
  coberturaText: string;
  trabajaHeroTitle?: string;
  trabajaHeroSubtitle?: string;
  coberturaHeroTitle?: string;
  coberturaHeroSubtitle?: string;
  quienesSomosHeroTitle?: string;
  quienesSomosHeroSubtitle?: string;
  contactoHeroTitle?: string;
  contactoHeroSubtitle?: string;
  fleetGridCols?: "2" | "3" | "4" | "auto";
  fleetAlignment?: "center" | "left";
  vacanciesGridCols?: "1" | "2" | "3" | "auto";
  vacanciesAlignment?: "center" | "left";
}

export interface Branding {
  logoUrl: string;
  heroBgUrl: string;
  warehouseBgUrl: string;
  coberturaMapUrl: string;
}

export interface CustomSection {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  imageUrl: string;
  mediaType?: "image" | "video";
  videoUrl?: string;
  buttonText: string;
  buttonUrl: string;
  layoutStyle: "text-left" | "text-right" | "card" | "banner" | "video" | "features" | "stats";
  bgStyle: "light" | "dark" | "gold";
  active: boolean;
  order: number;
  pageTarget?: "inicio" | "quienes-somos" | "cobertura" | "trabaja" | "contacto" | "todas";
  featuresList?: string[];
  statsList?: { label: string; value: string }[];
  titleColor?: "default" | "gold" | "primary" | "white" | "red" | "black";
  subtitleColor?: "gold" | "primary" | "white" | "muted" | "red";
  textColor?: "default" | "muted" | "white" | "dark";
  fontFamily?: "sans" | "serif" | "mono" | "display";
  titleSize?: "normal" | "large" | "huge";
  textAlignment?: "left" | "center" | "right";
}

export interface SiteData {
  contactInfo: ContactInfo;
  vacancies: Vacancy[];
  fleet: FleetItem[];
  generalInfo: GeneralInfo;
  branding: Branding;
  customSections: CustomSection[];
  updatedAt?: string;
}

const DEFAULT_BRANDING: Branding = {
  logoUrl: logoImg,
  heroBgUrl: heroImg,
  warehouseBgUrl: warehouseImg,
  coberturaMapUrl: mapImg,
};

const DEFAULT_CUSTOM_SECTIONS: CustomSection[] = [];

const DEFAULT_CONTACT_INFO: ContactInfo = {
  phone: "+502 3473 5996",
  whatsappMain: "50234735996",
  whatsappRRHH: "50230137849",
  emailInfo: "info@logiserviciosmonaco.com",
  emailRRHH: "recursoshumanos@logiserviciosmonaco.com",
  address: "17 Ave. 45-35, Avenida Petapa, Zona 12, Ciudad de Guatemala, Guatemala",
  facebookUrl: "https://www.facebook.com/share/1CirGxQ8no/",
  schedule: "Lunes a Viernes: 8:00 AM - 5:00 PM | Sábados: 8:00 AM - 12:00 PM",
  formTitle: "Solicita tu cotización",
  showMap: true,
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.559631403319!2d-90.55295749999999!3d14.567157199999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8589a11b33260bfb%3A0x55b9abd2a7a13cf4!2sColonia%20La%20Colina!5e0!3m2!1ses-419!2sgt!4v1785247597819!5m2!1ses-419!2sgt",
  mapPosition: "bottom",
  mapHeight: "350px",
};

const DEFAULT_VACANCIES: Vacancy[] = [
  {
    id: "cabezales",
    title: "Piloto de Cabezales",
    location: "Ciudad de Guatemala, Zona 12 (Petapa)",
    license: "Licencia Tipo A vigente",
    salary: "Q8,000.00 / mes",
    flyerImage: "/vacancies/piloto-cabezales.png",
    subjectEmail: "Piloto cabezal",
    whatsappNumber: "50230137849",
    emailContact: "recursoshumanos@logiserviciosmonaco.com",
    requirements: [
      "Hombre de 25 a 40 años",
      "Licencia tipo A vigente",
      "Ideal nivel diversificado",
      "Experiencia mínima de 2 años comprobable",
      "Responsable, trabajo en equipo, ética y comunicación",
      "Residir en La Petapa, Ciudad de Guatemala o alrededores",
    ],
    offers: [
      "Estabilidad laboral",
      "Viáticos",
      "Prestaciones laborales completas",
      "Horario de lunes a sábado",
    ],
    active: true,
  },
  {
    id: "5tn",
    title: "Piloto de 5 a 8 Toneladas",
    location: "Ciudad de Guatemala, Zona 12 (Petapa)",
    license: "Licencia Tipo A o B vigente",
    salary: "Q5,500.00 - Q6,500.00 / mes",
    flyerImage: "/vacancies/piloto-5-ton.png",
    subjectEmail: "Piloto 5 a 8 Toneladas",
    whatsappNumber: "50230137849",
    emailContact: "recursoshumanos@logiserviciosmonaco.com",
    requirements: [
      "Hombre de 22 a 40 años",
      "Licencia tipo A o B vigente",
      "Ideal nivel diversificado",
      "Experiencia mínima de 2 años en unidades de 5 a 8 ton",
      "Manejo de caja de 6 velocidades y freno de aire",
      "Residir en La Petapa, Ciudad de Guatemala o alrededores",
    ],
    offers: [
      "Estabilidad laboral",
      "Viáticos",
      "Prestaciones de ley",
      "Horario de lunes a sábado",
    ],
    active: true,
  },
  {
    id: "10tn",
    title: "Piloto de 10 a 12 Toneladas",
    location: "Ciudad de Guatemala, Zona 12 (Petapa)",
    license: "Licencia Tipo A o B vigente",
    salary: "Q6,000.00 - Q7,000.00 / mes",
    flyerImage: "/vacancies/piloto-10-ton.png",
    subjectEmail: "Piloto 10 a 12 Toneladas",
    whatsappNumber: "50230137849",
    emailContact: "recursoshumanos@logiserviciosmonaco.com",
    requirements: [
      "Hombre de 22 a 40 años",
      "Licencia tipo A o B vigente",
      "Ideal nivel diversificado",
      "Experiencia mínima de 2 años comprobable",
      "Responsable y enfocado en trabajo en equipo",
      "Residir cerca de Petapa, Zona 12 o alrededores",
    ],
    offers: [
      "Estabilidad laboral",
      "Viáticos",
      "Prestaciones de ley",
      "Horario de lunes a sábado",
    ],
    active: true,
  },
];

const DEFAULT_FLEET: FleetItem[] = [
  {
    id: "cabezales",
    title: "Cabezales / Rastra",
    capacity: "23 t / 400 qq",
    dimensions: "45' × 8'",
    modality: "Carga Masiva",
    category: "seca",
    description: "Unidades de alto rendimiento para transporte interurbano y de contenedores.",
    image: cabezalImg,
  },
  {
    id: "12ton",
    title: "Camión 12 Toneladas",
    capacity: "12 t / 240 qq",
    dimensions: "24' × 8'",
    modality: "Interurbano",
    category: "seca",
    description: "Camiones Fuso / Isuzu de gran capacidad para distribución masiva.",
    image: fuso12Img,
  },
  {
    id: "5ton",
    title: "Camión 5 Toneladas",
    capacity: "5 t / 100 qq",
    dimensions: "16' × 8'",
    modality: "Distribución Mediana",
    category: "seca",
    description: "Vehículos medianos equipados con furgón seco.",
    image: fuso5Img,
  },
  {
    id: "2.7ton",
    title: "Camión 2.7 Toneladas",
    capacity: "2.7 t / 50 qq",
    dimensions: "12' × 5'",
    modality: "Acceso Urbano",
    category: "seca",
    description: "Camiones ligeros para reparto urbano ágil y entregas puntuales.",
    image: isuzu2Img,
  },
  {
    id: "1.5ton-panel",
    title: "Panel HiAce 1.5 Toneladas",
    capacity: "1.5 t",
    dimensions: "Formatos Panel",
    modality: "Express Urbano",
    category: "seca",
    description: "Panel rápida con furgón seco ideal para entregas express.",
    image: hiace15Img,
  },
  {
    id: "1ton-panele",
    title: "Panel 1 Tonelada",
    capacity: "1 t",
    dimensions: "Formatos Panel",
    modality: "Urbano Compacto",
    category: "seca",
    description: "Unidades cerradas para paquetería, documentos y carga delicada.",
    image: liteace1Img,
  },
];

const DEFAULT_GENERAL_INFO: GeneralInfo = {
  heroTitle: "Soluciones Logísticas y Transporte Terrestre en Guatemala",
  heroSubtitle: "Llegamos a donde tu negocio lo necesita con puntualidad, seguridad y cobertura en los 22 departamentos.",
  misionText: "Ofrecer servicios de transporte y logística integral eficientes, seguros y personalizados en Guatemala, impulsando el crecimiento comercial de nuestros clientes.",
  visionText: "Ser la empresa líder en soluciones de logística terrestre en Guatemala, reconocida por la excelencia operativa, innovación en servicio y compromiso con nuestros aliados.",
  coberturaText: "Contamos con presencia y rutas estratégicas operativas en los 22 departamentos del territorio nacional de Guatemala.",
};

const DEFAULT_SITE_DATA: SiteData = {
  contactInfo: DEFAULT_CONTACT_INFO,
  vacancies: DEFAULT_VACANCIES,
  fleet: DEFAULT_FLEET,
  generalInfo: DEFAULT_GENERAL_INFO,
  branding: DEFAULT_BRANDING,
  customSections: DEFAULT_CUSTOM_SECTIONS,
};

interface SiteDataContextType {
  siteData: SiteData;
}

const SiteDataContext = createContext<SiteDataContextType | undefined>(undefined);

export function extractMapUrl(input: string | undefined): string {
  if (!input) return "";
  const trimmed = input.trim();
  const srcMatch = trimmed.match(/src=["']([^"']+)["']/i);
  if (srcMatch && srcMatch[1]) {
    return srcMatch[1];
  }
  return trimmed;
}

const DEFAULT_FLEET_IMAGE_BY_ID: Record<string, string> = {
  cabezales: "/fleet/cabezales.png",
  "12ton": "/fleet/unidades-12ton.png",
  "5ton": "/fleet/unidades-5ton.png",
  "2.7ton": "/fleet/unidades-2.7ton.png",
  "1.5ton-panel": "/fleet/panel-1.5ton.png",
  "1ton-panele": "/fleet/panele-1ton.png",
};

function sanitizeFleetImages(fleetList: FleetItem[]): FleetItem[] {
  if (!Array.isArray(fleetList) || fleetList.length === 0) return DEFAULT_FLEET;

  return fleetList.map((item) => {
    let img = item.image || "";
    const id = (item.id || "").toLowerCase();
    const isBroken =
      !img ||
      img.includes("/src/assets/") ||
      img.includes("freightliner") ||
      img.includes("fuso_truck") ||
      img.includes("isuzu_truck") ||
      img.includes("liteace_panel");

    if (isBroken) {
      if (DEFAULT_FLEET_IMAGE_BY_ID[id]) {
        img = DEFAULT_FLEET_IMAGE_BY_ID[id];
      } else if (id.includes("cabezal")) img = "/fleet/cabezales.png";
      else if (id.includes("12")) img = "/fleet/unidades-12ton.png";
      else if (id.includes("5")) img = "/fleet/unidades-5ton.png";
      else if (id.includes("2.7")) img = "/fleet/unidades-2.7ton.png";
      else if (id.includes("1ton")) img = "/fleet/panele-1ton.png";
      else if (id.includes("1.5")) img = "/fleet/panel-1.5ton.png";
      else img = "/fleet/cabezales.png";
    }
    return { ...item, image: img };
  });
}

function sanitizeCustomSections(sections: CustomSection[] | undefined): CustomSection[] {
  if (!Array.isArray(sections)) return [];
  return sections.filter((s) => s.id !== "sec-1" && !s.title?.includes("Garantía de Calidad") && !s.subtitle?.includes("Ventaja Competitiva"));
}

const VACANCY_ID_ALIASES: Record<string, string> = {
  pesados: "10tn",
  urbanos: "5tn",
};

const VACANCY_FLYER_PATHS: Record<string, string> = {
  cabezales: "/vacancies/piloto-cabezales.png",
  "5tn": "/vacancies/piloto-5-ton.png",
  "10tn": "/vacancies/piloto-10-ton.png",
  pesados: "/vacancies/piloto-10-ton.png",
  urbanos: "/vacancies/piloto-5-ton.png",
};

function isBrokenAssetPath(url: string | undefined): boolean {
  if (!url || !url.trim()) return true;
  return url.includes("/src/assets/") || url.includes("src/assets/");
}

function resolveVacancyFlyerImage(
  rawFlyer: unknown,
  vacancyId: string,
  defaultFlyer?: string,
): string {
  const raw = typeof rawFlyer === "string" ? rawFlyer.trim() : "";
  if (!isBrokenAssetPath(raw)) return raw;
  if (!isBrokenAssetPath(defaultFlyer)) return defaultFlyer!.trim();

  const aliasedId = VACANCY_ID_ALIASES[vacancyId] || vacancyId;
  return VACANCY_FLYER_PATHS[vacancyId] || VACANCY_FLYER_PATHS[aliasedId] || "";
}

function sanitizeVacancies(vacancies: unknown): Vacancy[] {
  if (!Array.isArray(vacancies) || vacancies.length === 0) return DEFAULT_VACANCIES;

  const defaultById = Object.fromEntries(DEFAULT_VACANCIES.map((v) => [v.id, v]));

  return vacancies.map((raw: Record<string, unknown>) => {
    const vacancyId = String(raw.id || "");
    const aliasedDefaults = defaultById[vacancyId] || defaultById[VACANCY_ID_ALIASES[vacancyId] || ""] || ({} as Partial<Vacancy>);
    const defaults = aliasedDefaults;
    const responsibilities = Array.isArray(raw.responsibilities) ? (raw.responsibilities as string[]) : [];
    const offers = Array.isArray(raw.offers)
      ? (raw.offers as string[])
      : responsibilities.length > 0
        ? responsibilities
        : defaults.offers || [];
    const requirements = Array.isArray(raw.requirements)
      ? (raw.requirements as string[])
      : defaults.requirements || [];

    return {
      id: String(raw.id || `vac-${Date.now()}`),
      title: String(raw.title || defaults.title || "Plaza disponible"),
      location: String(raw.location || defaults.location || DEFAULT_CONTACT_INFO.address),
      license: String(raw.license || defaults.license || ""),
      salary: String(raw.salary || defaults.salary || ""),
      flyerImage: resolveVacancyFlyerImage(raw.flyerImage, vacancyId, defaults.flyerImage),
      subjectEmail: String(raw.subjectEmail || defaults.subjectEmail || raw.title || ""),
      whatsappNumber: String(raw.whatsappNumber || defaults.whatsappNumber || DEFAULT_CONTACT_INFO.whatsappRRHH),
      emailContact: String(raw.emailContact || defaults.emailContact || DEFAULT_CONTACT_INFO.emailRRHH),
      requirements,
      offers,
      active: raw.active !== false,
    };
  });
}

function sanitizeBranding(branding: Partial<Branding> | undefined): Branding {
  const isBrokenAssetPath = (url: string | undefined): boolean => {
    if (!url || !url.trim()) return true;
    return url.includes("/src/assets/") || url.includes("src/assets/");
  };

  const resolve = (url: string | undefined, publicPath: string): string => {
    if (isBrokenAssetPath(url)) return publicPath;
    return url!.trim();
  };

  return {
    logoUrl: resolve(branding?.logoUrl, "/logo.png"),
    heroBgUrl: resolve(branding?.heroBgUrl, "/branding/hero.png"),
    warehouseBgUrl: resolve(branding?.warehouseBgUrl, "/branding/warehouse.jpg"),
    coberturaMapUrl: resolve(branding?.coberturaMapUrl, "/branding/guatemala-map.jpg"),
  };
}

function mergeSiteData(raw: Partial<SiteData>): SiteData {
  const contact = { ...DEFAULT_CONTACT_INFO, ...raw.contactInfo };
  if (contact.mapEmbedUrl) {
    contact.mapEmbedUrl = extractMapUrl(contact.mapEmbedUrl);
  }
  return {
    ...DEFAULT_SITE_DATA,
    ...raw,
    contactInfo: contact,
    vacancies: sanitizeVacancies(raw.vacancies),
    fleet: sanitizeFleetImages(raw.fleet || DEFAULT_FLEET),
    generalInfo: { ...DEFAULT_GENERAL_INFO, ...raw.generalInfo },
    branding: sanitizeBranding({ ...DEFAULT_BRANDING, ...raw.branding }),
    customSections: sanitizeCustomSections(raw.customSections || DEFAULT_CUSTOM_SECTIONS),
    updatedAt: raw.updatedAt,
  };
}

// Public content is read from the deployed file, with defaults on load failure.
export const SiteDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [siteData, setSiteData] = useState<SiteData>(DEFAULT_SITE_DATA);

  useEffect(() => {
    // Remove data left by the retired editor, including its stored credentials.
    try {
      for (const key of [
        "logiservicios_monaco_cms_data_v1",
        "logiservicios_monaco_cms_data_v2",
        "logiservicios_monaco_cms_updated_at_v1",
        "logiservicios_monaco_github_config_v1",
        "logiservicios_monaco_github_published_at_v1",
      ]) localStorage.removeItem(key);
      sessionStorage.removeItem("logiservicios_monaco_admin_session_v1");
    } catch {
      // Storage may be disabled; public content does not depend on it.
    }

    const controller = new AbortController();
    async function loadData() {
      try {
        const response = await fetch("/site-data.json", {
          cache: "no-store",
          signal: controller.signal,
        });
        if (!response.ok) return;
        const data: unknown = await response.json();
        if (!controller.signal.aborted && data && typeof data === "object" && !Array.isArray(data)) {
          setSiteData(mergeSiteData(data as Partial<SiteData>));
        }
      } catch {
        // Keep the existing defaults if the static file is unavailable.
      }
    }
    void loadData();
    return () => controller.abort();
  }, []);

  return <SiteDataContext.Provider value={{ siteData }}>{children}</SiteDataContext.Provider>;
};

export const useSiteData = () => {
  const context = useContext(SiteDataContext);
  if (!context) throw new Error("useSiteData must be used within a SiteDataProvider");
  return context;
};
