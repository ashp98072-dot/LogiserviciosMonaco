import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Menu, X, Phone, Mail, MapPin, Truck, Facebook, MessageCircle, Lock } from "lucide-react";
import logo from "@/assets/logo.png";
import Chatbot from "./Chatbot";
import { useSiteData } from "@/context/SiteDataContext";

const nav = [
  { to: "/", label: "Inicio" },
  { to: "/filosofia", label: "Filosofía Empresarial" },
  { to: "/cobertura", label: "Cobertura" },
  { to: "/trabaja-con-nosotros", label: "Únete al equipo" },
  { to: "/contacto", label: "Contacto" },
] as const;

export default function SiteLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const { siteData } = useSiteData();
  const contact = siteData.contactInfo;
  const siteLogo = siteData.branding?.logoUrl || logo;

  const facebookUrl = contact.facebookUrl || "https://www.facebook.com/share/1CirGxQ8no/";
  const whatsappUrl = `https://wa.me/${contact.whatsappMain || "50234735996"}`;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 backdrop-blur bg-background/85 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 h-24 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-card ring-1 ring-border" aria-label="Logiservicios Mónaco - Inicio">
            <img
              src={siteLogo}
              alt="Logiservicios Mónaco"
              className="h-16 md:h-20 w-auto object-contain"
            />
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="px-3 py-2 rounded-md text-sm font-medium text-foreground/80 hover:text-primary hover:bg-accent transition-colors"
                activeProps={{ className: "px-3 py-2 rounded-md text-sm font-semibold text-primary bg-accent" }}
              >
                {n.label}
              </Link>
            ))}
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="ml-2 p-2 rounded-md text-foreground/80 hover:text-primary hover:bg-accent transition-colors"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <Link
              to="/contacto"
              className="ml-1 inline-flex items-center gap-2 rounded-md bg-gold-gradient px-4 py-2 text-sm font-semibold text-gold-foreground shadow-card hover:brightness-105 transition"
            >
              <Truck className="h-4 w-4" /> Cotizar
            </Link>
          </nav>
          <button onClick={() => setOpen(!open)} className="md:hidden p-2" aria-label="Menú">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {open && (
          <div className="md:hidden border-t border-border bg-background">
            <div className="px-4 py-3 flex flex-col gap-1">
              {nav.map((n) => (
                <Link key={n.to} to={n.to} onClick={() => setOpen(false)}
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-accent"
                  activeProps={{ className: "px-3 py-2 rounded-md text-sm font-semibold text-primary bg-accent" }}>
                  {n.label}
                </Link>
              ))}
              <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-accent flex items-center gap-2">
                <Facebook className="h-4 w-4" /> Facebook
              </a>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="mt-16 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 py-12 grid gap-8 md:grid-cols-4">
          <div>
            <div className="mb-3 inline-flex bg-white rounded-md p-2">
              <img src={siteLogo} alt="Logiservicios Mónaco" className="h-9 w-auto object-contain" />
            </div>
            <p className="text-sm text-primary-foreground/70">
              Soluciones integrales de logística y transporte en toda Guatemala.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <a href={facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                className="h-9 w-9 rounded-full bg-white/10 hover:bg-gold hover:text-gold-foreground flex items-center justify-center transition">
                <Facebook className="h-4 w-4" />
              </a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
                className="h-9 w-9 rounded-full bg-white/10 hover:bg-gold hover:text-gold-foreground flex items-center justify-center transition">
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-gold">Enlaces</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              {nav.map((n) => (
                <li key={n.to}><Link to={n.to} className="hover:text-gold">{n.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-gold">Servicios</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>Transporte de carga</li>
              <li>Almacenaje y bodegaje</li>
              <li>Distribución nacional</li>
              <li>Logística empresarial</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-gold">Contacto</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 text-gold" /> {contact.address}</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-gold" /> {contact.phone}</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-gold" /> {contact.emailInfo}</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 py-4 text-center text-xs text-primary-foreground/60 flex flex-wrap items-center justify-between max-w-7xl mx-auto px-4 gap-2">
          <span>© {new Date().getFullYear()} Logiservicios Mónaco. Todos los derechos reservados.</span>
          <Link to="/admin" className="text-primary-foreground/40 hover:text-gold transition">
            Administrar Sitio
          </Link>
        </div>
      </footer>

      {/* Floating WhatsApp button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chatear por WhatsApp"
        className="fixed bottom-6 left-6 z-50 h-14 w-14 rounded-full bg-[#25D366] text-white shadow-elegant hover:scale-110 transition flex items-center justify-center"
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden="true">
          <path d="M20.52 3.48A11.87 11.87 0 0 0 12.06 0C5.5 0 .17 5.33.17 11.9c0 2.1.55 4.14 1.6 5.95L0 24l6.32-1.65a11.9 11.9 0 0 0 5.73 1.46h.01c6.56 0 11.89-5.33 11.89-11.9 0-3.18-1.24-6.17-3.43-8.43zM12.06 21.8h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.75.98 1-3.65-.24-.38a9.86 9.86 0 0 1-1.52-5.26c0-5.46 4.44-9.9 9.92-9.9 2.65 0 5.14 1.03 7.01 2.9a9.83 9.83 0 0 1 2.9 7.01c0 5.46-4.44 9.89-9.91 9.89zm5.44-7.42c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35z"/>
        </svg>
      </a>

      <Chatbot />
    </div>
  );
}
