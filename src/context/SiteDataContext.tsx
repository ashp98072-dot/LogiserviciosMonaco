import React, { createContext, useContext, useState, useEffect } from "react";

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

export interface SiteData {
  contactInfo: ContactInfo;
  vacancies: Vacancy[];
  fleet: FleetItem[];
  generalInfo: GeneralInfo;
  branding: Branding;
  customSections: CustomSection[];
  adminPin: string;
}

const DEFAULT_BRANDING: Branding = {
  logoUrl: logoImg,
  heroBgUrl: heroImg,
  warehouseBgUrl: warehouseImg,
  coberturaMapUrl: mapImg,
};

const DEFAULT_CUSTOM_SECTIONS: CustomSection[] = [
  {
    id: "sec-1",
    title: "Garantía de Calidad y Puntualidad",
    subtitle: "Nuestra Ventaja Competitiva",
    content: "En Logiservicios Mónaco nos aseguramos de que cada envío cumpla con los estándares más estrictos de seguridad, tiempos de entrega y monitoreo en tiempo real.",
    imageUrl: warehouseImg,
    buttonText: "Cotizar Servicio",
    buttonUrl: "/contacto",
    layoutStyle: "text-left",
    bgStyle: "light",
    active: true,
    order: 1,
    pageTarget: "inicio",
  },
];

const DEFAULT_CONTACT_INFO: ContactInfo = {
  phone: "+502 4017-5893",
  whatsappMain: "50240175893",
  whatsappRRHH: "50230137849",
  emailInfo: "info@logiserviciosmonaco.com",
  emailRRHH: "recursoshumanos@logiserviciosmonaco.com",
  address: "Calzada Atanasio Tzul 22-00 Zona 12, Empresarial el Cortijo II, Bodega 403, Guatemala",
  facebookUrl: "https://www.facebook.com/share/1CirGxQ8no/",
  schedule: "Lunes a Viernes: 8:00 AM - 5:00 PM | Sábados: 8:00 AM - 12:00 PM",
  formTitle: "Solicita tu cotización",
  formspreeUrl: "https://formspree.io/f/xzdndgdq",
  showMap: true,
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.423985108253!2d-90.5367!3d14.575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8589a3f25c78278b%3A0x6bd6c666f0e4b868!2sCalzada%20Atanasio%20Tzul%2C%20Ciudad%20de%20Guatemala!5e0!3m2!1ses!2sgt!4v1710000000000!5m2!1ses!2sgt",
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
      "Salario mensual de Q8,000.00",
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
    salary: "Q4,500.00 / mes",
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
      "Salario mensual de Q4,500.00",
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
    salary: "Q5,500.00 / mes",
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
      "Salario mensual de Q5,500.00",
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
    id: "furgon53",
    title: "Furgón 53' / 48'",
    capacity: "20 t / 400 qq",
    dimensions: "53' – 48' × 8'",
    modality: "Volumen Alto",
    category: "seca",
    description: "Furgones secos cerrados de gran capacidad volumétrica.",
    image: cabezalImg,
  },
  {
    id: "dobleeje",
    title: "Doble Eje",
    capacity: "15 t / 300 qq",
    dimensions: "24' × 8'",
    modality: "Carga Pesada",
    category: "seca",
    description: "Camiones de doble eje diseñados para cargas pesadas e industriales.",
    image: fuso12Img,
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
    id: "10ton",
    title: "Camión 10 Toneladas",
    capacity: "10 t / 200 qq",
    dimensions: "24' × 8'",
    modality: "Distribución Nacional",
    category: "seca",
    description: "Excelente balance entre peso y maniobrabilidad nacional.",
    image: fuso5Img,
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
    id: "1ton-panele",
    title: "Panel 1 Tonelada",
    capacity: "1 t",
    dimensions: "Formatos Panel",
    modality: "Urbano Compacto",
    category: "seca",
    description: "Unidades cerradas para paquetería, documentos y carga delicada.",
    image: liteace1Img,
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
    id: "10ton-refri",
    title: "Camión 10 Tn Refrigerado",
    capacity: "10 t / 200 qq",
    dimensions: "24' × 8'",
    modality: "Carga Refrigerada / Congelada",
    category: "refrigerada",
    description: "Unidad con sistema Termoking con monitoreo térmico 24/7.",
    image: fuso12Img,
  },
  {
    id: "5ton-refri",
    title: "Camión 5 Tn Refrigerado",
    capacity: "5 t / 100 qq",
    dimensions: "16' × 8'",
    modality: "Carga Refrigerada / Perecederos",
    category: "refrigerada",
    description: "Ideal para la cadena de frío de alimentos y perecederos.",
    image: fuso5Img,
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

const LOCAL_STORAGE_KEY = "logiservicios_monaco_cms_data_v1";

export const SiteDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [siteData, setSiteData] = useState<SiteData>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_SITE_DATA,
          ...parsed,
          contactInfo: { ...DEFAULT_CONTACT_INFO, ...parsed.contactInfo },
          generalInfo: { ...DEFAULT_GENERAL_INFO, ...parsed.generalInfo },
          branding: { ...DEFAULT_BRANDING, ...parsed.branding },
          customSections: parsed.customSections || DEFAULT_CUSTOM_SECTIONS,
        };
      }
    } catch (e) {
      console.error("Error loading saved site data:", e);
    }
    return DEFAULT_SITE_DATA;
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(siteData));
    } catch (e) {
      console.error("Error saving site data to localStorage:", e);
    }
  }, [siteData]);

  const updateContactInfo = (info: Partial<ContactInfo>) => {
    setSiteData((prev) => ({
      ...prev,
      contactInfo: { ...prev.contactInfo, ...info },
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
  };

  const importData = (data: SiteData) => {
    setSiteData(data);
  };

  return (
    <SiteDataContext.Provider
      value={{
        siteData,
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
