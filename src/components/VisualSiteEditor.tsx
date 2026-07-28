import React, { useState } from "react";
import { useSiteData, CustomSection, Vacancy, FleetItem, extractMapUrl } from "@/context/SiteDataContext";
import {
  Sparkles,
  FolderOpen,
  CheckCircle2,
  Truck,
  Briefcase,
  Layers,
  Phone,
  ImageIcon,
  FileText,
  Monitor,
  Smartphone,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  ChevronDown,
  ChevronRight,
  Eye,
  Video,
  MapPin,
  Building,
  Save,
  Palette,
  ExternalLink,
  AlignLeft,
  AlignCenter,
  LayoutGrid,
} from "lucide-react";

// Components for live preview rendering
import DynamicSections from "@/components/DynamicSections";
import { compressImageFile } from "@/lib/imageUtils";

interface VisualSiteEditorProps {
  onCloseAdmin?: () => void;
}

export default function VisualSiteEditor({ onCloseAdmin }: VisualSiteEditorProps) {
  const {
    siteData,
    updateContactInfo,
    updateGeneralInfo,
    updateBranding,
    setVacancies,
    setFleet,
    setCustomSections,
    importData,
  } = useSiteData();

  // State for Customizer
  const [selectedPage, setSelectedPage] = useState<
    "inicio" | "trabaja" | "flota" | "cobertura" | "filosofia" | "contacto"
  >("inicio");

  const [activeSectionId, setActiveSectionId] = useState<string>("hero");
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "mobile">("desktop");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [fleetTab, setFleetTab] = useState<"catalog" | "specs">("catalog");

  // States for Editing Modals/Forms inside Customizer
  const [editingVacancy, setEditingVacancy] = useState<Vacancy | null>(null);
  const [editingFleet, setEditingFleet] = useState<FleetItem | null>(null);
  const [editingCustomSection, setEditingCustomSection] = useState<CustomSection | null>(null);

  const showNotification = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 2500);
  };

  // Helper file uploader with automatic image compression & error catching
  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    callback: (dataUrl: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        showNotification("⏳ Optimizando e insertando imagen...");
        const dataUrl = await compressImageFile(file, 1200, 1200, 0.82);
        callback(dataUrl);
        showNotification("✨ Imagen actualizada en la vista previa y guardada");
      } catch (err: any) {
        showNotification(`❌ Error al subir imagen: ${err.message || "Archivo no soportado"}`);
      }
    }
  };

  // Reordering helpers for Vacancies
  const moveVacancy = (index: number, direction: "up" | "down") => {
    const updated = [...siteData.vacancies];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex >= 0 && targetIndex < updated.length) {
      const temp = updated[index];
      updated[index] = updated[targetIndex];
      updated[targetIndex] = temp;
      setVacancies(updated);
      showNotification("Posición de vacante ajustada");
    }
  };

  // Reordering helpers for Fleet
  const moveFleet = (index: number, direction: "up" | "down") => {
    const updated = [...siteData.fleet];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex >= 0 && targetIndex < updated.length) {
      const temp = updated[index];
      updated[index] = updated[targetIndex];
      updated[targetIndex] = temp;
      setFleet(updated);
      showNotification("Posición de unidad ajustada");
    }
  };

  // Reordering helpers for Custom Sections
  const moveCustomSection = (index: number, direction: "up" | "down") => {
    const updated = [...siteData.customSections];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex >= 0 && targetIndex < updated.length) {
      const temp = updated[index];
      updated[index] = updated[targetIndex];
      updated[targetIndex] = temp;
      // update order attributes
      const reordered = updated.map((sec, idx) => ({ ...sec, order: idx + 1 }));
      setCustomSections(reordered);
      showNotification("Posición de sección personalizada ajustada");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-neutral-900 text-neutral-100 font-sans">
      {/* LEFT SIDEBAR: CUSTOMIZER / SITE EDITOR INSPECTOR */}
      <div className="w-full lg:w-[420px] bg-neutral-950 border-r border-neutral-800 flex flex-col h-auto lg:h-screen lg:sticky lg:top-0 z-20 shrink-0 shadow-2xl">
        {/* Customizer Header */}
        <div className="p-4 border-b border-neutral-800 bg-neutral-900/90 backdrop-blur flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-gold/20 text-gold border border-gold/30">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h1 className="font-bold text-sm text-white">Editor de Sitio en Vivo</h1>
              <p className="text-[11px] text-neutral-400">Estilo WordPress / Gutenberg</p>
            </div>
          </div>
          {statusMessage && (
            <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded-full font-semibold animate-pulse">
              {statusMessage}
            </span>
          )}
        </div>

        {/* Page Selector Bar */}
        <div className="p-3 bg-neutral-900/50 border-b border-neutral-800 space-y-1.5">
          <label className="text-[11px] font-bold text-gold uppercase tracking-wider flex items-center gap-1.5">
            <LayoutGrid className="h-3.5 w-3.5" /> Página Activa para Editar:
          </label>
          <select
            value={selectedPage}
            onChange={(e) => setSelectedPage(e.target.value as any)}
            className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-xs font-semibold text-white focus:ring-2 focus:ring-gold outline-none"
          >
            <option value="inicio">🏠 Página de Inicio (Home)</option>
            <option value="trabaja">💼 Únete al Equipo (Vacantes)</option>
            <option value="flota">🚛 Nuestra Flota de Transporte</option>
            <option value="cobertura">📍 Cobertura Nacional</option>
            <option value="filosofia">🏛️ Filosofía Empresarial</option>
            <option value="contacto">📞 Contacto & Ubicación</option>
          </select>
        </div>

        {/* Accordions Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-neutral-800">
          {/* SECTION 1: HERO & GENERAL PAGE TEXTS */}
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/80 overflow-hidden">
            <button
              onClick={() => setActiveSectionId(activeSectionId === "hero" ? "" : "hero")}
              className="w-full p-3.5 flex items-center justify-between text-left hover:bg-neutral-800/60 transition"
            >
              <div className="flex items-center gap-2.5 font-bold text-xs text-neutral-200">
                <FileText className="h-4 w-4 text-gold" />
                <span>Textos de Cabecera y Portada</span>
              </div>
              {activeSectionId === "hero" ? (
                <ChevronDown className="h-4 w-4 text-neutral-400" />
              ) : (
                <ChevronRight className="h-4 w-4 text-neutral-400" />
              )}
            </button>

            {activeSectionId === "hero" && (
              <div className="p-4 pt-1 border-t border-neutral-800 space-y-3 text-xs bg-neutral-950/50">
                {selectedPage === "inicio" && (
                  <>
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-400 mb-1">
                        Etiqueta / Badge Superior
                      </label>
                      <input
                        type="text"
                        value={siteData.generalInfo?.heroBadge || "Logística Guatemala"}
                        onChange={(e) => updateGeneralInfo({ heroBadge: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-400 mb-1">
                        Título Principal (Hero)
                      </label>
                      <input
                        type="text"
                        value={siteData.generalInfo.heroTitle}
                        onChange={(e) => updateGeneralInfo({ heroTitle: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-400 mb-1">
                        Subtítulo / Descripción
                      </label>
                      <textarea
                        rows={2}
                        value={siteData.generalInfo.heroSubtitle}
                        onChange={(e) => updateGeneralInfo({ heroSubtitle: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white"
                      />
                    </div>
                  </>
                )}

                {selectedPage === "trabaja" && (
                  <>
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-400 mb-1">
                        Título Cabecera Vacantes
                      </label>
                      <input
                        type="text"
                        value={siteData.generalInfo?.trabajaHeroTitle || "Únete a Nuestro Equipo"}
                        onChange={(e) => updateGeneralInfo({ trabajaHeroTitle: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-400 mb-1">
                        Subtítulo Reclutamiento
                      </label>
                      <textarea
                        rows={2}
                        value={
                          siteData.generalInfo?.trabajaHeroSubtitle ||
                          "Forma parte de la red logística líder en Guatemala."
                        }
                        onChange={(e) => updateGeneralInfo({ trabajaHeroSubtitle: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white"
                      />
                    </div>
                  </>
                )}

                {selectedPage === "cobertura" && (
                  <>
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-400 mb-1">
                        Título de Cobertura
                      </label>
                      <input
                        type="text"
                        value={siteData.generalInfo?.coberturaHeroTitle || "Cobertura en todo el país"}
                        onChange={(e) => updateGeneralInfo({ coberturaHeroTitle: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-400 mb-1">
                        Resumen de Cobertura
                      </label>
                      <textarea
                        rows={2}
                        value={siteData.generalInfo.coberturaText}
                        onChange={(e) =>
                          updateGeneralInfo({
                            coberturaText: e.target.value,
                            coberturaHeroSubtitle: e.target.value,
                          })
                        }
                        className="w-full px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white"
                      />
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* SECTION 2: IMAGES, LOGO & BACKGROUNDS */}
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/80 overflow-hidden">
            <button
              onClick={() => setActiveSectionId(activeSectionId === "branding" ? "" : "branding")}
              className="w-full p-3.5 flex items-center justify-between text-left hover:bg-neutral-800/60 transition"
            >
              <div className="flex items-center gap-2.5 font-bold text-xs text-neutral-200">
                <ImageIcon className="h-4 w-4 text-emerald-400" />
                <span>
                  {selectedPage === "inicio"
                    ? "Imágenes de Inicio & Logo"
                    : selectedPage === "cobertura"
                    ? "Mapa & Logo Cobertura"
                    : "Imágenes & Logo de Empresa"}
                </span>
              </div>
              {activeSectionId === "branding" ? (
                <ChevronDown className="h-4 w-4 text-neutral-400" />
              ) : (
                <ChevronRight className="h-4 w-4 text-neutral-400" />
              )}
            </button>

            {activeSectionId === "branding" && (
              <div className="p-4 pt-1 border-t border-neutral-800 space-y-4 text-xs bg-neutral-950/50">
                {/* Logo Upload - Available across all pages */}
                <div className="space-y-2 border-b border-neutral-800 pb-3">
                  <label className="block font-semibold text-white">Logo Principal de la Empresa</label>
                  <div className="flex items-center gap-3">
                    <img
                      src={siteData.branding?.logoUrl}
                      alt="Logo Preview"
                      className="h-10 w-auto bg-white p-1 rounded border border-neutral-700 object-contain"
                    />
                    <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 bg-red-700 text-white font-semibold rounded-lg text-xs hover:bg-red-600 transition shadow-xs">
                      <FolderOpen className="h-4 w-4" />
                      <span>Cambiar Logo</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleFileUpload(e, (url) => updateBranding({ logoUrl: url }))
                        }
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Home Page Images: Hero & Bodega */}
                {(selectedPage === "inicio" || selectedPage === "flota") && (
                  <>
                    <div className="space-y-2 border-b border-neutral-800 pb-3">
                      <label className="block font-semibold text-white">Fondo Banner Principal (Hero)</label>
                      <div className="flex items-center gap-3">
                        <img
                          src={siteData.branding?.heroBgUrl}
                          alt="Hero BG"
                          className="h-12 w-20 object-cover rounded border border-neutral-700"
                        />
                        <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 bg-red-700 text-white font-semibold rounded-lg text-xs hover:bg-red-600 transition shadow-xs">
                          <FolderOpen className="h-4 w-4" />
                          <span>Seleccionar Fondo Hero</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              handleFileUpload(e, (url) => updateBranding({ heroBgUrl: url }))
                            }
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block font-semibold text-white">Imagen "Sobre la Empresa" / Bodega</label>
                      <div className="flex items-center gap-3">
                        <img
                          src={siteData.branding?.warehouseBgUrl}
                          alt="Bodega"
                          className="h-12 w-20 object-cover rounded border border-neutral-700"
                        />
                        <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-800 text-white font-semibold rounded-lg text-xs hover:bg-neutral-700 transition border border-neutral-700 shadow-xs">
                          <FolderOpen className="h-4 w-4" />
                          <span>Seleccionar Foto Bodega</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              handleFileUpload(e, (url) => updateBranding({ warehouseBgUrl: url }))
                            }
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  </>
                )}

                {/* Cobertura Page Image: Mapa */}
                {selectedPage === "cobertura" && (
                  <div className="space-y-2">
                    <label className="block font-semibold text-white">Imagen de Mapa de Cobertura</label>
                    <div className="flex items-center gap-3">
                      <img
                        src={siteData.branding?.coberturaMapUrl}
                        alt="Mapa Cobertura"
                        className="h-12 w-20 object-cover rounded border border-neutral-700 bg-white p-0.5"
                      />
                      <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 bg-red-700 text-white font-semibold rounded-lg text-xs hover:bg-red-600 transition shadow-xs">
                        <FolderOpen className="h-4 w-4" />
                        <span>Cambiar Imagen de Mapa</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            handleFileUpload(e, (url) => updateBranding({ coberturaMapUrl: url }))
                          }
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                )}

                {/* Trabaja Page Note */}
                {selectedPage === "trabaja" && (
                  <p className="text-[11px] text-emerald-400 italic bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-800">
                    💡 En esta página de Trabaja, las fotos y afiches publicitarios de cada plaza se suben dentro del panel de "Vacantes de Empleo".
                  </p>
                )}
              </div>
            )}
          </div>

          {/* SECTION 3: VACANCIES & POSITIONS (Only visible on 'trabaja' page) */}
          {selectedPage === "trabaja" && (
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/80 overflow-hidden">
              <button
                onClick={() => setActiveSectionId(activeSectionId === "vacancies" ? "" : "vacancies")}
                className="w-full p-3.5 flex items-center justify-between text-left hover:bg-neutral-800/60 transition"
              >
                <div className="flex items-center gap-2.5 font-bold text-xs text-neutral-200">
                  <Briefcase className="h-4 w-4 text-emerald-400" />
                  <span>Vacantes de Empleo & Distribución ({siteData.vacancies.length})</span>
                </div>
                {activeSectionId === "vacancies" ? (
                  <ChevronDown className="h-4 w-4 text-neutral-400" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-neutral-400" />
                )}
              </button>

            {activeSectionId === "vacancies" && (
              <div className="p-4 pt-1 border-t border-neutral-800 space-y-4 text-xs bg-neutral-950/50">
                {/* Grid Layout & Alignment Controls */}
                <div className="grid grid-cols-2 gap-2 bg-neutral-900 p-2.5 rounded-lg border border-neutral-800">
                  <div>
                    <label className="block text-[10px] font-bold text-neutral-400 mb-1">
                      Columnas
                    </label>
                    <select
                      value={siteData.generalInfo?.vacanciesGridCols || "3"}
                      onChange={(e) => updateGeneralInfo({ vacanciesGridCols: e.target.value as any })}
                      className="w-full px-2 py-1 rounded bg-neutral-800 border border-neutral-700 text-[11px] text-white"
                    >
                      <option value="auto">✨ Auto-Centrado</option>
                      <option value="1">1 Columna</option>
                      <option value="2">2 Columnas</option>
                      <option value="3">3 Columnas</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-neutral-400 mb-1">
                      Alineación
                    </label>
                    <select
                      value={siteData.generalInfo?.vacanciesAlignment || "center"}
                      onChange={(e) => updateGeneralInfo({ vacanciesAlignment: e.target.value as any })}
                      className="w-full px-2 py-1 rounded bg-neutral-800 border border-neutral-700 text-[11px] text-white"
                    >
                      <option value="center">🎯 Centrado</option>
                      <option value="left">⬅️ Izquierda</option>
                    </select>
                  </div>
                </div>

                {/* Vacancy Items List */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-white">Plazas Disponibles:</span>
                    <button
                      onClick={() => {
                        const newVac: Vacancy = {
                          id: Date.now().toString(),
                          title: "Nueva Plaza de Empleo",
                          location: "Ciudad de Guatemala, Zona 12",
                          license: "Licencia Tipo A o B",
                          salary: "Q5,000.00 / mes",
                          flyerImage: "",
                          subjectEmail: "CV - Nueva Plaza",
                          whatsappNumber: siteData.contactInfo.whatsappRRHH || "50230137849",
                          emailContact: siteData.contactInfo.emailRRHH || "recursoshumanos@logiserviciosmonaco.com",
                          requirements: ["Experiencia previa comprobable", "Responsable y puntual"],
                          offers: ["Salario competitivo", "Prestaciones de ley"],
                          active: true,
                        };
                        setVacancies([newVac, ...siteData.vacancies]);
                        setEditingVacancy(newVac);
                        showNotification("Nueva plaza agregada");
                      }}
                      className="px-2.5 py-1 rounded bg-emerald-700 text-white font-bold text-[10px] hover:bg-emerald-600 flex items-center gap-1 shadow-xs"
                    >
                      <Plus className="h-3 w-3" /> Agregar Plaza
                    </button>
                  </div>

                  <div className="space-y-2">
                    {siteData.vacancies.map((vac, index) => (
                      <div
                        key={vac.id}
                        className="p-2.5 rounded-lg border border-neutral-800 bg-neutral-900 flex items-center justify-between gap-2"
                      >
                        <div className="flex items-center gap-2 overflow-hidden">
                          {vac.flyerImage ? (
                            <img
                              src={vac.flyerImage}
                              alt={vac.title}
                              className="h-9 w-9 object-cover rounded border border-neutral-700 shrink-0"
                            />
                          ) : (
                            <div className="h-9 w-9 bg-neutral-800 rounded flex items-center justify-center text-neutral-500 text-xs shrink-0 font-bold">
                              CV
                            </div>
                          )}
                          <div className="truncate">
                            <h4 className="font-bold text-xs text-white truncate">{vac.title}</h4>
                            <p className="text-[10px] text-neutral-400 truncate">{vac.salary}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          {/* Order buttons */}
                          <button
                            disabled={index === 0}
                            onClick={() => moveVacancy(index, "up")}
                            className="p-1 rounded hover:bg-neutral-800 disabled:opacity-30 text-neutral-300"
                            title="Subir posición"
                          >
                            <ArrowUp className="h-3.5 w-3.5" />
                          </button>
                          <button
                            disabled={index === siteData.vacancies.length - 1}
                            onClick={() => moveVacancy(index, "down")}
                            className="p-1 rounded hover:bg-neutral-800 disabled:opacity-30 text-neutral-300"
                            title="Bajar posición"
                          >
                            <ArrowDown className="h-3.5 w-3.5" />
                          </button>

                          {/* Edit button */}
                          <button
                            onClick={() => setEditingVacancy(vac)}
                            className="px-2 py-1 rounded bg-red-800 text-white text-[10px] font-bold hover:bg-red-700"
                          >
                            Editar
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => {
                              if (confirm(`¿Eliminar la vacante "${vac.title}"?`)) {
                                setVacancies(siteData.vacancies.filter((v) => v.id !== vac.id));
                                showNotification("Vacante eliminada");
                              }
                            }}
                            className="p-1 text-red-400 hover:text-red-300 hover:bg-red-950/50 rounded"
                            title="Eliminar"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          )}

          {/* SECTION 4: FLEET UNITS & POSITIONS (Visible on 'inicio' or 'flota') */}
          {(selectedPage === "inicio" || selectedPage === "flota") && (
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/80 overflow-hidden">
              <button
                onClick={() => setActiveSectionId(activeSectionId === "fleet" ? "" : "fleet")}
                className="w-full p-3.5 flex items-center justify-between text-left hover:bg-neutral-800/60 transition"
              >
                <div className="flex items-center gap-2.5 font-bold text-xs text-neutral-200">
                  <Truck className="h-4 w-4 text-sky-400" />
                  <span>Flota de Transporte & Posición ({siteData.fleet.length})</span>
                </div>
                {activeSectionId === "fleet" ? (
                  <ChevronDown className="h-4 w-4 text-neutral-400" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-neutral-400" />
                )}
              </button>

            {activeSectionId === "fleet" && (
              <div className="p-4 pt-1 border-t border-neutral-800 space-y-4 text-xs bg-neutral-950/50">
                {/* Grid Layout & Alignment Controls */}
                <div className="grid grid-cols-2 gap-2 bg-neutral-900 p-2.5 rounded-lg border border-neutral-800">
                  <div>
                    <label className="block text-[10px] font-bold text-neutral-400 mb-1">
                      Columnas Flota
                    </label>
                    <select
                      value={siteData.generalInfo?.fleetGridCols || "3"}
                      onChange={(e) => updateGeneralInfo({ fleetGridCols: e.target.value as any })}
                      className="w-full px-2 py-1 rounded bg-neutral-800 border border-neutral-700 text-[11px] text-white"
                    >
                      <option value="auto">✨ Auto-Centrado</option>
                      <option value="2">2 Columnas</option>
                      <option value="3">3 Columnas</option>
                      <option value="4">4 Columnas</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-neutral-400 mb-1">
                      Alineación Flota
                    </label>
                    <select
                      value={siteData.generalInfo?.fleetAlignment || "center"}
                      onChange={(e) => updateGeneralInfo({ fleetAlignment: e.target.value as any })}
                      className="w-full px-2 py-1 rounded bg-neutral-800 border border-neutral-700 text-[11px] text-white"
                    >
                      <option value="center">🎯 Centrado</option>
                      <option value="left">⬅️ Izquierda</option>
                    </select>
                  </div>
                </div>

                {/* Fleet Items List */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-white">Unidades de la Flota:</span>
                    <button
                      onClick={() => {
                        const newUnit: FleetItem = {
                          id: Date.now().toString(),
                          title: "Nueva Unidad de Transporte",
                          capacity: "5 Toneladas",
                          description: "Unidad con furgón seco o refrigerado.",
                          image: "",
                        };
                        setFleet([...siteData.fleet, newUnit]);
                        setEditingFleet(newUnit);
                        showNotification("Nueva unidad agregada");
                      }}
                      className="px-2.5 py-1 rounded bg-sky-700 text-white font-bold text-[10px] hover:bg-sky-600 flex items-center gap-1 shadow-xs"
                    >
                      <Plus className="h-3 w-3" /> Agregar Unidad
                    </button>
                  </div>

                  <div className="space-y-2">
                    {siteData.fleet.map((unit, index) => (
                      <div
                        key={unit.id}
                        className="p-2.5 rounded-lg border border-neutral-800 bg-neutral-900 flex items-center justify-between gap-2"
                      >
                        <div className="flex items-center gap-2 overflow-hidden">
                          {unit.image ? (
                            <img
                              src={unit.image}
                              alt={unit.title}
                              className="h-9 w-12 object-cover rounded border border-neutral-700 shrink-0"
                            />
                          ) : (
                            <div className="h-9 w-12 bg-neutral-800 rounded flex items-center justify-center text-neutral-500 text-xs shrink-0 font-bold">
                              <Truck className="h-4 w-4" />
                            </div>
                          )}
                          <div className="truncate">
                            <h4 className="font-bold text-xs text-white truncate">{unit.title}</h4>
                            <p className="text-[10px] text-neutral-400 truncate">{unit.capacity}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          {/* Order buttons */}
                          <button
                            disabled={index === 0}
                            onClick={() => moveFleet(index, "up")}
                            className="p-1 rounded hover:bg-neutral-800 disabled:opacity-30 text-neutral-300"
                            title="Subir posición"
                          >
                            <ArrowUp className="h-3.5 w-3.5" />
                          </button>
                          <button
                            disabled={index === siteData.fleet.length - 1}
                            onClick={() => moveFleet(index, "down")}
                            className="p-1 rounded hover:bg-neutral-800 disabled:opacity-30 text-neutral-300"
                            title="Bajar posición"
                          >
                            <ArrowDown className="h-3.5 w-3.5" />
                          </button>

                          {/* Edit button */}
                          <button
                            onClick={() => setEditingFleet(unit)}
                            className="px-2 py-1 rounded bg-neutral-800 text-white text-[10px] font-bold hover:bg-neutral-700 border border-neutral-700"
                          >
                            Editar
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => {
                              if (confirm(`¿Eliminar la unidad "${unit.title}"?`)) {
                                setFleet(siteData.fleet.filter((f) => f.id !== unit.id));
                                showNotification("Unidad eliminada");
                              }
                            }}
                            className="p-1 text-red-400 hover:text-red-300 hover:bg-red-950/50 rounded"
                            title="Eliminar"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          )}

          {/* SECTION 5: CUSTOM SECTIONS / BLOQUES DINÁMICOS */}
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/80 overflow-hidden">
            <button
              onClick={() => setActiveSectionId(activeSectionId === "custom" ? "" : "custom")}
              className="w-full p-3.5 flex items-center justify-between text-left hover:bg-neutral-800/60 transition"
            >
              <div className="flex items-center gap-2.5 font-bold text-xs text-neutral-200">
                <Layers className="h-4 w-4 text-gold" />
                <span>Bloques y Secciones Personalizadas ({siteData.customSections?.length || 0})</span>
              </div>
              {activeSectionId === "custom" ? (
                <ChevronDown className="h-4 w-4 text-neutral-400" />
              ) : (
                <ChevronRight className="h-4 w-4 text-neutral-400" />
              )}
            </button>

            {activeSectionId === "custom" && (
              <div className="p-4 pt-1 border-t border-neutral-800 space-y-3 text-xs bg-neutral-950/50">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-white">Bloques de Contenido:</span>
                  <button
                    onClick={() => {
                      const newSec: CustomSection = {
                        id: Date.now().toString(),
                        title: "Nuevo Bloque de Contenido",
                        subtitle: "Destacado",
                        content: "Escribe aquí la descripción de tu nuevo bloque.",
                        imageUrl: "",
                        mediaType: "image",
                        videoUrl: "",
                        buttonText: "",
                        buttonUrl: "",
                        layoutStyle: "card",
                        bgStyle: "light",
                        active: true,
                        order: (siteData.customSections?.length || 0) + 1,
                        pageTarget: selectedPage as any,
                      };
                      setCustomSections([...(siteData.customSections || []), newSec]);
                      setEditingCustomSection(newSec);
                      showNotification("Nuevo bloque creado");
                    }}
                    className="px-2.5 py-1 rounded bg-gold text-neutral-950 font-bold text-[10px] hover:brightness-110 flex items-center gap-1 shadow-xs"
                  >
                    <Plus className="h-3 w-3" /> Agregar Bloque
                  </button>
                </div>

                <div className="space-y-2">
                  {(siteData.customSections || []).map((sec, index) => (
                    <div
                      key={sec.id}
                      className="p-2.5 rounded-lg border border-neutral-800 bg-neutral-900 flex items-center justify-between gap-2"
                    >
                      <div className="truncate">
                        <h4 className="font-bold text-xs text-white truncate">{sec.title}</h4>
                        <p className="text-[10px] text-neutral-400 truncate">
                          {sec.pageTarget ? `Página: ${sec.pageTarget}` : "Todas las páginas"}
                        </p>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          disabled={index === 0}
                          onClick={() => moveCustomSection(index, "up")}
                          className="p-1 rounded hover:bg-neutral-800 disabled:opacity-30 text-neutral-300"
                        >
                          <ArrowUp className="h-3.5 w-3.5" />
                        </button>
                        <button
                          disabled={index === (siteData.customSections?.length || 0) - 1}
                          onClick={() => moveCustomSection(index, "down")}
                          className="p-1 rounded hover:bg-neutral-800 disabled:opacity-30 text-neutral-300"
                        >
                          <ArrowDown className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => setEditingCustomSection(sec)}
                          className="px-2 py-1 rounded bg-neutral-800 text-white text-[10px] font-bold hover:bg-neutral-700 border border-neutral-700"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`¿Eliminar la sección "${sec.title}"?`)) {
                              setCustomSections(siteData.customSections.filter((s) => s.id !== sec.id));
                              showNotification("Bloque eliminado");
                            }
                          }}
                          className="p-1 text-red-400 hover:text-red-300 hover:bg-red-950/50 rounded"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* SECTION 6: CONTACT & FORM CONFIGURATION (Visible on 'contacto' or 'inicio') */}
          {(selectedPage === "contacto" || selectedPage === "inicio") && (
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/80 overflow-hidden">
              <button
                onClick={() => setActiveSectionId(activeSectionId === "contact" ? "" : "contact")}
                className="w-full p-3.5 flex items-center justify-between text-left hover:bg-neutral-800/60 transition"
              >
                <div className="flex items-center gap-2.5 font-bold text-xs text-neutral-200">
                  <Phone className="h-4 w-4 text-gold" />
                  <span>Contactos, Teléfonos & Formulario</span>
                </div>
                {activeSectionId === "contact" ? (
                  <ChevronDown className="h-4 w-4 text-neutral-400" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-neutral-400" />
                )}
              </button>

              {activeSectionId === "contact" && (
                <div className="p-4 pt-1 border-t border-neutral-800 space-y-3 text-xs bg-neutral-950/50">
                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-400 mb-1">
                      Título Formulario de Cotización
                    </label>
                    <input
                      type="text"
                      value={siteData.contactInfo.formTitle || "Solicita tu cotización"}
                      onChange={(e) => updateContactInfo({ formTitle: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-400 mb-1">
                      Enlace de Envíos Formspree / Backend
                    </label>
                    <input
                      type="text"
                      value={siteData.contactInfo.formspreeUrl || "https://formspree.io/f/xzdndgdq"}
                      onChange={(e) => updateContactInfo({ formspreeUrl: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white font-mono text-[10px]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-400 mb-1">
                      Teléfono PBX
                    </label>
                    <input
                      type="text"
                      value={siteData.contactInfo.phone}
                      onChange={(e) => updateContactInfo({ phone: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-400 mb-1">
                      WhatsApp Ventas / Cotizaciones
                    </label>
                    <input
                      type="text"
                      value={siteData.contactInfo.whatsappMain}
                      onChange={(e) => updateContactInfo({ whatsappMain: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-400 mb-1">
                      WhatsApp Reclutamiento / RRHH
                    </label>
                    <input
                      type="text"
                      value={siteData.contactInfo.whatsappRRHH}
                      onChange={(e) => updateContactInfo({ whatsappRRHH: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-400 mb-1">
                      Correo Electrónico Consultas
                    </label>
                    <input
                      type="email"
                      value={siteData.contactInfo.emailInfo}
                      onChange={(e) => updateContactInfo({ emailInfo: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-400 mb-1">
                      Correo Electrónico RRHH
                    </label>
                    <input
                      type="email"
                      value={siteData.contactInfo.emailRRHH}
                      onChange={(e) => updateContactInfo({ emailRRHH: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-400 mb-1">
                      Dirección de Bodega u Oficinas
                    </label>
                    <textarea
                      rows={2}
                      value={siteData.contactInfo.address}
                      onChange={(e) => updateContactInfo({ address: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white"
                    />
                  </div>

                  {/* MAP CONFIGURATION CONTROLS */}
                  <div className="pt-2 border-t border-neutral-800 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-bold text-amber-400 flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" /> Mostrar Mapa Interactivo
                      </label>
                      <input
                        type="checkbox"
                        checked={siteData.contactInfo.showMap !== false}
                        onChange={(e) => updateContactInfo({ showMap: e.target.checked })}
                        className="h-4 w-4 rounded bg-neutral-800 border-neutral-700 text-amber-500 focus:ring-0 cursor-pointer"
                      />
                    </div>

                    {siteData.contactInfo.showMap !== false && (
                      <>
                        <div>
                          <label className="block text-[11px] font-semibold text-neutral-400 mb-1">
                            Ubicación / Posición del Mapa
                          </label>
                          <select
                            value={siteData.contactInfo.mapPosition || "bottom"}
                            onChange={(e) => updateContactInfo({ mapPosition: e.target.value as any })}
                            className="w-full px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white text-xs font-semibold"
                          >
                            <option value="bottom">👇 Abajo del Formulario (Ancho Completo)</option>
                            <option value="top">👆 Arriba del Formulario (Ancho Completo)</option>
                            <option value="sidebar">👉 En Columna Lateral (Bajo Datos de Contacto)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-neutral-400 mb-1">
                            Altura del Mapa
                          </label>
                          <select
                            value={siteData.contactInfo.mapHeight || "350px"}
                            onChange={(e) => updateContactInfo({ mapHeight: e.target.value })}
                            className="w-full px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white text-xs"
                          >
                            <option value="250px">Compacto (250px)</option>
                            <option value="350px">Estándar (350px)</option>
                            <option value="450px">Grande (450px)</option>
                            <option value="550px">Súper Amplio (550px)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-neutral-400 mb-1">
                            URL de Insertar Mapa de Google Maps (iFrame / Embed)
                          </label>
                          <input
                            type="text"
                            value={extractMapUrl(siteData.contactInfo.mapEmbedUrl) || ""}
                            placeholder="https://www.google.com/maps/embed?... o pega todo el código <iframe...>"
                            onChange={(e) => updateContactInfo({ mapEmbedUrl: extractMapUrl(e.target.value) })}
                            className="w-full px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white font-mono text-[10px]"
                          />
                          <p className="text-[10px] text-emerald-400 mt-1">
                            ✨ Puedes pegar el enlace o todo el código <code className="bg-neutral-800 px-1 rounded text-neutral-300">&lt;iframe src="..."&gt;</code> que te da Google Maps. El sistema extraerá la dirección automáticamente.
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions in Sidebar */}
        <div className="p-4 border-t border-neutral-800 bg-neutral-950 flex items-center justify-between gap-2">
          {onCloseAdmin && (
            <button
              onClick={onCloseAdmin}
              className="px-3 py-2 rounded-lg bg-neutral-800 text-neutral-300 font-semibold text-xs hover:bg-neutral-700 transition"
            >
              Volver al Panel
            </button>
          )}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-700 text-white font-bold text-xs hover:bg-red-600 transition shadow-xs ml-auto"
          >
            <Eye className="h-4 w-4" /> Ver Web Completa <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>

      {/* RIGHT STAGE: LIVE INTERACTIVE PREVIEW CANVAS */}
      <div className="flex-1 bg-neutral-900 flex flex-col min-h-screen">
        {/* Preview Top Control Bar */}
        <div className="h-14 bg-neutral-950 border-b border-neutral-800 px-4 flex items-center justify-between gap-4 sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-neutral-300 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
              Vista Previa en Vivo:
            </span>
            <span className="text-xs bg-neutral-800 px-2.5 py-1 rounded-full text-gold font-mono border border-neutral-700 capitalize">
              {selectedPage === "inicio"
                ? "Página de Inicio"
                : selectedPage === "trabaja"
                ? "Únete al Equipo (Vacantes)"
                : selectedPage === "flota"
                ? "Flota de Transporte"
                : selectedPage === "cobertura"
                ? "Cobertura Nacional"
                : selectedPage === "filosofia"
                ? "Filosofía Empresarial"
                : "Contacto"}
            </span>
          </div>

          {/* Device Toggle */}
          <div className="flex items-center bg-neutral-900 rounded-lg p-1 border border-neutral-800">
            <button
              onClick={() => setPreviewDevice("desktop")}
              className={`flex items-center gap-1 px-3 py-1 rounded-md text-xs font-semibold transition ${
                previewDevice === "desktop"
                  ? "bg-red-700 text-white shadow-xs"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Monitor className="h-3.5 w-3.5" /> Escritorio
            </button>
            <button
              onClick={() => setPreviewDevice("mobile")}
              className={`flex items-center gap-1 px-3 py-1 rounded-md text-xs font-semibold transition ${
                previewDevice === "mobile"
                  ? "bg-red-700 text-white shadow-xs"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Smartphone className="h-3.5 w-3.5" /> Móvil
            </button>
          </div>
        </div>

        {/* Live Canvas Stage Wrapper */}
        <div className="flex-1 p-4 md:p-8 flex justify-center items-start overflow-y-auto">
          <div
            className={`transition-all duration-300 bg-background text-foreground shadow-2xl rounded-2xl overflow-hidden border border-neutral-800 min-h-[700px] w-full ${
              previewDevice === "mobile" ? "max-w-[390px] my-4 ring-8 ring-neutral-800" : "max-w-7xl"
            }`}
          >
            {/* SIMULATED LIVE PAGE RENDERING */}

            {/* Header Simulator */}
            <header
              className="bg-white border-b border-border py-3 px-6 flex items-center justify-between relative group cursor-pointer hover:ring-2 hover:ring-gold transition"
              onClick={() => {
                setActiveSectionId("branding");
                showNotification("✏️ Sección de Logo y Marca abierta");
              }}
            >
              <img
                src={siteData.branding?.logoUrl}
                alt="Logo Monaco"
                className="h-10 w-auto object-contain"
              />
              <div className="hidden md:flex items-center gap-6 text-xs font-semibold text-neutral-700">
                <span>Inicio</span>
                <span>Filosofía</span>
                <span>Cobertura</span>
                <span>Únete al equipo</span>
                <span>Contacto</span>
              </div>
              <button className="bg-red-700 text-white font-bold text-xs px-3.5 py-2 rounded-lg shadow-xs">
                Cotizar
              </button>
              <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition flex items-center justify-center font-bold text-xs text-neutral-900 backdrop-blur-[1px]">
                ✏️ Clic para editar Logo y Encabezado
              </div>
            </header>

            {/* PAGE CONTENT SWITCHER */}
            {selectedPage === "inicio" && (
              <div>
                {/* Hero Banner */}
                <div
                  className="relative py-20 px-6 text-white bg-cover bg-center overflow-hidden group cursor-pointer"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.8)), url(${siteData.branding?.heroBgUrl})`,
                  }}
                  onClick={() => {
                    setActiveSectionId("hero");
                    showNotification("✏️ Sección de Portada Hero abierta");
                  }}
                >
                  <div className="max-w-3xl space-y-4 relative z-10">
                    <span className="inline-block px-3 py-1 rounded-full bg-gold text-neutral-950 text-xs font-bold uppercase">
                      {siteData.generalInfo?.heroBadge || "Logística Guatemala"}
                    </span>
                    <h1 className="text-3xl md:text-5xl font-black leading-tight">
                      {siteData.generalInfo?.heroTitle || "Movemos tu carga por toda Guatemala."}
                    </h1>
                    <p className="text-sm md:text-base text-neutral-200">
                      {siteData.generalInfo?.heroSubtitle || "En Logiservicios Mónaco convertimos la logística en tu ventaja competitiva."}
                    </p>
                    <div className="pt-2 flex flex-wrap gap-2">
                      <span className="bg-white text-[#C00000] rounded-lg px-4 py-2 font-extrabold text-xs shadow-md">
                        Solicitar cotización →
                      </span>
                      <span className="border border-white text-white rounded-lg px-4 py-2 font-bold text-xs">
                        Nuestra Filosofía
                      </span>
                    </div>

                    {/* Stats */}
                    <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-xl">
                      {[
                        [siteData.generalInfo?.heroStat1Number || "22", siteData.generalInfo?.heroStat1Label || "Departamentos"],
                        [siteData.generalInfo?.heroStat2Number || "24/7", siteData.generalInfo?.heroStat2Label || "Monitoreo"],
                        [siteData.generalInfo?.heroStat3Number || "+10", siteData.generalInfo?.heroStat3Label || "Años de experiencia"],
                        [siteData.generalInfo?.heroStat4Number || "100%", siteData.generalInfo?.heroStat4Label || "Compromiso"],
                      ].map(([n, l]) => (
                        <div key={l} className="bg-black/30 p-2 rounded-lg backdrop-blur-xs">
                          <div className="text-xl font-black text-gold">{n}</div>
                          <div className="text-[10px] text-neutral-300">{l}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-red-600/20 opacity-0 group-hover:opacity-100 transition flex items-center justify-center font-bold text-sm text-white backdrop-blur-[1px]">
                    ✏️ Clic para editar Título, Subtítulo y Fondo Hero
                  </div>
                </div>

                {/* Nuestros Servicios Section */}
                <div className="py-12 px-6 bg-background border-t border-border">
                  <div
                    className="text-center max-w-2xl mx-auto mb-8 space-y-2 cursor-pointer group relative p-3 rounded-xl hover:bg-gold/5 transition border border-transparent hover:border-gold/30"
                    onClick={() => {
                      setActiveSectionId("hero");
                      showNotification("✏️ Panel de Textos y Títulos de la Empresa abierto");
                    }}
                  >
                    <h2 className="text-2xl font-bold">Nuestros servicios</h2>
                    <p className="text-xs text-muted-foreground">Soluciones integrales de transporte terrestre y logística en Guatemala.</p>
                    <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition flex items-center justify-center font-bold text-xs text-neutral-900 backdrop-blur-[1px]">
                      ✏️ Clic para editar Encabezado de Servicios
                    </div>
                  </div>

                  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                      { icon: "🚚", title: "Transporte de carga", desc: "Unidades de distintos tonelajes para carga seca y refrigerada con control térmico." },
                      { icon: "📦", title: "Distribución nacional", desc: "Última milla en las principales ciudades y municipios del país." },
                      { icon: "📍", title: "Rutas dedicadas", desc: "Ajustamos horarios y logística integral a tus operaciones." },
                      { icon: "🛡️", title: "Carga asegurada", desc: "Rastreo GPS en tiempo real y protocolo de seguridad 24/7." },
                    ].map((srv) => (
                      <div
                        key={srv.title}
                        onClick={() => {
                          setActiveSectionId("hero");
                          showNotification(`✏️ Editando sección de servicios`);
                        }}
                        className="p-4 rounded-xl border border-border bg-card shadow-xs space-y-2 cursor-pointer group relative hover:border-gold transition"
                      >
                        <div className="h-9 w-9 rounded-lg bg-gold/10 text-gold flex items-center justify-center font-bold text-base">
                          {srv.icon}
                        </div>
                        <h3 className="font-bold text-sm text-foreground">{srv.title}</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">{srv.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fleet Section Simulator */}
                <div className="py-12 px-6 bg-muted/40 border-t border-border">
                  <div className="text-center max-w-2xl mx-auto mb-8 space-y-3">
                    <span className="text-gold font-bold uppercase text-[10px] tracking-wider">Capacidades e infraestructura</span>
                    <h2 className="text-2xl md:text-3xl font-bold">Nuestra Flota de Transporte</h2>
                    <p className="text-xs text-muted-foreground">
                      Contamos con una variedad de unidades listas para adaptarse a cualquier exigencia de tonelaje, volumen y temperatura.
                    </p>

                    {/* View Switcher Tabs */}
                    <div className="inline-flex p-1 rounded-xl bg-card border border-border shadow-xs">
                      <button
                        type="button"
                        onClick={() => setFleetTab("catalog")}
                        className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                          fleetTab === "catalog"
                            ? "bg-primary text-primary-foreground shadow-xs"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        🚚 Catálogo visual de unidades
                      </button>
                      <button
                        type="button"
                        onClick={() => setFleetTab("specs")}
                        className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                          fleetTab === "specs"
                            ? "bg-primary text-primary-foreground shadow-xs"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        📊 Tabla de capacidades y medidas
                      </button>
                    </div>
                  </div>

                  {/* Tab 1: Catalog view */}
                  {fleetTab === "catalog" && (
                    <div
                      className={
                        siteData.generalInfo?.fleetGridCols === "2"
                          ? "grid grid-cols-1 md:grid-cols-2 gap-6"
                          : siteData.generalInfo?.fleetGridCols === "4"
                          ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
                          : "grid grid-cols-1 md:grid-cols-3 gap-6"
                      }
                    >
                      {siteData.fleet.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => {
                            setEditingFleet(item);
                            showNotification(`✏️ Editando unidad: ${item.title}`);
                          }}
                          className="rounded-xl border border-border bg-background p-4 shadow-xs space-y-3 group hover:border-gold transition relative cursor-pointer"
                        >
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.title}
                              className="h-32 w-full object-cover rounded-lg"
                            />
                          ) : (
                            <div className="h-32 w-full bg-muted rounded-lg flex items-center justify-center text-xs text-muted-foreground font-bold">
                              Sin Imagen
                            </div>
                          )}
                          <h3 className="font-bold text-sm">{item.title}</h3>
                          <span className="text-xs font-semibold text-gold bg-gold/10 px-2 py-0.5 rounded">
                            {item.capacity}
                          </span>
                          <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>
                          <div className="absolute inset-0 bg-gold/10 border-2 border-gold rounded-xl opacity-0 group-hover:opacity-100 transition flex items-center justify-center font-bold text-xs text-neutral-900 bg-white/90 shadow-lg p-2 text-center pointer-events-none">
                            ✏️ Clic para editar {item.title}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tab 2: Specs Table */}
                  {fleetTab === "specs" && (
                    <div className="space-y-6 max-w-5xl mx-auto cursor-pointer" onClick={() => setActiveSectionId("fleet")}>
                      <div className="rounded-xl border border-border bg-card shadow-xs overflow-hidden">
                        <div className="bg-primary px-4 py-3 text-primary-foreground flex items-center justify-between">
                          <span className="font-bold text-xs flex items-center gap-2">🚚 Flota Carga Seca (Capacidades y Dimensiones)</span>
                          <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded">9 Tipos de Unidades</span>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full text-xs">
                            <thead className="bg-muted text-muted-foreground text-left text-[10px] uppercase font-bold">
                              <tr>
                                <th className="px-4 py-2">Tipo de unidad</th>
                                <th className="px-4 py-2">Capacidad</th>
                                <th className="px-4 py-2">Dimensiones</th>
                                <th className="px-4 py-2 text-right">Modalidad</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                              {siteData.fleet
                                .filter((unit) => unit.category !== "refrigerada")
                                .map((unit) => (
                                  <tr
                                    key={unit.id}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setEditingFleet(unit);
                                      showNotification(`✏️ Editando unidad: ${unit.title}`);
                                    }}
                                    className="hover:bg-amber-500/10 cursor-pointer transition group"
                                  >
                                    <td className="px-4 py-2 font-bold flex items-center justify-between">
                                      <span>{unit.title}</span>
                                      <span className="text-[10px] text-amber-500 font-bold opacity-0 group-hover:opacity-100 transition">✏️ Editar</span>
                                    </td>
                                    <td className="px-4 py-2 text-muted-foreground">{unit.capacity}</td>
                                    <td className="px-4 py-2 text-muted-foreground">{unit.dimensions || "Estándar"}</td>
                                    <td className="px-4 py-2 text-right text-primary font-semibold">{unit.modality || "General"}</td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className="rounded-xl border border-sky-200 dark:border-sky-900 bg-card shadow-xs overflow-hidden">
                        <div className="bg-sky-600 px-4 py-3 text-white flex items-center justify-between">
                          <span className="font-bold text-xs flex items-center gap-2">❄️ Flota Carga Refrigerada (Temperatura Controlada)</span>
                          <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded">Termoking</span>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full text-xs">
                            <tbody className="divide-y divide-border">
                              {siteData.fleet
                                .filter((unit) => unit.category === "refrigerada")
                                .map((unit) => (
                                  <tr
                                    key={unit.id}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setEditingFleet(unit);
                                      showNotification(`✏️ Editando unidad: ${unit.title}`);
                                    }}
                                    className="hover:bg-sky-500/10 cursor-pointer transition group"
                                  >
                                    <td className="px-4 py-2 font-bold flex items-center justify-between">
                                      <span>{unit.title}</span>
                                      <span className="text-[10px] text-sky-500 font-bold opacity-0 group-hover:opacity-100 transition">✏️ Editar</span>
                                    </td>
                                    <td className="px-4 py-2 text-muted-foreground">{unit.capacity}</td>
                                    <td className="px-4 py-2 text-muted-foreground">{unit.dimensions || "Estándar"}</td>
                                    <td className="px-4 py-2 text-right text-sky-600 font-semibold">{unit.modality || "Refrigerada"}</td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Servicios Adicionales */}
                <div className="py-12 px-6 bg-background border-t border-border">
                  <div className="text-center max-w-2xl mx-auto mb-8 space-y-1">
                    <span className="text-gold font-bold uppercase text-[10px] tracking-wider">Complementos</span>
                    <h2 className="text-2xl font-bold">Servicios adicionales</h2>
                  </div>
                  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                      { icon: "👥", title: "Cuadrillas de carga", desc: "Personal disponible para agilizar tu operación en origen y destino." },
                      { icon: "🚘", title: "Vehículo de escolta", desc: "Acompañamiento en ruta para trayectos de mayor seguridad." },
                      { icon: "👮", title: "Custodios en unidad", desc: "Recomendado para mercancías sensibles o de alto valor." },
                      { icon: "📜", title: "Seguro de mercadería", desc: "Cobertura ampliada opcional según el valor declarado de la carga." },
                    ].map((item) => (
                      <div key={item.title} className="p-4 rounded-xl border border-border bg-card shadow-xs space-y-2">
                        <div className="text-lg">{item.icon}</div>
                        <h3 className="font-bold text-xs">{item.title}</h3>
                        <p className="text-[11px] text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sobre la Empresa / Bodega */}
                <div className="py-12 px-6 bg-muted/40 border-t border-border">
                  <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-center">
                    <div
                      className="relative group cursor-pointer rounded-xl overflow-hidden border border-border shadow-xs"
                      onClick={() => {
                        setActiveSectionId("branding");
                        showNotification("✏️ Cambiar Imagen de Bodega en Imágenes de Empresa");
                      }}
                    >
                      <img
                        src={siteData.branding?.warehouseBgUrl}
                        alt="Bodega"
                        className="w-full h-56 object-cover"
                      />
                      <div className="absolute inset-0 bg-gold/15 border-2 border-gold opacity-0 group-hover:opacity-100 transition flex items-center justify-center font-bold text-xs text-neutral-900 bg-white/90 shadow-lg p-2 text-center">
                        ✏️ Clic para cambiar Imagen de Bodega
                      </div>
                    </div>

                    <div
                      className="space-y-3 cursor-pointer group relative p-3 rounded-xl hover:bg-gold/5 transition border border-transparent hover:border-gold/30"
                      onClick={() => {
                        setActiveSectionId("hero");
                        showNotification("✏️ Editar textos sobre la Empresa");
                      }}
                    >
                      <span className="text-gold font-bold uppercase text-xs">La empresa</span>
                      <h2 className="text-2xl font-bold">Guatemaltecos moviendo a Guatemala</h2>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Logiservicios Mónaco nace para ofrecer un servicio logístico confiable, transparente y a la medida de cada cliente. Combinamos experiencia, tecnología y compromiso humano para entregar resultados que impulsan tu negocio.
                      </p>
                      <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition flex items-center justify-center font-bold text-xs text-neutral-900 backdrop-blur-[1px]">
                        ✏️ Clic para editar información de la Empresa
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dynamic Custom Sections */}
                <DynamicSections
                  page="inicio"
                  onSelectSection={(sec) => {
                    setEditingCustomSection(sec);
                    showNotification(`✏️ Editando bloque: ${sec.title}`);
                  }}
                />
              </div>
            )}

            {selectedPage === "trabaja" && (
              <div className="py-12 px-6 space-y-8">
                <div
                  className="bg-hero-gradient text-white p-8 rounded-2xl text-center space-y-3 cursor-pointer group relative hover:ring-2 hover:ring-gold transition"
                  onClick={() => {
                    setActiveSectionId("vacancies");
                    showNotification("✏️ Configuración General de Vacantes abierta");
                  }}
                >
                  <span className="text-gold uppercase font-bold text-xs tracking-wider">
                    Oportunidades Laborales
                  </span>
                  <h1 className="text-3xl font-black">
                    {siteData.generalInfo?.trabajaHeroTitle || "Únete a Nuestro Equipo"}
                  </h1>
                  <p className="text-sm text-neutral-200 max-w-2xl mx-auto">
                    {siteData.generalInfo?.trabajaHeroSubtitle ||
                      "Forma parte de la red logística líder en Guatemala."}
                  </p>
                  <div className="absolute inset-0 bg-gold/15 rounded-2xl opacity-0 group-hover:opacity-100 transition flex items-center justify-center font-bold text-xs text-white backdrop-blur-[1px]">
                    ✏️ Clic para editar Encabezado de Reclutamiento
                  </div>
                </div>

                {/* Vacancies Live Grid */}
                <div
                  className={
                    siteData.generalInfo?.vacanciesGridCols === "1"
                      ? "grid grid-cols-1 max-w-xl mx-auto gap-6"
                      : siteData.generalInfo?.vacanciesGridCols === "2"
                      ? "grid grid-cols-1 md:grid-cols-2 gap-6"
                      : "grid grid-cols-1 md:grid-cols-3 gap-6"
                  }
                >
                  {siteData.vacancies.map((vac) => (
                    <div
                      key={vac.id}
                      onClick={() => {
                        setEditingVacancy(vac);
                        showNotification(`✏️ Editando vacante: ${vac.title}`);
                      }}
                      className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-3 flex flex-col justify-between group hover:border-gold transition relative cursor-pointer"
                    >
                      <div className="space-y-2">
                        {vac.flyerImage && (
                          <img
                            src={vac.flyerImage}
                            alt={vac.title}
                            className="h-40 w-full object-cover rounded-lg border border-border"
                          />
                        )}
                        <h3 className="font-bold text-base text-foreground">{vac.title}</h3>
                        <p className="text-xs font-bold text-gold">{vac.salary}</p>
                        <p className="text-xs text-muted-foreground">📍 {vac.location}</p>
                        <p className="text-xs text-muted-foreground">🪪 {vac.license}</p>
                      </div>

                      <button className="w-full bg-emerald-700 text-white font-bold text-xs py-2 rounded-lg">
                        Aplicar por WhatsApp ({vac.whatsappNumber})
                      </button>

                      <div className="absolute inset-0 bg-emerald-600/15 border-2 border-emerald-500 rounded-xl opacity-0 group-hover:opacity-100 transition flex items-center justify-center font-bold text-xs text-neutral-900 bg-white/90 shadow-lg p-2 text-center pointer-events-none">
                        ✏️ Clic para editar vacante: {vac.title}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Dynamic Sections on Trabaja page */}
                <DynamicSections
                  page="trabaja"
                  onSelectSection={(sec) => {
                    setEditingCustomSection(sec);
                    showNotification(`✏️ Editando bloque: ${sec.title}`);
                  }}
                />
              </div>
            )}

            {selectedPage === "flota" && (
              <div className="py-12 px-6 space-y-8">
                <div
                  className="bg-hero-gradient text-white p-8 rounded-2xl text-center space-y-3 cursor-pointer group relative hover:ring-2 hover:ring-gold transition"
                  onClick={() => {
                    setActiveSectionId("fleet");
                    showNotification("✏️ Gestión de Flota abierta");
                  }}
                >
                  <h1 className="text-3xl font-black">Nuestra Flota de Transporte</h1>
                  <p className="text-sm text-neutral-200">
                    Catálogo de unidades de carga pesada y distribución.
                  </p>
                  <div className="absolute inset-0 bg-gold/15 rounded-2xl opacity-0 group-hover:opacity-100 transition flex items-center justify-center font-bold text-xs text-white backdrop-blur-[1px]">
                    ✏️ Clic para gestionar Lista de Flota
                  </div>
                </div>

                <div
                  className={
                    siteData.generalInfo?.fleetGridCols === "2"
                      ? "grid grid-cols-1 md:grid-cols-2 gap-6"
                      : "grid grid-cols-1 md:grid-cols-3 gap-6"
                  }
                >
                  {siteData.fleet.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        setEditingFleet(item);
                        showNotification(`✏️ Editando unidad: ${item.title}`);
                      }}
                      className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-3 group hover:border-gold transition relative cursor-pointer"
                    >
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-44 w-full object-cover rounded-lg"
                        />
                      )}
                      <h3 className="font-bold text-base">{item.title}</h3>
                      <span className="text-xs font-bold text-gold bg-gold/10 px-2 py-0.5 rounded">
                        Capacidad: {item.capacity}
                      </span>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                      <div className="absolute inset-0 bg-gold/15 border-2 border-gold rounded-xl opacity-0 group-hover:opacity-100 transition flex items-center justify-center font-bold text-xs text-neutral-900 bg-white/90 shadow-lg p-2 text-center pointer-events-none">
                        ✏️ Clic para editar {item.title}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedPage === "cobertura" && (
              <div className="py-12 px-6 space-y-8">
                <div
                  className="bg-hero-gradient text-white p-8 rounded-2xl text-center space-y-3 cursor-pointer group relative hover:ring-2 hover:ring-gold transition"
                  onClick={() => {
                    setActiveSectionId("hero");
                    showNotification("✏️ Sección de Título Cobertura abierta");
                  }}
                >
                  <h1 className="text-3xl font-black">
                    {siteData.generalInfo?.coberturaHeroTitle || "Cobertura en todo el país"}
                  </h1>
                  <p className="text-sm text-neutral-200 max-w-2xl mx-auto">
                    {siteData.generalInfo.coberturaText}
                  </p>
                  <div className="absolute inset-0 bg-gold/15 rounded-2xl opacity-0 group-hover:opacity-100 transition flex items-center justify-center font-bold text-xs text-white backdrop-blur-[1px]">
                    ✏️ Clic para editar Texto de Cobertura
                  </div>
                </div>

                <div
                  className="max-w-3xl mx-auto group relative cursor-pointer"
                  onClick={() => {
                    setActiveSectionId("branding");
                    showNotification("✏️ Sección de Mapa e Imágenes abierta");
                  }}
                >
                  <img
                    src={siteData.branding?.coberturaMapUrl}
                    alt="Mapa de Cobertura"
                    className="w-full h-auto rounded-2xl border border-border shadow-lg"
                  />
                  <div className="absolute inset-0 bg-gold/20 border-2 border-gold rounded-2xl opacity-0 group-hover:opacity-100 transition flex items-center justify-center font-bold text-sm text-neutral-900 bg-white/90 shadow-2xl p-4 text-center pointer-events-none">
                    ✏️ Clic para cambiar Imagen de Mapa
                  </div>
                </div>
              </div>
            )}

            {selectedPage === "filosofia" && (
              <div className="py-12 px-6 space-y-8 max-w-4xl mx-auto">
                <div className="text-center space-y-2">
                  <h1 className="text-3xl font-bold">Filosofía Empresarial</h1>
                  <p className="text-xs text-muted-foreground">Misión y Visión de Logiservicios Mónaco</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-2xl bg-card border border-border space-y-2">
                    <h2 className="font-bold text-lg text-primary">Misión</h2>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {siteData.generalInfo.misionText}
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-card border border-border space-y-2">
                    <h2 className="font-bold text-lg text-gold">Visión</h2>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {siteData.generalInfo.visionText}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {selectedPage === "contacto" && (
              <div className="py-12 px-6 space-y-8 max-w-6xl mx-auto">
                <div
                  className="text-center space-y-2 cursor-pointer group relative p-4 rounded-xl hover:bg-gold/5 transition"
                  onClick={() => {
                    setActiveSectionId("contact");
                    showNotification("✏️ Panel de Contactos y Teléfonos abierto");
                  }}
                >
                  <span className="text-gold font-semibold uppercase text-xs tracking-wider">Estamos para servirte</span>
                  <h1 className="text-3xl md:text-4xl font-bold">Contacto & Ubicación</h1>
                  <p className="text-xs text-muted-foreground">Cuéntanos sobre tu operación y te enviaremos una propuesta a la medida.</p>
                </div>

                {/* Map on Top */}
                {siteData.contactInfo.showMap !== false && (siteData.contactInfo.mapPosition === "top") && (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveSectionId("contact");
                      showNotification("✏️ Configura la posición y URL del mapa en el panel lateral");
                    }}
                    className="rounded-2xl overflow-hidden border border-border shadow-md bg-card cursor-pointer group hover:border-gold transition relative"
                  >
                    <div className="p-3 bg-muted/60 border-b border-border flex items-center justify-between">
                      <span className="text-xs font-bold flex items-center gap-1.5 text-foreground">
                        <MapPin className="h-4 w-4 text-gold" /> Ubicación en Google Maps ({siteData.contactInfo.address || "Guatemala"})
                      </span>
                      <span className="text-[10px] font-bold text-amber-500 opacity-0 group-hover:opacity-100 transition">
                        ✏️ Editar Posición del Mapa
                      </span>
                    </div>
                    <iframe
                      src={extractMapUrl(siteData.contactInfo.mapEmbedUrl) || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.423985108253!2d-90.5367!3d14.575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8589a3f25c78278b%3A0x6bd6c666f0e4b868!2sCalzada%20Atanasio%20Tzul%2C%20Ciudad%20de%20Guatemala!5e0!3m2!1ses!2sgt!4v1710000000000!5m2!1ses!2sgt"}
                      width="100%"
                      height={siteData.contactInfo.mapHeight || "350px"}
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      title="Ubicación en Google Maps"
                      className="w-full pointer-events-none"
                    />
                  </div>
                )}

                <div className="grid md:grid-cols-3 gap-8">
                  {/* Contact Cards Column */}
                  <div
                    className="md:col-span-1 space-y-4 cursor-pointer group relative"
                    onClick={() => {
                      setActiveSectionId("contact");
                      showNotification("✏️ Panel de Datos de Contacto abierto");
                    }}
                  >
                    <div className="p-5 rounded-2xl bg-card border border-border space-y-3 shadow-xs hover:border-gold transition">
                      <h3 className="font-bold text-sm text-primary flex items-center gap-2">📞 Atención a Clientes</h3>
                      <p className="text-xs"><strong>PBX:</strong> {siteData.contactInfo.phone}</p>
                      <p className="text-xs"><strong>WhatsApp:</strong> +{siteData.contactInfo.whatsappMain}</p>
                      <p className="text-xs"><strong>Correo:</strong> {siteData.contactInfo.emailInfo}</p>
                      <p className="text-xs"><strong>Dirección:</strong> {siteData.contactInfo.address}</p>
                      <p className="text-xs text-muted-foreground"><strong>Horario:</strong> {siteData.contactInfo.schedule}</p>
                    </div>

                    <div className="p-5 rounded-2xl bg-card border border-border space-y-3 shadow-xs hover:border-emerald-500 transition">
                      <h3 className="font-bold text-sm text-emerald-600 flex items-center gap-2">💼 Recursos Humanos</h3>
                      <p className="text-xs"><strong>WhatsApp RRHH:</strong> +{siteData.contactInfo.whatsappRRHH}</p>
                      <p className="text-xs"><strong>Correo CV:</strong> {siteData.contactInfo.emailRRHH}</p>
                    </div>

                    {/* Map in Sidebar */}
                    {siteData.contactInfo.showMap !== false && siteData.contactInfo.mapPosition === "sidebar" && (
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveSectionId("contact");
                          showNotification("✏️ Configura la posición y URL del mapa en el panel lateral");
                        }}
                        className="rounded-2xl overflow-hidden border border-border shadow-md bg-card cursor-pointer group hover:border-gold transition relative"
                      >
                        <div className="p-3 bg-muted/60 border-b border-border flex items-center justify-between">
                          <span className="text-xs font-bold flex items-center gap-1.5 text-foreground">
                            <MapPin className="h-4 w-4 text-gold" /> Ubicación
                          </span>
                          <span className="text-[10px] font-bold text-amber-500 opacity-0 group-hover:opacity-100 transition">
                            ✏️ Editar Mapa
                          </span>
                        </div>
                        <iframe
                          src={extractMapUrl(siteData.contactInfo.mapEmbedUrl) || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.423985108253!2d-90.5367!3d14.575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8589a3f25c78278b%3A0x6bd6c666f0e4b868!2sCalzada%20Atanasio%20Tzul%2C%20Ciudad%20de%20Guatemala!5e0!3m2!1ses!2sgt!4v1710000000000!5m2!1ses!2sgt"}
                          width="100%"
                          height={siteData.contactInfo.mapHeight || "300px"}
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          title="Ubicación en Google Maps"
                          className="w-full pointer-events-none"
                        />
                      </div>
                    )}
                  </div>

                  {/* Contact & Quotation Form */}
                  <form
                    action={siteData.contactInfo.formspreeUrl || "https://formspree.io/f/xzdndgdq"}
                    method="POST"
                    onSubmit={(e) => {
                      e.preventDefault();
                      showNotification("📩 Formulario de prueba en la vista del editor. En la web real enviará el correo a través de Formspree.");
                    }}
                    className="md:col-span-2 rounded-2xl border border-border bg-card p-6 md:p-8 shadow-md space-y-4 cursor-pointer relative group hover:border-gold transition"
                    onClick={() => {
                      setActiveSectionId("contact");
                      showNotification("✏️ Puedes editar el título o endpoint del formulario en el panel de Contactos");
                    }}
                  >
                    <h2 className="text-xl font-bold text-foreground">
                      {siteData.contactInfo.formTitle || "Solicita tu cotización"}
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="text-xs font-medium text-muted-foreground block mb-1">Nombre Completo *</label>
                        <input type="text" name="nombre" placeholder="Ej. Juan Pérez" required className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs" />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground block mb-1">Empresa</label>
                        <input type="text" name="empresa" placeholder="Nombre de tu empresa" className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs" />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground block mb-1">Correo Electrónico *</label>
                        <input type="email" name="correo" placeholder="ejemplo@correo.com" required className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs" />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground block mb-1">Teléfono de Contacto</label>
                        <input type="tel" name="telefono" placeholder="+502 0000-0000" className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground block mb-1">Detalles de tu Solicitud / Operación *</label>
                      <textarea
                        name="mensaje"
                        required
                        rows={4}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs"
                        placeholder="Cuéntanos qué necesitas mover, origen, destino y frecuencia de transporte..."
                      />
                    </div>
                    <button type="submit" className="inline-flex items-center gap-2 bg-red-700 text-white rounded-lg px-6 py-2.5 font-bold text-xs hover:bg-red-600 transition shadow-xs">
                      Enviar Solicitud de Cotización ✉️
                    </button>
                  </form>
                </div>

                {/* Map on Bottom */}
                {siteData.contactInfo.showMap !== false && (siteData.contactInfo.mapPosition === "bottom" || !siteData.contactInfo.mapPosition) && (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveSectionId("contact");
                      showNotification("✏️ Configura la posición y URL del mapa en el panel lateral");
                    }}
                    className="rounded-2xl overflow-hidden border border-border shadow-md bg-card cursor-pointer group hover:border-gold transition relative"
                  >
                    <div className="p-3 bg-muted/60 border-b border-border flex items-center justify-between">
                      <span className="text-xs font-bold flex items-center gap-1.5 text-foreground">
                        <MapPin className="h-4 w-4 text-gold" /> Ubicación en Google Maps ({siteData.contactInfo.address || "Guatemala"})
                      </span>
                      <span className="text-[10px] font-bold text-amber-500 opacity-0 group-hover:opacity-100 transition">
                        ✏️ Editar Ubicación / Posición del Mapa
                      </span>
                    </div>
                    <iframe
                      src={extractMapUrl(siteData.contactInfo.mapEmbedUrl) || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.423985108253!2d-90.5367!3d14.575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8589a3f25c78278b%3A0x6bd6c666f0e4b868!2sCalzada%20Atanasio%20Tzul%2C%20Ciudad%20de%20Guatemala!5e0!3m2!1ses!2sgt!4v1710000000000!5m2!1ses!2sgt"}
                      width="100%"
                      height={siteData.contactInfo.mapHeight || "350px"}
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      title="Ubicación en Google Maps"
                      className="w-full pointer-events-none"
                    />
                  </div>
                )}

                <DynamicSections
                  page="contacto"
                  onSelectSection={(sec) => {
                    setEditingCustomSection(sec);
                    showNotification(`✏️ Editando bloque: ${sec.title}`);
                  }}
                />
              </div>
            )}

            {/* Footer Simulator */}
            <footer className="bg-neutral-900 text-neutral-300 py-8 px-6 text-xs text-center border-t border-neutral-800">
              <p className="font-semibold text-white">Logiservicios Mónaco S.A. - Guatemala</p>
              <p className="text-neutral-500 mt-1">PBX: {siteData.contactInfo.phone} | Todos los derechos reservados.</p>
            </footer>
          </div>
        </div>
      </div>

      {/* EDIT MODAL FOR VACANCY */}
      {editingVacancy && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-4 text-xs text-neutral-200">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-emerald-400" />
                Editar Plaza: {editingVacancy.title}
              </h3>
              <button
                onClick={() => setEditingVacancy(null)}
                className="text-neutral-400 hover:text-white font-bold"
              >
                ✕ Cerrar
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-1 text-white">Título de la Plaza</label>
                <input
                  type="text"
                  value={editingVacancy.title}
                  onChange={(e) => setEditingVacancy({ ...editingVacancy, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white font-bold"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-white">Salario Promedio</label>
                <input
                  type="text"
                  value={editingVacancy.salary}
                  onChange={(e) => setEditingVacancy({ ...editingVacancy, salary: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-white">Ubicación / Zona</label>
                <input
                  type="text"
                  value={editingVacancy.location}
                  onChange={(e) => setEditingVacancy({ ...editingVacancy, location: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-white">Licencia Requerida</label>
                <input
                  type="text"
                  value={editingVacancy.license}
                  onChange={(e) => setEditingVacancy({ ...editingVacancy, license: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-white">WhatsApp de Contacto (sin +)</label>
                <input
                  type="text"
                  value={editingVacancy.whatsappNumber || ""}
                  onChange={(e) =>
                    setEditingVacancy({ ...editingVacancy, whatsappNumber: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-white">Correo de Recepción de CV</label>
                <input
                  type="text"
                  value={editingVacancy.emailContact || ""}
                  onChange={(e) => setEditingVacancy({ ...editingVacancy, emailContact: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block font-semibold mb-1 text-white">Afiche / Imagen de la Plaza</label>
                <div className="flex items-center gap-3">
                  {editingVacancy.flyerImage && (
                    <img
                      src={editingVacancy.flyerImage}
                      alt="Afiche"
                      className="h-16 w-16 object-cover rounded border border-neutral-700 shrink-0"
                    />
                  )}
                  <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-2 bg-red-700 text-white font-semibold rounded-lg text-xs hover:bg-red-600 transition shadow-xs">
                    <FolderOpen className="h-4 w-4" />
                    <span>Seleccionar Afiche en Dispositivo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleFileUpload(e, (url) =>
                          setEditingVacancy({ ...editingVacancy, flyerImage: url })
                        )
                      }
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block font-semibold mb-1 text-white">Requisitos (separados por línea)</label>
                <textarea
                  rows={3}
                  value={editingVacancy.requirements.join("\n")}
                  onChange={(e) =>
                    setEditingVacancy({ ...editingVacancy, requirements: e.target.value.split("\n") })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-neutral-800">
              <button
                type="button"
                onClick={() => setEditingVacancy(null)}
                className="px-4 py-2 rounded-lg bg-neutral-800 text-neutral-300 font-bold hover:bg-neutral-700"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  setVacancies(
                    siteData.vacancies.map((v) => (v.id === editingVacancy.id ? editingVacancy : v))
                  );
                  setEditingVacancy(null);
                  showNotification("Plaza guardada con éxito");
                }}
                className="px-4 py-2 rounded-lg bg-red-700 text-white font-bold hover:bg-red-600"
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL FOR FLEET */}
      {editingFleet && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 max-w-xl w-full space-y-4 text-xs text-neutral-200">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Truck className="h-4 w-4 text-sky-400" />
                Editar Unidad: {editingFleet.title}
              </h3>
              <button
                onClick={() => setEditingFleet(null)}
                className="text-neutral-400 hover:text-white font-bold"
              >
                ✕ Cerrar
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block font-semibold mb-1 text-white">Nombre de la Unidad</label>
                <input
                  type="text"
                  value={editingFleet.title}
                  onChange={(e) => setEditingFleet({ ...editingFleet, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white font-bold"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-white">Capacidad de Carga</label>
                <input
                  type="text"
                  value={editingFleet.capacity}
                  onChange={(e) => setEditingFleet({ ...editingFleet, capacity: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-white">Dimensiones (ej. 45' × 8')</label>
                  <input
                    type="text"
                    value={editingFleet.dimensions || ""}
                    placeholder="ej. 24' × 8'"
                    onChange={(e) => setEditingFleet({ ...editingFleet, dimensions: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-white">Modalidad (ej. Carga Masiva)</label>
                  <input
                    type="text"
                    value={editingFleet.modality || ""}
                    placeholder="ej. Interurbano"
                    onChange={(e) => setEditingFleet({ ...editingFleet, modality: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-white">Categoría de Carga</label>
                <select
                  value={editingFleet.category || "seca"}
                  onChange={(e) => setEditingFleet({ ...editingFleet, category: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white font-semibold"
                >
                  <option value="seca">📦 Carga Seca (Furgones, Camiones, Paneles)</option>
                  <option value="refrigerada">❄️ Carga Refrigerada (Temperatura Controlada / Termoking)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-white">Descripción / Características</label>
                <textarea
                  rows={3}
                  value={editingFleet.description}
                  onChange={(e) => setEditingFleet({ ...editingFleet, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-white">Fotografía de la Unidad</label>
                <div className="flex items-center gap-3">
                  {editingFleet.image && (
                    <img
                      src={editingFleet.image}
                      alt="Unidad"
                      className="h-16 w-20 object-cover rounded border border-neutral-700 shrink-0"
                    />
                  )}
                  <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-2 bg-red-700 text-white font-semibold rounded-lg text-xs hover:bg-red-600 transition shadow-xs">
                    <FolderOpen className="h-4 w-4" />
                    <span>Seleccionar Imagen en Dispositivo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleFileUpload(e, (url) => setEditingFleet({ ...editingFleet, image: url }))
                      }
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-neutral-800">
              <button
                type="button"
                onClick={() => setEditingFleet(null)}
                className="px-4 py-2 rounded-lg bg-neutral-800 text-neutral-300 font-bold hover:bg-neutral-700"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  setFleet(siteData.fleet.map((f) => (f.id === editingFleet.id ? editingFleet : f)));
                  setEditingFleet(null);
                  showNotification("Unidad de la flota actualizada");
                }}
                className="px-4 py-2 rounded-lg bg-red-700 text-white font-bold hover:bg-red-600"
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL FOR CUSTOM SECTION */}
      {editingCustomSection && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-4 text-xs text-neutral-200">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Layers className="h-4 w-4 text-gold" />
                Editar Bloque Personalizado: {editingCustomSection.title}
              </h3>
              <button
                onClick={() => setEditingCustomSection(null)}
                className="text-neutral-400 hover:text-white font-bold"
              >
                ✕ Cerrar
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-1 text-white">Título del Bloque</label>
                <input
                  type="text"
                  value={editingCustomSection.title}
                  onChange={(e) =>
                    setEditingCustomSection({ ...editingCustomSection, title: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white font-bold"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-white">Subtítulo / Etiqueta</label>
                <input
                  type="text"
                  value={editingCustomSection.subtitle}
                  onChange={(e) =>
                    setEditingCustomSection({ ...editingCustomSection, subtitle: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block font-semibold mb-1 text-white">Página donde se mostrará</label>
                <select
                  value={editingCustomSection.pageTarget || "todas"}
                  onChange={(e) =>
                    setEditingCustomSection({
                      ...editingCustomSection,
                      pageTarget: e.target.value as any,
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white font-semibold"
                >
                  <option value="todas">🌐 Mostrar en Todas las Páginas</option>
                  <option value="inicio">🏠 Solo en Página de Inicio (Home)</option>
                  <option value="trabaja">💼 Solo en Únete al Equipo</option>
                  <option value="cobertura">📍 Solo en Cobertura Nacional</option>
                  <option value="quienes-somos">🏛️ Solo en Filosofía Empresarial</option>
                  <option value="contacto">📞 Solo en Contacto</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block font-semibold mb-1 text-white">Imagen o Video</label>
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-2 bg-red-700 text-white font-semibold rounded-lg text-xs hover:bg-red-600 transition shadow-xs">
                    <FolderOpen className="h-4 w-4" />
                    <span>Seleccionar Imagen</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleFileUpload(e, (url) =>
                          setEditingCustomSection({
                            ...editingCustomSection,
                            imageUrl: url,
                            mediaType: "image",
                          })
                        )
                      }
                      className="hidden"
                    />
                  </label>
                  <span className="text-neutral-400">o URL de YouTube:</span>
                  <input
                    type="text"
                    placeholder="https://www.youtube.com/watch?v=..."
                    value={editingCustomSection.videoUrl || ""}
                    onChange={(e) =>
                      setEditingCustomSection({
                        ...editingCustomSection,
                        videoUrl: e.target.value,
                        mediaType: "video",
                        layoutStyle: "video",
                      })
                    }
                    className="flex-1 px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white text-xs"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block font-semibold mb-1 text-white">Contenido / Descripción</label>
                <textarea
                  rows={4}
                  value={editingCustomSection.content}
                  onChange={(e) =>
                    setEditingCustomSection({ ...editingCustomSection, content: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-neutral-800">
              <button
                type="button"
                onClick={() => setEditingCustomSection(null)}
                className="px-4 py-2 rounded-lg bg-neutral-800 text-neutral-300 font-bold hover:bg-neutral-700"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  setCustomSections(
                    siteData.customSections.map((s) =>
                      s.id === editingCustomSection.id ? editingCustomSection : s
                    )
                  );
                  setEditingCustomSection(null);
                  showNotification("Bloque actualizado");
                }}
                className="px-4 py-2 rounded-lg bg-red-700 text-white font-bold hover:bg-red-600"
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
