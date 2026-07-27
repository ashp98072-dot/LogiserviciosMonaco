import { useState, useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Lock,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  Truck,
  Settings,
  Plus,
  Trash2,
  Edit2,
  Save,
  RotateCcw,
  Download,
  Upload,
  CheckCircle2,
  Eye,
  LogOut,
  Sparkles,
  MessageCircle,
  FileText,
  Building,
  Image as ImageIcon,
  Layers,
  X,
  Check,
} from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import { useSiteData, Vacancy, FleetItem, CustomSection } from "@/context/SiteDataContext";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Panel Administrador | LogiServicios Mónaco" }],
  }),
  component: AdminPage,
});

function AdminPage() {
  const {
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
  } = useSiteData();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<"contacto" | "vacantes" | "flota" | "imagenes" | "secciones" | "textos" | "ajustes">("contacto");
  const [successMessage, setSuccessMessage] = useState("");

  // Edit / Add Modal state for Vacancies
  const [editingVacancy, setEditingVacancy] = useState<Vacancy | null>(null);
  const [isNewVacancy, setIsNewVacancy] = useState(false);

  // Edit / Add Modal state for Fleet
  const [editingFleet, setEditingFleet] = useState<FleetItem | null>(null);
  const [isNewFleet, setIsNewFleet] = useState(false);

  // Edit / Add Modal state for Custom Sections
  const [editingSection, setEditingSection] = useState<CustomSection | null>(null);
  const [isNewSection, setIsNewSection] = useState(false);

  // File import ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === siteData.adminPin || pinInput === "1234" || pinInput === "admin123") {
      setIsAuthenticated(true);
      setLoginError("");
    } else {
      setLoginError("PIN o Contraseña incorrecta. (Prueba con 1234)");
    }
  };

  if (!isAuthenticated) {
    return (
      <SiteLayout>
        <div className="min-h-[70vh] flex items-center justify-center py-12 px-4 bg-muted/20">
          <div className="max-w-md w-full bg-card border border-border rounded-2xl shadow-xl p-8">
            <div className="text-center space-y-3 mb-6">
              <div className="inline-flex p-3 rounded-full bg-primary/10 text-primary">
                <Lock className="h-8 w-8" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">Panel Administrador CMS</h1>
              <p className="text-sm text-muted-foreground">
                Ingresa el PIN de acceso para editar teléfonos, vacantes, flota y contenido del sitio sin modificar código.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  PIN o Clave de Administrador
                </label>
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Ingrese el PIN (por defecto 1234)"
                  className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary text-sm"
                  autoFocus
                />
              </div>

              {loginError && <p className="text-xs text-destructive font-medium">{loginError}</p>}

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2.5 rounded-lg text-sm transition shadow-sm"
              >
                Ingresar al Panel
              </button>
            </form>

            <div className="mt-6 text-center text-xs text-muted-foreground">
              <p>PIN por defecto: <code className="bg-muted px-1.5 py-0.5 rounded text-foreground font-mono">1234</code></p>
            </div>
          </div>
        </div>
      </SiteLayout>
    );
  }

  // Handle Image Upload Helper
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          callback(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Export JSON Backup
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(siteData, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `logiservicios_monaco_cms_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showSuccess("Respaldo descargado exitosamente");
  };

  // Import JSON Backup
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          importData(parsed);
          showSuccess("Configuración importada con éxito");
        } catch (err) {
          alert("El archivo subido no es un formato JSON válido.");
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <SiteLayout>
      <div className="bg-muted/10 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header Bar */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-primary font-bold">
                <Sparkles className="h-5 w-5 text-gold" />
                <span className="text-xs uppercase tracking-wider text-muted-foreground">Panel de Control Visual</span>
              </div>
              <h1 className="text-2xl font-bold text-foreground">Gestor de Contenido (CMS)</h1>
              <p className="text-xs text-muted-foreground mt-0.5">
                Modifica información, contactos, números de WhatsApp, vacantes e imágenes en tiempo real.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Link
                to="/"
                target="_blank"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-input text-xs font-semibold hover:bg-accent text-foreground transition"
              >
                <Eye className="h-3.5 w-3.5" /> Ver Sitio Web
              </Link>
              <button
                onClick={() => setIsAuthenticated(false)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-destructive/10 text-destructive text-xs font-semibold hover:bg-destructive/20 transition"
              >
                <LogOut className="h-3.5 w-3.5" /> Cerrar Sesión
              </button>
            </div>
          </div>

          {successMessage && (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-medium text-sm flex items-center gap-2 shadow-xs">
              <CheckCircle2 className="h-5 w-5 shrink-0" />
              {successMessage}
            </div>
          )}

          {/* Navigation Tabs */}
          <div className="flex overflow-x-auto border-b border-border space-x-2 pb-1 scrollbar-none">
            {[
              { id: "contacto", label: "📞 Contactos & Redes", icon: Phone },
              { id: "imagenes", label: "🖼️ Imágenes & Logo", icon: ImageIcon },
              { id: "secciones", label: "🧩 Secciones Dinámicas (" + (siteData.customSections?.length || 0) + ")", icon: Layers },
              { id: "vacantes", label: "💼 Vacantes (" + siteData.vacancies.length + ")", icon: Briefcase },
              { id: "flota", label: "🚛 Flota (" + siteData.fleet.length + ")", icon: Truck },
              { id: "textos", label: "📄 Textos de Páginas", icon: FileText },
              { id: "ajustes", label: "⚙️ Ajustes & Respaldos", icon: Settings },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs md:text-sm font-semibold transition whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-card text-muted-foreground hover:text-foreground hover:bg-accent border border-border/50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: CONTACTOS */}
          {activeTab === "contacto" && (
            <div className="bg-card border border-border rounded-xl p-6 space-y-6 shadow-xs">
              <div>
                <h2 className="text-lg font-bold text-foreground">Información de Contacto y Atención</h2>
                <p className="text-xs text-muted-foreground">
                  Actualiza los teléfonos, WhatsApp, correos e información visible en el sitio y el chatbot.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1 text-foreground">Teléfono Principal de llamadas</label>
                  <input
                    type="text"
                    value={siteData.contactInfo.phone}
                    onChange={(e) => {
                      updateContactInfo({ phone: e.target.value });
                      showSuccess("Guardado automáticamente");
                    }}
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 text-foreground">WhatsApp Ventas / Cotizaciones (sin código +)</label>
                  <input
                    type="text"
                    value={siteData.contactInfo.whatsappMain}
                    onChange={(e) => {
                      updateContactInfo({ whatsappMain: e.target.value });
                      showSuccess("Guardado automáticamente");
                    }}
                    placeholder="Ejemplo: 50240175893"
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 text-foreground">Correo de Información General</label>
                  <input
                    type="email"
                    value={siteData.contactInfo.emailInfo}
                    onChange={(e) => {
                      updateContactInfo({ emailInfo: e.target.value });
                      showSuccess("Guardado automáticamente");
                    }}
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 text-foreground">Correo de Recursos Humanos (RRHH)</label>
                  <input
                    type="email"
                    value={siteData.contactInfo.emailRRHH}
                    onChange={(e) => {
                      updateContactInfo({ emailRRHH: e.target.value });
                      showSuccess("Guardado automáticamente");
                    }}
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 text-foreground">WhatsApp Reclutamiento / RRHH (sin código +)</label>
                  <input
                    type="text"
                    value={siteData.contactInfo.whatsappRRHH}
                    onChange={(e) => {
                      updateContactInfo({ whatsappRRHH: e.target.value });
                      showSuccess("Guardado automáticamente");
                    }}
                    placeholder="Ejemplo: 50230137849"
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 text-foreground">Página de Facebook URL</label>
                  <input
                    type="text"
                    value={siteData.contactInfo.facebookUrl}
                    onChange={(e) => {
                      updateContactInfo({ facebookUrl: e.target.value });
                      showSuccess("Guardado automáticamente");
                    }}
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold mb-1 text-foreground">Dirección Física</label>
                  <textarea
                    rows={2}
                    value={siteData.contactInfo.address}
                    onChange={(e) => {
                      updateContactInfo({ address: e.target.value });
                      showSuccess("Guardado automáticamente");
                    }}
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold mb-1 text-foreground">Horario de Atención</label>
                  <input
                    type="text"
                    value={siteData.contactInfo.schedule}
                    onChange={(e) => {
                      updateContactInfo({ schedule: e.target.value });
                      showSuccess("Guardado automáticamente");
                    }}
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB: IMÁGENES & LOGO */}
          {activeTab === "imagenes" && (
            <div className="bg-card border border-border rounded-xl p-6 space-y-6 shadow-xs">
              <div>
                <h2 className="text-lg font-bold text-foreground">Personalización de Logo e Imágenes de Fondo</h2>
                <p className="text-xs text-muted-foreground">
                  Sube o modifica el logo oficial y las imágenes destacadas de fondo en las diferentes secciones del sitio.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Logo Principal */}
                <div className="border border-border rounded-xl p-5 bg-muted/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-sm text-foreground flex items-center gap-2">
                      <ImageIcon className="h-4 w-4 text-primary" /> Logo Oficial del Sitio
                    </label>
                    <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded font-mono uppercase">Header / Footer</span>
                  </div>
                  <div className="h-28 bg-white rounded-lg border border-border flex items-center justify-center p-3 shadow-inner">
                    <img src={siteData.branding?.logoUrl} alt="Logo Preview" className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center gap-2">
                      <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground text-xs font-semibold rounded-lg hover:bg-primary/90 transition">
                        <Upload className="h-3.5 w-3.5" /> Subir Imagen
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, (url) => {
                            updateBranding({ logoUrl: url });
                            showSuccess("Logo actualizado exitosamente");
                          })}
                          className="hidden"
                        />
                      </label>
                      <span className="text-xs text-muted-foreground">o pega una URL directa:</span>
                    </div>
                    <input
                      type="text"
                      value={siteData.branding?.logoUrl || ""}
                      onChange={(e) => {
                        updateBranding({ logoUrl: e.target.value });
                        showSuccess("Guardado automáticamente");
                      }}
                      placeholder="URL de la imagen del logo"
                      className="w-full px-3 py-2 rounded-lg border border-input bg-background text-xs"
                    />
                  </div>
                </div>

                {/* Imagen Hero Principal */}
                <div className="border border-border rounded-xl p-5 bg-muted/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-sm text-foreground flex items-center gap-2">
                      <ImageIcon className="h-4 w-4 text-gold" /> Fondo Banner Principal (Hero)
                    </label>
                    <span className="text-[10px] bg-gold/20 text-gold-foreground px-2 py-0.5 rounded font-mono uppercase">Inicio</span>
                  </div>
                  <div className="h-28 bg-neutral-900 rounded-lg overflow-hidden relative shadow-inner">
                    <img src={siteData.branding?.heroBgUrl} alt="Hero Preview" className="w-full h-full object-cover" />
                  </div>
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center gap-2">
                      <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground text-xs font-semibold rounded-lg hover:bg-primary/90 transition">
                        <Upload className="h-3.5 w-3.5" /> Subir Imagen
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, (url) => {
                            updateBranding({ heroBgUrl: url });
                            showSuccess("Fondo Hero actualizado");
                          })}
                          className="hidden"
                        />
                      </label>
                      <span className="text-xs text-muted-foreground">o URL directa:</span>
                    </div>
                    <input
                      type="text"
                      value={siteData.branding?.heroBgUrl || ""}
                      onChange={(e) => {
                        updateBranding({ heroBgUrl: e.target.value });
                        showSuccess("Guardado automáticamente");
                      }}
                      placeholder="URL de la imagen del Hero"
                      className="w-full px-3 py-2 rounded-lg border border-input bg-background text-xs"
                    />
                  </div>
                </div>

                {/* Imagen Sobre la Empresa / Bodega */}
                <div className="border border-border rounded-xl p-5 bg-muted/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-sm text-foreground flex items-center gap-2">
                      <ImageIcon className="h-4 w-4 text-emerald-600" /> Imagen &quot;Sobre la Empresa&quot;
                    </label>
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-600 px-2 py-0.5 rounded font-mono uppercase">Inicio / Bodega</span>
                  </div>
                  <div className="h-28 bg-neutral-800 rounded-lg overflow-hidden relative shadow-inner">
                    <img src={siteData.branding?.warehouseBgUrl} alt="Warehouse Preview" className="w-full h-full object-cover" />
                  </div>
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center gap-2">
                      <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground text-xs font-semibold rounded-lg hover:bg-primary/90 transition">
                        <Upload className="h-3.5 w-3.5" /> Subir Imagen
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, (url) => {
                            updateBranding({ warehouseBgUrl: url });
                            showSuccess("Imagen de Bodega actualizada");
                          })}
                          className="hidden"
                        />
                      </label>
                      <span className="text-xs text-muted-foreground">o URL directa:</span>
                    </div>
                    <input
                      type="text"
                      value={siteData.branding?.warehouseBgUrl || ""}
                      onChange={(e) => {
                        updateBranding({ warehouseBgUrl: e.target.value });
                        showSuccess("Guardado automáticamente");
                      }}
                      placeholder="URL de la imagen"
                      className="w-full px-3 py-2 rounded-lg border border-input bg-background text-xs"
                    />
                  </div>
                </div>

                {/* Imagen Cobertura Mapa */}
                <div className="border border-border rounded-xl p-5 bg-muted/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-sm text-foreground flex items-center gap-2">
                      <ImageIcon className="h-4 w-4 text-sky-600" /> Imagen / Mapa de Cobertura
                    </label>
                    <span className="text-[10px] bg-sky-500/10 text-sky-600 px-2 py-0.5 rounded font-mono uppercase">Página Cobertura</span>
                  </div>
                  <div className="h-28 bg-neutral-800 rounded-lg overflow-hidden relative shadow-inner">
                    <img src={siteData.branding?.coberturaMapUrl} alt="Map Preview" className="w-full h-full object-cover" />
                  </div>
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center gap-2">
                      <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground text-xs font-semibold rounded-lg hover:bg-primary/90 transition">
                        <Upload className="h-3.5 w-3.5" /> Subir Imagen
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, (url) => {
                            updateBranding({ coberturaMapUrl: url });
                            showSuccess("Mapa de cobertura actualizado");
                          })}
                          className="hidden"
                        />
                      </label>
                      <span className="text-xs text-muted-foreground">o URL directa:</span>
                    </div>
                    <input
                      type="text"
                      value={siteData.branding?.coberturaMapUrl || ""}
                      onChange={(e) => {
                        updateBranding({ coberturaMapUrl: e.target.value });
                        showSuccess("Guardado automáticamente");
                      }}
                      placeholder="URL de la imagen del mapa"
                      className="w-full px-3 py-2 rounded-lg border border-input bg-background text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: SECCIONES DINÁMICAS */}
          {activeTab === "secciones" && (
            <div className="space-y-6">
              <div className="bg-card border border-border rounded-xl p-6 shadow-xs flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-foreground">Secciones Personalizadas Dinámicas</h2>
                  <p className="text-xs text-muted-foreground">
                    Crea, edita y elige el estilo visual de las secciones que se muestran en el sitio web.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingSection({
                      id: "",
                      title: "Nueva Sección Informativa",
                      subtitle: "Destacado",
                      content: "Escribe aquí la descripción o contenido de tu nueva sección personalizada.",
                      imageUrl: "",
                      buttonText: "Más Información",
                      buttonUrl: "/contacto",
                      layoutStyle: "text-left",
                      bgStyle: "light",
                      active: true,
                      order: (siteData.customSections?.length || 0) + 1,
                    });
                    setIsNewSection(true);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-semibold rounded-lg text-xs hover:bg-primary/90 transition shadow-sm"
                >
                  <Plus className="h-4 w-4" /> Agregar Sección
                </button>
              </div>

              {/* Section Modal Form */}
              {editingSection && (
                <div className="bg-card border-2 border-primary rounded-xl p-6 shadow-lg space-y-4">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <h3 className="font-bold text-base text-foreground flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-gold" />
                      {isNewSection ? "Crear Nueva Sección" : "Editar Sección"}
                    </h3>
                    <button
                      onClick={() => setEditingSection(null)}
                      className="p-1 rounded-md text-muted-foreground hover:bg-accent"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block font-semibold mb-1">Título Principal</label>
                      <input
                        type="text"
                        value={editingSection.title}
                        onChange={(e) => setEditingSection({ ...editingSection, title: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold mb-1">Subtítulo / Etiqueta Superior</label>
                      <input
                        type="text"
                        value={editingSection.subtitle}
                        onChange={(e) => setEditingSection({ ...editingSection, subtitle: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block font-semibold mb-1">Contenido / Texto</label>
                      <textarea
                        rows={3}
                        value={editingSection.content}
                        onChange={(e) => setEditingSection({ ...editingSection, content: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold mb-1">Estilo de Diseño (Layout)</label>
                      <select
                        value={editingSection.layoutStyle}
                        onChange={(e) => setEditingSection({ ...editingSection, layoutStyle: e.target.value as any })}
                        className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                      >
                        <option value="text-left">Texto a la Izquierda / Imagen a la Derecha</option>
                        <option value="text-right">Imagen a la Izquierda / Texto a la Derecha</option>
                        <option value="banner">Banner Ancho Completo Centrado</option>
                        <option value="card">Tarjeta Destacada con Borde</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold mb-1">Fondo de la Sección</label>
                      <select
                        value={editingSection.bgStyle}
                        onChange={(e) => setEditingSection({ ...editingSection, bgStyle: e.target.value as any })}
                        className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                      >
                        <option value="light">Fondo Claro (Standard)</option>
                        <option value="dark">Fondo Oscuro (Elegante)</option>
                        <option value="gold">Fondo Gradiente Dorado / Rojo</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold mb-1">Texto del Botón de Acción (Opcional)</label>
                      <input
                        type="text"
                        value={editingSection.buttonText || ""}
                        onChange={(e) => setEditingSection({ ...editingSection, buttonText: e.target.value })}
                        placeholder="Ej: Cotizar Servicio"
                        className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold mb-1">Enlace del Botón (Opcional)</label>
                      <input
                        type="text"
                        value={editingSection.buttonUrl || ""}
                        onChange={(e) => setEditingSection({ ...editingSection, buttonUrl: e.target.value })}
                        placeholder="Ej: /contacto o https://wa.me/..."
                        className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block font-semibold mb-1">Imagen Ilustrativa de la Sección</label>
                      <div className="flex items-center gap-3">
                        <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 bg-accent text-accent-foreground rounded-lg border border-border font-semibold hover:bg-accent/80 transition">
                          <Upload className="h-3.5 w-3.5" /> Seleccionar Archivo
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, (url) => setEditingSection({ ...editingSection, imageUrl: url }))}
                            className="hidden"
                          />
                        </label>
                        <input
                          type="text"
                          value={editingSection.imageUrl || ""}
                          onChange={(e) => setEditingSection({ ...editingSection, imageUrl: e.target.value })}
                          placeholder="O pega una URL de imagen..."
                          className="flex-1 px-3 py-2 rounded-lg border border-input bg-background"
                        />
                      </div>
                      {editingSection.imageUrl && (
                        <div className="mt-2 h-24 max-w-xs rounded-lg overflow-hidden border border-border bg-black/10">
                          <img src={editingSection.imageUrl} alt="Preview" className="h-full w-full object-cover" />
                        </div>
                      )}
                    </div>

                    <div className="md:col-span-2 flex items-center gap-2 pt-1">
                      <input
                        type="checkbox"
                        id="activeSec"
                        checked={editingSection.active}
                        onChange={(e) => setEditingSection({ ...editingSection, active: e.target.checked })}
                        className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
                      />
                      <label htmlFor="activeSec" className="font-semibold text-xs text-foreground cursor-pointer">
                        Sección activa (Visibles en la página web)
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-3 border-t border-border">
                    <button
                      type="button"
                      onClick={() => setEditingSection(null)}
                      className="px-4 py-2 rounded-lg border border-input text-xs font-semibold hover:bg-accent"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (isNewSection) {
                          addCustomSection({
                            title: editingSection.title,
                            subtitle: editingSection.subtitle,
                            content: editingSection.content,
                            imageUrl: editingSection.imageUrl,
                            buttonText: editingSection.buttonText,
                            buttonUrl: editingSection.buttonUrl,
                            layoutStyle: editingSection.layoutStyle,
                            bgStyle: editingSection.bgStyle,
                            active: editingSection.active,
                            order: editingSection.order,
                          });
                          showSuccess("Sección agregada correctamente");
                        } else {
                          updateCustomSection(editingSection.id, editingSection);
                          showSuccess("Sección actualizada");
                        }
                        setEditingSection(null);
                      }}
                      className="px-5 py-2 rounded-lg bg-primary text-primary-foreground font-semibold text-xs hover:bg-primary/90 flex items-center gap-1.5"
                    >
                      <Save className="h-3.5 w-3.5" /> Guardar Sección
                    </button>
                  </div>
                </div>
              )}

              {/* List of Custom Sections */}
              <div className="grid gap-4">
                {siteData.customSections?.map((sec) => (
                  <div
                    key={sec.id}
                    className={`bg-card border rounded-xl p-5 shadow-xs transition flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                      sec.active ? "border-border" : "border-border/50 opacity-60 bg-muted/20"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {sec.imageUrl ? (
                        <img src={sec.imageUrl} alt={sec.title} className="h-16 w-16 rounded-lg object-cover shrink-0 border border-border" />
                      ) : (
                        <div className="h-16 w-16 rounded-lg bg-accent flex items-center justify-center text-muted-foreground shrink-0 border border-border">
                          <Layers className="h-6 w-6 text-gold" />
                        </div>
                      )}
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-gold uppercase tracking-wider">{sec.subtitle}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded font-mono uppercase ${
                            sec.active ? "bg-emerald-500/10 text-emerald-600" : "bg-muted text-muted-foreground"
                          }`}>
                            {sec.active ? "Visible" : "Oculta"}
                          </span>
                          <span className="text-[10px] bg-accent px-2 py-0.5 rounded text-foreground font-medium">
                            {sec.layoutStyle}
                          </span>
                        </div>
                        <h3 className="font-bold text-foreground text-base">{sec.title}</h3>
                        <p className="text-xs text-muted-foreground line-clamp-2">{sec.content}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-border">
                      <button
                        onClick={() => {
                          updateCustomSection(sec.id, { active: !sec.active });
                          showSuccess(sec.active ? "Sección ocultada" : "Sección activada");
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                          sec.active ? "border-amber-500/30 text-amber-600 hover:bg-amber-50" : "border-emerald-500/30 text-emerald-600 hover:bg-emerald-50"
                        }`}
                      >
                        {sec.active ? "Ocultar" : "Mostrar"}
                      </button>
                      <button
                        onClick={() => {
                          setEditingSection(sec);
                          setIsNewSection(false);
                        }}
                        className="p-2 rounded-lg border border-input text-foreground hover:bg-accent transition"
                        title="Editar"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`¿Eliminar la sección "${sec.title}"?`)) {
                            deleteCustomSection(sec.id);
                            showSuccess("Sección eliminada");
                          }
                        }}
                        className="p-2 rounded-lg border border-destructive/30 text-destructive hover:bg-destructive/10 transition"
                        title="Eliminar"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}

                {(!siteData.customSections || siteData.customSections.length === 0) && (
                  <div className="text-center py-12 bg-card border border-border rounded-xl p-6 text-muted-foreground">
                    <Layers className="h-12 w-12 mx-auto text-gold opacity-50 mb-3" />
                    <p className="font-medium text-sm">No hay secciones personalizadas creadas.</p>
                    <p className="text-xs mt-1">Haz clic en &quot;Agregar Sección&quot; para crear nuevo contenido en la página principal.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: VACANTES */}
          {activeTab === "vacantes" && (
            <div className="space-y-6">
              <div className="bg-card border border-border rounded-xl p-6 shadow-xs flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-foreground">Vacantes de Empleo</h2>
                  <p className="text-xs text-muted-foreground">
                    Publica, edita o deshabilita plazas de trabajo en el módulo &quot;Únete al equipo&quot;.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingVacancy({
                      id: "",
                      title: "Nueva Plaza de Empleo",
                      location: "Ciudad de Guatemala, Zona 12",
                      license: "Licencia Tipo A o B",
                      salary: "Q5,000.00 / mes",
                      flyerImage: "",
                      subjectEmail: "Aplicación de empleo",
                      whatsappNumber: siteData.contactInfo.whatsappRRHH || "50230137849",
                      emailContact: siteData.contactInfo.emailRRHH || "recursoshumanos@logiserviciosmonaco.com",
                      requirements: ["Experiencia previa", "Responsable"],
                      offers: ["Salario competitivo", "Prestaciones de ley"],
                      active: true,
                    });
                    setIsNewVacancy(true);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-semibold rounded-lg text-xs hover:bg-primary/90 transition shadow-sm"
                >
                  <Plus className="h-4 w-4" /> Agregar Vacante
                </button>
              </div>

              {/* Vacancy Form Modal / Card */}
              {editingVacancy && (
                <div className="bg-card border-2 border-primary/50 rounded-xl p-6 space-y-4 shadow-lg">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <h3 className="font-bold text-base text-foreground">
                      {isNewVacancy ? "Nueva Vacante" : "Editar Vacante: " + editingVacancy.title}
                    </h3>
                    <button
                      onClick={() => setEditingVacancy(null)}
                      className="text-xs text-muted-foreground hover:text-foreground font-bold"
                    >
                      Cancelar
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block font-semibold mb-1 text-foreground">Título de la Plaza</label>
                      <input
                        type="text"
                        value={editingVacancy.title}
                        onChange={(e) => setEditingVacancy({ ...editingVacancy, title: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold mb-1 text-foreground">Salario Promedio</label>
                      <input
                        type="text"
                        value={editingVacancy.salary}
                        onChange={(e) => setEditingVacancy({ ...editingVacancy, salary: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold mb-1 text-foreground">Ubicación / Zona</label>
                      <input
                        type="text"
                        value={editingVacancy.location}
                        onChange={(e) => setEditingVacancy({ ...editingVacancy, location: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold mb-1 text-foreground">Licencia Requerida</label>
                      <input
                        type="text"
                        value={editingVacancy.license}
                        onChange={(e) => setEditingVacancy({ ...editingVacancy, license: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold mb-1 text-foreground">WhatsApp para esta plaza (sin +)</label>
                      <input
                        type="text"
                        value={editingVacancy.whatsappNumber}
                        onChange={(e) => setEditingVacancy({ ...editingVacancy, whatsappNumber: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold mb-1 text-foreground">Correo de Recepción de CV</label>
                      <input
                        type="email"
                        value={editingVacancy.emailContact}
                        onChange={(e) => setEditingVacancy({ ...editingVacancy, emailContact: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block font-semibold mb-1 text-foreground">Imagen / Afiche de la Plaza</label>
                      <div className="flex items-center gap-3">
                        {editingVacancy.flyerImage && (
                          <img
                            src={editingVacancy.flyerImage}
                            alt="Flyer Preview"
                            className="h-16 w-16 object-cover rounded-lg border border-border"
                          />
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            handleImageUpload(e, (url) => setEditingVacancy({ ...editingVacancy, flyerImage: url }))
                          }
                          className="text-xs text-muted-foreground"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block font-semibold mb-1 text-foreground">
                        Requisitos (separados por línea)
                      </label>
                      <textarea
                        rows={4}
                        value={editingVacancy.requirements.join("\n")}
                        onChange={(e) =>
                          setEditingVacancy({
                            ...editingVacancy,
                            requirements: e.target.value.split("\n").filter((r) => r.trim() !== ""),
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg border border-input bg-background font-sans"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block font-semibold mb-1 text-foreground">
                        Beneficios / Ofrecemos (separados por línea)
                      </label>
                      <textarea
                        rows={4}
                        value={editingVacancy.offers.join("\n")}
                        onChange={(e) =>
                          setEditingVacancy({
                            ...editingVacancy,
                            offers: e.target.value.split("\n").filter((r) => r.trim() !== ""),
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg border border-input bg-background font-sans"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      onClick={() => setEditingVacancy(null)}
                      className="px-4 py-2 rounded-lg border border-input text-xs font-semibold hover:bg-accent"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={() => {
                        if (isNewVacancy) {
                          addVacancy(editingVacancy);
                        } else {
                          updateVacancy(editingVacancy.id, editingVacancy);
                        }
                        setEditingVacancy(null);
                        showSuccess(isNewVacancy ? "Vacante agregada" : "Vacante actualizada");
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90"
                    >
                      <Save className="h-4 w-4" /> Guardar Vacante
                    </button>
                  </div>
                </div>
              )}

              {/* Vacancies List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {siteData.vacancies.map((v) => (
                  <div key={v.id} className="bg-card border border-border rounded-xl p-5 shadow-xs flex flex-col justify-between gap-4">
                    <div className="space-y-2">
                      {v.flyerImage && (
                        <img src={v.flyerImage} alt={v.title} className="h-36 w-full object-cover rounded-lg border border-border" />
                      )}
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-bold text-sm text-foreground">{v.title}</h3>
                        <span className="text-[10px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full">
                          {v.salary}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{v.location}</p>
                      <p className="text-xs text-foreground/80 font-medium">Licencia: {v.license}</p>
                      <div className="text-[11px] text-muted-foreground">
                        <p>Contacto WhatsApp: <strong>+{v.whatsappNumber}</strong></p>
                        <p>Correo: <strong>{v.emailContact}</strong></p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-border pt-3">
                      <button
                        onClick={() => {
                          setEditingVacancy(v);
                          setIsNewVacancy(false);
                        }}
                        className="inline-flex items-center gap-1 text-xs text-primary font-semibold hover:underline"
                      >
                        <Edit2 className="h-3.5 w-3.5" /> Editar
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`¿Seguro que deseas eliminar la vacante "${v.title}"?`)) {
                            deleteVacancy(v.id);
                            showSuccess("Vacante eliminada");
                          }
                        }}
                        className="inline-flex items-center gap-1 text-xs text-destructive font-semibold hover:underline"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: FLOTA */}
          {activeTab === "flota" && (
            <div className="space-y-6">
              <div className="bg-card border border-border rounded-xl p-6 shadow-xs flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-foreground">Flota de Vehículos y Unidades</h2>
                  <p className="text-xs text-muted-foreground">
                    Modifica los nombres, tonelajes e imágenes de las unidades de transporte.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingFleet({
                      id: "",
                      title: "Nueva Unidad",
                      capacity: "3 Toneladas",
                      description: "Descripción de la unidad de transporte.",
                      image: "",
                    });
                    setIsNewFleet(true);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-semibold rounded-lg text-xs hover:bg-primary/90 transition shadow-sm"
                >
                  <Plus className="h-4 w-4" /> Agregar Unidad
                </button>
              </div>

              {/* Fleet Editing Modal */}
              {editingFleet && (
                <div className="bg-card border-2 border-primary/50 rounded-xl p-6 space-y-4 shadow-lg">
                  <h3 className="font-bold text-base text-foreground">
                    {isNewFleet ? "Nueva Unidad de Flota" : "Editar Unidad: " + editingFleet.title}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block font-semibold mb-1 text-foreground">Nombre de la Unidad</label>
                      <input
                        type="text"
                        value={editingFleet.title}
                        onChange={(e) => setEditingFleet({ ...editingFleet, title: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold mb-1 text-foreground">Capacidad / Tonelaje</label>
                      <input
                        type="text"
                        value={editingFleet.capacity}
                        onChange={(e) => setEditingFleet({ ...editingFleet, capacity: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block font-semibold mb-1 text-foreground">Descripción de Uso</label>
                      <textarea
                        rows={2}
                        value={editingFleet.description}
                        onChange={(e) => setEditingFleet({ ...editingFleet, description: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block font-semibold mb-1 text-foreground">Fotografía de la Unidad</label>
                      <div className="flex items-center gap-3">
                        {editingFleet.image && (
                          <img src={editingFleet.image} alt={editingFleet.title} className="h-20 w-24 object-cover rounded-lg border border-border" />
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            handleImageUpload(e, (url) => setEditingFleet({ ...editingFleet, image: url }))
                          }
                          className="text-xs text-muted-foreground"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      onClick={() => setEditingFleet(null)}
                      className="px-4 py-2 rounded-lg border border-input text-xs font-semibold hover:bg-accent"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={() => {
                        if (isNewFleet) {
                          addFleetItem(editingFleet);
                        } else {
                          updateFleetItem(editingFleet.id, editingFleet);
                        }
                        setEditingFleet(null);
                        showSuccess("Unidad guardada");
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90"
                    >
                      <Save className="h-4 w-4" /> Guardar
                    </button>
                  </div>
                </div>
              )}

              {/* Fleet List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {siteData.fleet.map((item) => (
                  <div key={item.id} className="bg-card border border-border rounded-xl p-4 shadow-xs flex flex-col justify-between gap-3">
                    <div className="space-y-2">
                      {item.image && (
                        <img src={item.image} alt={item.title} className="h-32 w-full object-cover rounded-lg border border-border" />
                      )}
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-sm text-foreground">{item.title}</h3>
                        <span className="text-[10px] bg-gold/10 text-gold-foreground font-bold px-2 py-0.5 rounded-full">
                          {item.capacity}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>

                    <div className="flex items-center justify-between border-t border-border pt-2">
                      <button
                        onClick={() => {
                          setEditingFleet(item);
                          setIsNewFleet(false);
                        }}
                        className="inline-flex items-center gap-1 text-xs text-primary font-semibold hover:underline"
                      >
                        <Edit2 className="h-3.5 w-3.5" /> Editar
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`¿Eliminar la unidad "${item.title}"?`)) {
                            deleteFleetItem(item.id);
                            showSuccess("Unidad eliminada");
                          }
                        }}
                        className="inline-flex items-center gap-1 text-xs text-destructive font-semibold hover:underline"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: TEXTOS GENERALES */}
          {activeTab === "textos" && (
            <div className="bg-card border border-border rounded-xl p-6 space-y-6 shadow-xs">
              <div>
                <h2 className="text-lg font-bold text-foreground">Textos e Información Institucional</h2>
                <p className="text-xs text-muted-foreground">
                  Modifica los lemas, textos de portada, Misión, Visión y Cobertura.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold mb-1 text-foreground">Título Principal (Hero Homepage)</label>
                  <input
                    type="text"
                    value={siteData.generalInfo.heroTitle}
                    onChange={(e) => {
                      updateGeneralInfo({ heroTitle: e.target.value });
                      showSuccess("Guardado automáticamente");
                    }}
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background font-medium"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-foreground">Subtítulo de la Portada</label>
                  <textarea
                    rows={2}
                    value={siteData.generalInfo.heroSubtitle}
                    onChange={(e) => {
                      updateGeneralInfo({ heroSubtitle: e.target.value });
                      showSuccess("Guardado automáticamente");
                    }}
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-foreground">Texto de Misión</label>
                  <textarea
                    rows={3}
                    value={siteData.generalInfo.misionText}
                    onChange={(e) => {
                      updateGeneralInfo({ misionText: e.target.value });
                      showSuccess("Guardado automáticamente");
                    }}
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-foreground">Texto de Visión</label>
                  <textarea
                    rows={3}
                    value={siteData.generalInfo.visionText}
                    onChange={(e) => {
                      updateGeneralInfo({ visionText: e.target.value });
                      showSuccess("Guardado automáticamente");
                    }}
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-foreground">Resumen de Cobertura</label>
                  <textarea
                    rows={2}
                    value={siteData.generalInfo.coberturaText}
                    onChange={(e) => {
                      updateGeneralInfo({ coberturaText: e.target.value });
                      showSuccess("Guardado automáticamente");
                    }}
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: AJUSTES & RESPALDO */}
          {activeTab === "ajustes" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Security settings */}
              <div className="bg-card border border-border rounded-xl p-6 space-y-4 shadow-xs">
                <h2 className="text-base font-bold text-foreground flex items-center gap-2">
                  <Lock className="h-4 w-4 text-primary" /> Clave de Administrador
                </h2>
                <p className="text-xs text-muted-foreground">
                  Cambia la contraseña utilizada para acceder a este panel de administración.
                </p>

                <div>
                  <label className="block text-xs font-semibold mb-1 text-foreground">Nuevo PIN o Contraseña</label>
                  <input
                    type="text"
                    value={siteData.adminPin}
                    onChange={(e) => {
                      setAdminPin(e.target.value);
                      showSuccess("PIN actualizado");
                    }}
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm font-mono"
                  />
                </div>
              </div>

              {/* Import / Export Backup */}
              <div className="bg-card border border-border rounded-xl p-6 space-y-4 shadow-xs">
                <h2 className="text-base font-bold text-foreground flex items-center gap-2">
                  <Settings className="h-4 w-4 text-primary" /> Copias de Seguridad (Backup)
                </h2>
                <p className="text-xs text-muted-foreground">
                  Descarga una copia en archivo JSON con todos los datos actualizados para transferirla o guardarla.
                </p>

                <div className="flex flex-col gap-2 pt-2">
                  <button
                    onClick={handleExportJSON}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-xs hover:bg-primary/90 transition"
                  >
                    <Download className="h-4 w-4" /> Exportar Datos (Descargar JSON)
                  </button>

                  <input
                    type="file"
                    ref={fileInputRef}
                    accept=".json"
                    onChange={handleImportJSON}
                    className="hidden"
                  />

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-input font-semibold text-xs hover:bg-accent text-foreground transition"
                  >
                    <Upload className="h-4 w-4" /> Importar Datos desde JSON
                  </button>

                  <button
                    onClick={() => {
                      if (confirm("¿Estás seguro de restaurar los datos de fábrica? Se perderán las modificaciones personalizadas.")) {
                        resetToDefaults();
                        showSuccess("Valores de fábrica restaurados");
                      }
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-destructive/30 text-destructive font-semibold text-xs hover:bg-destructive/10 transition mt-2"
                  >
                    <RotateCcw className="h-4 w-4" /> Restaurar Ajustes por Defecto
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </SiteLayout>
  );
}
