import React, { createContext, useContext, useState, useEffect, useRef } from "react";

// Default images imports
import logoImg from "@/assets/logo.png";
import heroImg from "@/assets/logo_1.png";
import warehouseImg from "@/assets/warehouse.jpg";
import mapImg from "@/assets/guatemala-map.jpg";

import pilotoCabezalesFlyer from "@/assets/piloto cabezales.jpeg";
import piloto5TonFlyer from "@/assets/piloto 5 ton.jpeg";
import piloto10TonFlyer from "@/assets/piloto 10 ton.jpeg";

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
  formspreeUrl?: string;
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

export interface GitHubSyncConfig {
  token: string;
  repo: string;
  branch: string;
  filePath: string;
}

export interface SiteData {
  contactInfo: ContactInfo;
  vacancies: Vacancy[];
  fleet: FleetItem[];
  generalInfo: GeneralInfo;
  branding: Branding;
  customSections: CustomSection[];
  adminPin: string;
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
  phone: "+502 4017-5893",
  whatsappMain: "50240175893",
  whatsappRRHH: "50230137849",
  emailInfo: "info@logiserviciosmonaco.com",
  emailRRHH: "recursoshumanos@logiserviciosmonaco.com",
  address: "17 Ave. 45-35, Avenida Petapa, Zona 12, Ciudad de Guatemala, Guatemala",
  facebookUrl: "https://www.facebook.com/share/1CirGxQ8no/",
  schedule: "Lunes a Viernes: 8:00 AM - 5:00 PM | Sábados: 8:00 AM - 12:00 PM",
  formTitle: "Solicita tu cotización",
  formspreeUrl: "https://formspree.io/f/xzdndgdq",
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
    flyerImage: pilotoCabezalesFlyer,
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
    flyerImage: piloto5TonFlyer,
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
    flyerImage: piloto10TonFlyer,
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
  adminPin: "1234",
};

interface SiteDataContextType {
  siteData: SiteData;
  isSyncing: boolean;
  lastSyncedAt: string | null;
  githubConfig: GitHubSyncConfig;
  updateGithubConfig: (cfg: Partial<GitHubSyncConfig>) => void;
  syncToGitHub: (customConfig?: Partial<GitHubSyncConfig>) => Promise<{ success: boolean; message: string }>;
  syncWithServer: (customData?: SiteData) => Promise<boolean>;
  exportData: () => void;
  updateContactInfo: (info: Partial<ContactInfo>) => void;
  updateVacancy: (id: string, updated: Partial<Vacancy>) => void;
  addVacancy: (vacancy: Omit<Vacancy, "id">) => void;
  deleteVacancy: (id: string) => void;
  moveVacancy: (id: string, direction: "up" | "down") => void;
  setVacancies: (vacancies: Vacancy[]) => void;
  updateFleetItem: (id: string, updated: Partial<FleetItem>) => void;
  addFleetItem: (item: Omit<FleetItem, "id">) => void;
  deleteFleetItem: (id: string) => void;
  moveFleetItem: (id: string, direction: "up" | "down") => void;
  setFleet: (fleet: FleetItem[]) => void;
  updateGeneralInfo: (info: Partial<GeneralInfo>) => void;
  updateBranding: (branding: Partial<Branding>) => void;
  addCustomSection: (section: Omit<CustomSection, "id">) => void;
  updateCustomSection: (id: string, updated: Partial<CustomSection>) => void;
  deleteCustomSection: (id: string) => void;
  moveCustomSection: (id: string, direction: "up" | "down") => void;
  setCustomSections: (sections: CustomSection[]) => void;
  setAdminPin: (pin: string) => void;
  resetToDefaults: () => void;
  importData: (data: SiteData) => void;
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

const ALLOWED_FLEET_IDS = ["cabezales", "12ton", "5ton", "2.7ton", "1.5ton-panel", "1ton-panele"];

function sanitizeFleetImages(fleetList: FleetItem[]): FleetItem[] {
  if (!Array.isArray(fleetList) || fleetList.length === 0) return DEFAULT_FLEET;
  
  // Filter out extra items not in allowed 6 IDs
  const filtered = fleetList.filter((item) => ALLOWED_FLEET_IDS.includes(item.id));
  if (filtered.length === 0) return DEFAULT_FLEET;

  return filtered.map((item) => {
    let img = item.image || "";
    if (!img || img.includes("/src/assets/") || img.includes("freightliner") || img.includes("fuso_truck") || img.includes("isuzu_truck") || img.includes("liteace_panel")) {
      const id = (item.id || "").toLowerCase();
      if (id.includes("cabezal")) img = "/fleet/cabezales.png";
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

function sanitizeVacancies(vacancies: unknown): Vacancy[] {
  if (!Array.isArray(vacancies) || vacancies.length === 0) return DEFAULT_VACANCIES;

  const defaultById = Object.fromEntries(DEFAULT_VACANCIES.map((v) => [v.id, v]));

  return vacancies.map((raw: Record<string, unknown>) => {
    const defaults = defaultById[String(raw.id)] || ({} as Partial<Vacancy>);
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
      flyerImage: String(raw.flyerImage || defaults.flyerImage || ""),
      subjectEmail: String(raw.subjectEmail || defaults.subjectEmail || raw.title || ""),
      whatsappNumber: String(raw.whatsappNumber || defaults.whatsappNumber || DEFAULT_CONTACT_INFO.whatsappRRHH),
      emailContact: String(raw.emailContact || defaults.emailContact || DEFAULT_CONTACT_INFO.emailRRHH),
      requirements,
      offers,
      active: raw.active !== false,
    };
  });
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
    branding: { ...DEFAULT_BRANDING, ...raw.branding },
    customSections: sanitizeCustomSections(raw.customSections || DEFAULT_CUSTOM_SECTIONS),
    updatedAt: raw.updatedAt,
  };
}

const LOCAL_STORAGE_KEY = "logiservicios_monaco_cms_data_v2";
const LOCAL_STORAGE_META_KEY = "logiservicios_monaco_cms_updated_at_v1";
const GITHUB_CONFIG_KEY = "logiservicios_monaco_github_config_v1";

const DEFAULT_GITHUB_CONFIG: GitHubSyncConfig = {
  token: "",
  repo: "laulaisha8/logiserviciosmonaco",
  branch: "main",
  filePath: "site-data.json",
};

export const SiteDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const skipTimestampBumpRef = useRef(false);

  const [githubConfig, setGithubConfig] = useState<GitHubSyncConfig>(() => {
    try {
      const saved = localStorage.getItem(GITHUB_CONFIG_KEY);
      if (saved) {
        return { ...DEFAULT_GITHUB_CONFIG, ...JSON.parse(saved) };
      }
    } catch (e) {}
    return DEFAULT_GITHUB_CONFIG;
  });

  const updateGithubConfig = (cfg: Partial<GitHubSyncConfig>) => {
    setGithubConfig((prev) => {
      const updated = { ...prev, ...cfg };
      localStorage.setItem(GITHUB_CONFIG_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const syncToGitHub = async (customConfig?: Partial<GitHubSyncConfig>): Promise<{ success: boolean; message: string }> => {
    const cfg = { ...githubConfig, ...customConfig };
    if (!cfg.token || !cfg.repo) {
      return {
        success: false,
        message: "Por favor ingresa tu Personal Access Token de GitHub y el Repositorio (ej: usuario/repositorio) en la pestaña Ajustes.",
      };
    }
    setIsSyncing(true);
    try {
      const cleanRepo = cfg.repo.replace("https://github.com/", "").replace(".git", "").replace(/^\/+|\/+$/g, "").trim();
      const filePath = cfg.filePath || "site-data.json";
      const branch = cfg.branch || "main";

      // 1. Fetch current file SHA if it exists
      let sha: string | undefined = undefined;
      try {
        const getRes = await fetch(`https://api.github.com/repos/${cleanRepo}/contents/${filePath}?ref=${branch}`, {
          headers: {
            Authorization: `token ${cfg.token}`,
            Accept: "application/vnd.github.v3+json",
          },
        });
        if (getRes.ok) {
          const fileData = await getRes.json();
          sha = fileData.sha;
        }
      } catch (e) {
        // file doesn't exist yet or new repo
      }

      // 2. Base64 encode siteData JSON safely for Unicode characters
      const payload = { ...siteData, updatedAt: new Date().toISOString() };
      const jsonString = JSON.stringify(payload, null, 2);
      const utf8Bytes = new TextEncoder().encode(jsonString);
      let binary = "";
      for (let i = 0; i < utf8Bytes.length; i++) {
        binary += String.fromCharCode(utf8Bytes[i]);
      }
      const base64Content = btoa(binary);

      // 3. Put to GitHub REST API
      const putRes = await fetch(`https://api.github.com/repos/${cleanRepo}/contents/${filePath}`, {
        method: "PUT",
        headers: {
          Authorization: `token ${cfg.token}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `Actualización de contenido desde Panel Administrador CMS (${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()})`,
          content: base64Content,
          sha: sha,
          branch: branch,
        }),
      });

      if (putRes.ok) {
        setSiteData((prev) => ({ ...prev, updatedAt: payload.updatedAt }));
        localStorage.setItem(LOCAL_STORAGE_META_KEY, payload.updatedAt);
        setLastSyncedAt(new Date().toLocaleTimeString());
        setIsSyncing(false);
        return {
          success: true,
          message: "¡Excelente! Los datos se han guardado y publicado directamente en tu repositorio de GitHub. El sitio web se actualizará automáticamente.",
        };
      } else {
        const errData = await putRes.json().catch(() => ({ message: "Respuesta no válida" }));
        setIsSyncing(false);
        return {
          success: false,
          message: `Error de GitHub (${putRes.status}): ${errData.message || "Verifica tu Token y permisos de escritura ('repo')."}`,
        };
      }
    } catch (err: any) {
      setIsSyncing(false);
      return {
        success: false,
        message: `Error de red al conectar con GitHub: ${err.message || err}`,
      };
    }
  };

  const [siteData, setSiteData] = useState<SiteData>(DEFAULT_SITE_DATA);

  // Helper to fetch live fresh data from GitHub raw or site static endpoints with cache-busting
  const fetchFreshDataFromCloud = async (): Promise<SiteData | null> => {
    const timestamp = Date.now();
    const repo = githubConfig.repo || "laulaisha8/logiserviciosmonaco";
    const branch = githubConfig.branch || "main";
    const cleanRepo = repo.replace("https://github.com/", "").replace(".git", "").replace(/^\/+|\/+$/g, "").trim();

    // Prefer same-origin site-data.json (Vercel deploy) before GitHub raw CDN
    const endpoints = [
      `/site-data.json?t=${timestamp}`,
      `https://raw.githubusercontent.com/${cleanRepo}/${branch}/site-data.json?t=${timestamp}`,
      `/api/site-data?t=${timestamp}`,
    ];

    for (const url of endpoints) {
      try {
        const res = await fetch(url, {
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
          },
        });
        if (res.ok) {
          const text = await res.text();
          let dataJson: unknown = null;
          try {
            dataJson = JSON.parse(text);
          } catch {
            continue;
          }
          if (dataJson && typeof dataJson === "object") {
            const rawData = (dataJson as { data?: SiteData }).data || (dataJson as SiteData);
            if (rawData && typeof rawData === "object" && (rawData.contactInfo || rawData.vacancies || rawData.fleet)) {
              return mergeSiteData(rawData);
            }
          }
        }
      } catch {
        // Try next endpoint
      }
    }
    return null;
  };

  const applyCloudData = (liveData: SiteData) => {
    setSiteData((prev) => {
      const cachedAt = localStorage.getItem(LOCAL_STORAGE_META_KEY) || "";
      const liveAt = liveData.updatedAt || "";
      const shouldApply =
        !cachedAt ||
        !liveAt ||
        liveAt >= cachedAt ||
        JSON.stringify(prev) === JSON.stringify(DEFAULT_SITE_DATA);

      if (!shouldApply) return prev;

      skipTimestampBumpRef.current = true;
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(liveData));
      if (liveAt) {
        localStorage.setItem(LOCAL_STORAGE_META_KEY, liveAt);
      }
      setLastSyncedAt(new Date().toLocaleTimeString());
      return liveData;
    });
  };

  const loadCachedData = (): SiteData | null => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        return mergeSiteData(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Error loading saved site data from localStorage:", e);
    }
    return null;
  };

  // Fetch from server / GitHub on load and poll periodically so ALL devices stay synchronized in real time
  useEffect(() => {
    let isMounted = true;

    // Clear legacy storage v1 to prevent stale data retention on old devices
    localStorage.removeItem("logiservicios_monaco_cms_data_v1");

    async function loadLiveData() {
      const liveData = await fetchFreshDataFromCloud();
      if (!isMounted) return;

      if (liveData) {
        applyCloudData(liveData);
      } else {
        const cached = loadCachedData();
        if (cached) {
          setSiteData((prev) => (JSON.stringify(prev) === JSON.stringify(DEFAULT_SITE_DATA) ? cached : prev));
        }
      }

      setIsInitialized(true);
    }

    loadLiveData();

    // Poll every 15 seconds for live synchronization across devices
    const intervalId = setInterval(loadLiveData, 15000);

    // Also re-fetch immediately when user returns to window/tab
    const handleFocus = () => {
      loadLiveData();
    };
    window.addEventListener("focus", handleFocus);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
      window.removeEventListener("focus", handleFocus);
    };
  }, [githubConfig.repo, githubConfig.branch]);

  // Save to server API function
  const syncWithServer = async (customData?: SiteData): Promise<boolean> => {
    const dataToSave = customData || siteData;
    setIsSyncing(true);
    try {
      const res = await fetch("/api/site-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSave),
      });
      const contentType = res.headers.get("content-type") || "";
      if (res.ok && contentType.includes("application/json")) {
        const json = await res.json();
        if (json && json.success) {
          setLastSyncedAt(new Date().toLocaleTimeString());
          setIsSyncing(false);
          return true;
        }
      }
    } catch (err) {
      // Static hostings like GitHub pages/Netlify static don't run POST server endpoints
    }
    setIsSyncing(false);
    return false;
  };

  // Sync to localStorage immediately & server with debounce
  useEffect(() => {
    if (!isInitialized) return;

    const dataToPersist = skipTimestampBumpRef.current
      ? siteData
      : { ...siteData, updatedAt: new Date().toISOString() };
    skipTimestampBumpRef.current = false;

    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataToPersist));
      if (dataToPersist.updatedAt) {
        localStorage.setItem(LOCAL_STORAGE_META_KEY, dataToPersist.updatedAt);
      }
    } catch (e) {
      console.error("Error saving site data to localStorage:", e);
    }

    const timer = setTimeout(() => {
      syncWithServer(dataToPersist);
    }, 1500);

    return () => clearTimeout(timer);
  }, [siteData, isInitialized]);

  const updateContactInfo = (info: Partial<ContactInfo>) => {
    const updatedInfo = { ...info };
    if (updatedInfo.mapEmbedUrl) {
      updatedInfo.mapEmbedUrl = extractMapUrl(updatedInfo.mapEmbedUrl);
    }
    setSiteData((prev) => ({
      ...prev,
      contactInfo: { ...prev.contactInfo, ...updatedInfo },
    }));
  };

  const updateVacancy = (id: string, updated: Partial<Vacancy>) => {
    setSiteData((prev) => ({
      ...prev,
      vacancies: prev.vacancies.map((v) => (v.id === id ? { ...v, ...updated } : v)),
    }));
  };

  const addVacancy = (vacancyData: Omit<Vacancy, "id">) => {
    const id = "vac-" + Date.now();
    const newVacancy: Vacancy = { ...vacancyData, id };
    setSiteData((prev) => ({
      ...prev,
      vacancies: [newVacancy, ...prev.vacancies],
    }));
  };

  const deleteVacancy = (id: string) => {
    setSiteData((prev) => ({
      ...prev,
      vacancies: prev.vacancies.filter((v) => v.id !== id),
    }));
  };

  const moveVacancy = (id: string, direction: "up" | "down") => {
    setSiteData((prev) => {
      const list = [...prev.vacancies];
      const index = list.findIndex((v) => v.id === id);
      if (index === -1) return prev;
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= list.length) return prev;

      const temp = list[index];
      list[index] = list[targetIndex];
      list[targetIndex] = temp;

      return { ...prev, vacancies: list };
    });
  };

  const updateFleetItem = (id: string, updated: Partial<FleetItem>) => {
    setSiteData((prev) => ({
      ...prev,
      fleet: prev.fleet.map((f) => (f.id === id ? { ...f, ...updated } : f)),
    }));
  };

  const addFleetItem = (itemData: Omit<FleetItem, "id">) => {
    const id = "fleet-" + Date.now();
    const newItem: FleetItem = { ...itemData, id };
    setSiteData((prev) => ({
      ...prev,
      fleet: [...prev.fleet, newItem],
    }));
  };

  const deleteFleetItem = (id: string) => {
    setSiteData((prev) => ({
      ...prev,
      fleet: prev.fleet.filter((f) => f.id !== id),
    }));
  };

  const moveFleetItem = (id: string, direction: "up" | "down") => {
    setSiteData((prev) => {
      const list = [...prev.fleet];
      const index = list.findIndex((item) => item.id === id);
      if (index === -1) return prev;
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= list.length) return prev;

      const temp = list[index];
      list[index] = list[targetIndex];
      list[targetIndex] = temp;

      return { ...prev, fleet: list };
    });
  };

  const updateGeneralInfo = (info: Partial<GeneralInfo>) => {
    setSiteData((prev) => ({
      ...prev,
      generalInfo: { ...prev.generalInfo, ...info },
    }));
  };

  const updateBranding = (branding: Partial<Branding>) => {
    setSiteData((prev) => ({
      ...prev,
      branding: { ...prev.branding, ...branding },
    }));
  };

  const addCustomSection = (sectionData: Omit<CustomSection, "id">) => {
    const id = "sec-" + Date.now();
    const newSection: CustomSection = { ...sectionData, id };
    setSiteData((prev) => ({
      ...prev,
      customSections: [...prev.customSections, newSection],
    }));
  };

  const updateCustomSection = (id: string, updated: Partial<CustomSection>) => {
    setSiteData((prev) => ({
      ...prev,
      customSections: prev.customSections.map((s) => (s.id === id ? { ...s, ...updated } : s)),
    }));
  };

  const deleteCustomSection = (id: string) => {
    setSiteData((prev) => ({
      ...prev,
      customSections: prev.customSections.filter((s) => s.id !== id),
    }));
  };

  const moveCustomSection = (id: string, direction: "up" | "down") => {
    setSiteData((prev) => {
      const sections = [...prev.customSections].sort((a, b) => (a.order || 0) - (b.order || 0));
      const index = sections.findIndex((s) => s.id === id);
      if (index === -1) return prev;
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= sections.length) return prev;

      const temp = sections[index];
      sections[index] = sections[targetIndex];
      sections[targetIndex] = temp;

      const updated = sections.map((s, idx) => ({ ...s, order: idx + 1 }));
      return { ...prev, customSections: updated };
    });
  };

  const setVacancies = (vacancies: Vacancy[]) => {
    setSiteData((prev) => ({ ...prev, vacancies }));
  };

  const setFleet = (fleet: FleetItem[]) => {
    setSiteData((prev) => ({ ...prev, fleet }));
  };

  const setCustomSections = (customSections: CustomSection[]) => {
    setSiteData((prev) => ({ ...prev, customSections }));
  };

  const setAdminPin = (pin: string) => {
    setSiteData((prev) => ({ ...prev, adminPin: pin }));
  };

  const resetToDefaults = () => {
    setSiteData(DEFAULT_SITE_DATA);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    localStorage.removeItem(LOCAL_STORAGE_META_KEY);
  };

  const exportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(siteData, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `logiservicios_monaco_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importData = (data: SiteData) => {
    const merged = mergeSiteData(data);
    setSiteData(merged);
    syncWithServer(merged);
  };

  return (
    <SiteDataContext.Provider
      value={{
        siteData,
        isSyncing,
        lastSyncedAt,
        githubConfig,
        updateGithubConfig,
        syncToGitHub,
        syncWithServer,
        exportData,
        updateContactInfo,
        updateVacancy,
        addVacancy,
        deleteVacancy,
        moveVacancy,
        setVacancies,
        updateFleetItem,
        addFleetItem,
        deleteFleetItem,
        moveFleetItem,
        setFleet,
        updateGeneralInfo,
        updateBranding,
        addCustomSection,
        updateCustomSection,
        deleteCustomSection,
        moveCustomSection,
        setCustomSections,
        setAdminPin,
        resetToDefaults,
        importData,
      }}
    >
      {children}
    </SiteDataContext.Provider>
  );
};

export const useSiteData = () => {
  const context = useContext(SiteDataContext);
  if (!context) {
    throw new Error("useSiteData must be used within a SiteDataProvider");
  }
  return context;
};
