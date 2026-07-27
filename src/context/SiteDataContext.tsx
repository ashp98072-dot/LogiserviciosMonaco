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
}

export interface GeneralInfo {
  heroTitle: string;
  heroSubtitle: string;
  misionText: string;
  visionText: string;
  coberturaText: string;
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
  buttonText: string;
  buttonUrl: string;
  layoutStyle: "text-left" | "text-right" | "card" | "banner";
  bgStyle: "light" | "dark" | "gold";
  active: boolean;
  order: number;
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
    title: "Cabezales",
    capacity: "Carga pesada / Contenedores",
    description: "Unidades de alto rendimiento para transporte interurbano y de contenedores.",
    image: cabezalImg,
  },
  {
    id: "12ton",
    title: "Unidades de 12 Toneladas",
    capacity: "12 Toneladas",
    description: "Camiones Fuso / Isuzu de gran capacidad para distribución masiva.",
    image: fuso12Img,
  },
  {
    id: "5ton",
    title: "Unidades de 5 Toneladas",
    capacity: "5 a 8 Toneladas",
    description: "Vehículos medianos equipados con furgón y refrigeración opcional.",
    image: fuso5Img,
  },
  {
    id: "2.7ton",
    title: "Unidades de 2.7 Toneladas",
    capacity: "2.7 Toneladas",
    description: "Camiones ligeros para reparto urbano ágil y entregas puntuales.",
    image: isuzu2Img,
  },
  {
    id: "1ton-panele",
    title: "Paneles de 1 Tonelada",
    capacity: "1 Tonelada",
    description: "Unidades cerradas para paquetería, documentos y carga delicada.",
    image: liteace1Img,
  },
  {
    id: "1.5ton-panel",
    title: "Panel HiAce 1.5 Toneladas",
    capacity: "1.5 Toneladas",
    description: "Panel rápida con furgón seco ideal para entregas express.",
    image: hiace15Img,
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
  updateFleetItem: (id: string, updated: Partial<FleetItem>) => void;
  addFleetItem: (item: Omit<FleetItem, "id">) => void;
  deleteFleetItem: (id: string) => void;
  updateGeneralInfo: (info: Partial<GeneralInfo>) => void;
  updateBranding: (branding: Partial<Branding>) => void;
  addCustomSection: (section: Omit<CustomSection, "id">) => void;
  updateCustomSection: (id: string, updated: Partial<CustomSection>) => void;
  deleteCustomSection: (id: string) => void;
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
        updateFleetItem,
        addFleetItem,
        deleteFleetItem,
        updateGeneralInfo,
        updateBranding,
        addCustomSection,
        updateCustomSection,
        deleteCustomSection,
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
