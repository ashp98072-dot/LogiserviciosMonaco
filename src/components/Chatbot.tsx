import { useEffect, useMemo, useRef, useState } from "react";
import { MessageCircle, X, Send, Truck, Phone, Mail } from "lucide-react";

type Msg = { role: "user" | "bot"; text: string; time: string };

const PHONE = "+502 3473-5996";
const PHONE_TEL = "tel:+502 3473-5996";
const WHATSAPP = "https://wa.me/50234735996";
const EMAIL = "info@logiserviciosmonaco.com";

const GOLD = "#D4AF37";
const RED_DEEP = "#991B1B";
const RED_DARKER = "#7F1D1D";

type FaqItem = { keywords: string[]; answer: string };

const FAQ: FaqItem[] = [
  {
    keywords: ["servicio", "ofrecen", "hacen", "que hacen", "soluciones"],
    answer:
      "Ofrecemos:\n• Transporte de carga (seca, consolidada y de proyecto)\n• Almacenaje y bodegaje\n• Distribución nacional y última milla\n• Rutas dedicadas para clientes recurrentes\n• Logística empresarial a la medida",
  },
  {
    keywords: ["cobertura", "departamento", "donde", "ciudades", "lugares", "zonas"],
    answer:
      "Cubrimos los 22 departamentos de Guatemala: Guatemala, Sacatepéquez, Chimaltenango, Escuintla, Santa Rosa, Sololá, Totonicapán, Quetzaltenango, Suchitepéquez, Retalhuleu, San Marcos, Huehuetenango, Quiché, Baja Verapaz, Alta Verapaz, Petén, Izabal, Zacapa, Chiquimula, Jalapa, Jutiapa y El Progreso.",
  },
  {
    keywords: ["cotizar", "precio", "costo", "cotización", "cotizacion", "tarifa", "cuánto cuesta", "cuanto cuesta"],
    answer: `Con gusto elaboramos una cotización personalizada. Escríbenos a ${EMAIL}, llámanos al ${PHONE} o completa el formulario en la sección Contacto y te respondemos en menos de 24 horas.`,
  },
  {
    keywords: ["horario", "atienden", "hora", "abren", "cierran"],
    answer:
      "Atendemos de lunes a viernes de 7:00 a 18:00 y sábados de 8:00 a 13:00. Para operaciones críticas contamos con soporte 24/7.",
  },
  {
    keywords: ["telefono", "teléfono", "llamar", "número", "numero", "contacto", "celular", "whatsapp"],
    answer: `Puedes llamarnos o escribirnos por WhatsApp al ${PHONE}, o al correo ${EMAIL}.`,
  },
  {
    keywords: ["correo", "email", "mail"],
    answer: `Nuestro correo es ${EMAIL}. Te respondemos en horario hábil.`,
  },
  {
    keywords: ["tiempo", "entrega", "cuánto tarda", "cuanto tarda", "demora", "tarda"],
    answer:
      "Los tiempos dependen del destino:\n• Área metropolitana: mismo día\n• Interior del país: 24 a 72 horas\n• Rutas dedicadas: según programación acordada",
  },
  {
    keywords: ["flota", "camiones", "vehículos", "vehiculos", "unidades", "trailer", "tráiler"],
    answer:
      "Contamos con flota moderna monitoreada por GPS: paneles, furgones, pick-ups y trailers de distintos tonelajes para adaptarnos a tu carga.",
  },
  {
    keywords: ["seguro", "asegurada", "seguridad", "gps", "monitoreo"],
    answer:
      "Toda nuestra flota cuenta con GPS y protocolos de seguridad. Ofrecemos opción de carga asegurada; el detalle de cobertura se define según el tipo y valor de la mercadería.",
  },
  {
    keywords: ["carga peligrosa", "materiales peligrosos", "químicos", "quimicos", "peligrosa"],
    answer:
      "Para carga peligrosa evaluamos cada caso: escríbenos con la ficha del producto y coordinamos con nuestro equipo de operaciones.",
  },
  {
    keywords: ["refrigerada", "frío", "frio", "cadena de frío", "cadena de frio"],
    answer:
      "Coordinamos transporte con control de temperatura bajo demanda. Cuéntanos volumen, ruta y temperatura requerida para cotizar.",
  },
  {
    keywords: ["almacenaje", "bodega", "bodegaje", "almacén", "almacen", "inventario"],
    answer:
      "Ofrecemos espacio seguro con control de inventario, recepción, picking y despacho. Podemos integrar reportes según tu operación.",
  },
  {
    keywords: ["pago", "pagos", "factura", "facturación", "facturacion", "métodos de pago", "metodos de pago"],
    answer:
      "Aceptamos transferencia bancaria y depósito. Emitimos factura electrónica. Para clientes recurrentes manejamos crédito según evaluación.",
  },
  {
    keywords: ["trabaja", "empleo", "trabajo", "piloto", "vacante", "aplicar", "reclutamiento", "rrhh", "cv"],
    answer:
      "¡Nos encantaría conocerte! Ve a la sección 'Únete al equipo' para enviar tu CV o comunícate a recursoshumanos@logiserviciosmonaco.com o por WhatsApp al 3013-7849.",
  },
  {
    keywords: ["dirección", "direccion", "ubicación", "ubicacion", "oficina"],
    answer:
      "Nos ubicamos en 17av. 45-35 avenida Petapa, zona 12, Ciudad de Guatemala.",
  },
  {
    keywords: ["internacional", "aduana", "exportar", "importar", "frontera"],
    answer:
      "Actualmente operamos a nivel nacional dentro de Guatemala. Para necesidades internacionales podemos referirte con aliados estratégicos.",
  },
  {
    keywords: ["hola", "buenas", "buen día", "buen dia", "saludos", "hey", "qué tal", "que tal"],
    answer: "¡Hola! Soy Mónaco Bot 🚚 ¿En qué puedo ayudarte hoy? Puedes preguntarme por servicios, cobertura, cotizaciones, tiempos de entrega o cómo contactarnos.",
  },
  {
    keywords: ["gracias", "muchas gracias"],
    answer: "¡Con gusto! Estamos para servirte. ¿Necesitas algo más?",
  },
  {
    keywords: ["adios", "adiós", "chao", "hasta luego", "bye"],
    answer: "¡Hasta pronto! Recuerda que puedes escribirnos cuando quieras. 🚚",
  },
];

const SUGGESTIONS = [
  "Cotizar envío",
  "Cobertura nacional",
  "Tiempos de entrega",
  "Horarios",
  "Contacto",
];

const MENU_PROMPT = `Disculpa, no entendí bien tu consulta. Elige una de estas opciones o escríbenos al ${PHONE}:
• Cotizar envío
• Cobertura nacional
• Tiempos de entrega
• Horarios
• Contacto`;

function normalize(s: string): string {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

type ReplyResult = { answer: string; isFallback: boolean };

function reply(input: string): ReplyResult {
  const q = normalize(input);
  const match = FAQ.find((f) => f.keywords.some((k) => q.includes(normalize(k))));
  if (match) return { answer: match.answer, isFallback: false };
  return {
    answer: `No estoy seguro de esa consulta 🤔. Escríbenos a ${EMAIL} o llámanos/WhatsApp al ${PHONE} y con gusto te atendemos.`,
    isFallback: true,
  };
}

function now(): string {
  return new Date()
    .toLocaleTimeString("es-GT", { hour: "2-digit", minute: "2-digit" })
    .toUpperCase();
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [fallbackCount, setFallbackCount] = useState(0);
  const [menuMode, setMenuMode] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: "bot",
      text: "¡Hola! Soy Mónaco Bot. Puedo ayudarte con servicios, cobertura, cotizaciones, tiempos de entrega y más. Elige una opción o escribe tu pregunta.",
      time: now(),
    },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, open, typing]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const showSuggestions = useMemo(() => {
    const userCount = msgs.filter((m) => m.role === "user").length;
    return userCount === 0 || menuMode;
  }, [msgs, menuMode]);

  const handleSend = (text: string) => {
    const clean = text.trim();
    if (!clean) return;
    setMsgs((m) => [...m, { role: "user", text: clean, time: now() }]);
    setInput("");
    setTyping(true);
    setMenuMode(false);
    const { answer, isFallback } = reply(clean);
    const delay = Math.min(1200, 350 + answer.length * 8);
    window.setTimeout(() => {
      if (isFallback) {
        const nextCount = fallbackCount + 1;
        if (nextCount >= 2) {
          setMsgs((m) => [...m, { role: "bot", text: MENU_PROMPT, time: now() }]);
          setMenuMode(true);
          setFallbackCount(0);
        } else {
          setMsgs((m) => [...m, { role: "bot", text: answer, time: now() }]);
          setFallbackCount(nextCount);
        }
      } else {
        setFallbackCount(0);
        setMsgs((m) => [...m, { role: "bot", text: answer, time: now() }]);
      }
      setTyping(false);
    }, delay);
  };

  return (
    <>
      {/* Floating launcher */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 z-50 h-14 w-14 rounded-full text-white shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition"
        style={{
          background: `linear-gradient(135deg, ${RED_DEEP}, ${RED_DARKER})`,
          boxShadow: `0 10px 30px -8px ${RED_DEEP}80, 0 0 0 2px ${GOLD}40`,
        }}
        aria-label={open ? "Cerrar chat" : "Abrir chat"}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        {!open && (
          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white animate-pulse" />
        )}
      </button>

      {open && (
        <div className="fixed bottom-24 right-5 z-50 w-[92vw] max-w-[360px] h-[75vh] max-h-[600px] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4">
          {/* Header */}
          <div
            className="relative p-5 pb-6"
            style={{
              background: `linear-gradient(135deg, ${RED_DEEP}, ${RED_DARKER})`,
              borderBottom: `2px solid ${GOLD}4D`,
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div
                    className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-inner border-2"
                    style={{ borderColor: "rgba(255,255,255,0.2)" }}
                  >
                    <Truck className="w-7 h-7" style={{ color: RED_DEEP }} strokeWidth={1.75} />
                  </div>
                  <span
                    className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full"
                    style={{ border: `2px solid ${RED_DEEP}` }}
                  />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-white font-semibold text-lg leading-tight">Mónaco Bot</h3>
                  <span className="text-white/75 text-xs font-medium tracking-wide">
                    En línea · Responde al instante
                  </span>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-white/60 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
                aria-label="Cerrar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-4"
            style={{ background: "#FDFCFB" }}
          >
            {msgs.map((m, i) =>
              m.role === "bot" ? (
                <div key={i} className="flex flex-col items-start max-w-[90%]">
                  <div
                    className="bg-white p-3.5 rounded-2xl rounded-tl-none shadow-sm text-slate-700 text-sm leading-relaxed whitespace-pre-line"
                    style={{ borderLeft: `4px solid ${GOLD}` }}
                  >
                    {m.text}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 ml-1 font-medium tracking-tighter">
                    {m.time}
                  </span>
                </div>
              ) : (
                <div key={i} className="flex flex-col items-end ml-auto max-w-[85%]">
                  <div
                    className="text-white p-3.5 rounded-2xl rounded-tr-none shadow-md text-sm whitespace-pre-line"
                    style={{
                      background: RED_DEEP,
                      boxShadow: `0 4px 14px -4px ${RED_DEEP}40`,
                    }}
                  >
                    {m.text}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 mr-1 font-medium tracking-tighter">
                    {m.time}
                  </span>
                </div>
              )
            )}

            {typing && (
              <div className="flex gap-1 items-center pl-2 opacity-60">
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            )}
          </div>

          {/* Suggestion chips */}
          {showSuggestions && (
            <div className="bg-white px-4 pt-2 pb-1 border-t border-slate-100">
              <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSend(s)}
                    className="whitespace-nowrap bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-900 transition-all"
                    style={{ transition: "border-color 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = GOLD)}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = "")}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Main actions grid */}
          <div className="grid grid-cols-3 gap-2 px-4 py-2 bg-slate-50/60 border-t border-slate-100">
            <a
              href={PHONE_TEL}
              className="flex flex-col items-center justify-center p-2 rounded-xl border border-slate-100 bg-white hover:bg-slate-50 transition-colors group"
            >
              <Phone
                className="w-5 h-5 text-slate-400 mb-1 transition-colors group-hover:text-[color:var(--tw-empty)]"
                style={{ transition: "color 0.2s" }}
                onMouseEnter={(e) => ((e.currentTarget as SVGSVGElement).style.color = RED_DEEP)}
                onMouseLeave={(e) => ((e.currentTarget as SVGSVGElement).style.color = "")}
              />
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Llamar
              </span>
            </a>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-2 rounded-xl bg-[#25D366] shadow-sm hover:brightness-105 transition-all"
            >
              <svg className="w-5 h-5 text-white mb-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              <span className="text-[10px] font-bold uppercase tracking-wider text-white">
                WhatsApp
              </span>
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="flex flex-col items-center justify-center p-2 rounded-xl border border-slate-100 bg-white hover:bg-slate-50 transition-colors group"
            >
              <Mail
                className="w-5 h-5 text-slate-400 mb-1"
                onMouseEnter={(e) => ((e.currentTarget as SVGSVGElement).style.color = RED_DEEP)}
                onMouseLeave={(e) => ((e.currentTarget as SVGSVGElement).style.color = "")}
              />
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Correo
              </span>
            </a>
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-slate-100">
            <div
              className="flex items-center gap-2 bg-slate-50 rounded-2xl px-4 py-2 border border-slate-200 transition-all focus-within:bg-white"
              onFocusCapture={(e) => (e.currentTarget.style.borderColor = GOLD)}
              onBlurCapture={(e) => (e.currentTarget.style.borderColor = "")}
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
                placeholder="Escribe tu consulta..."
                className="flex-1 bg-transparent border-none text-sm text-slate-700 outline-none placeholder:text-slate-400 py-1 font-medium"
              />
              <button
                onClick={() => handleSend(input)}
                disabled={!input.trim()}
                className="text-white p-2 rounded-xl shadow-md hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                style={{ background: RED_DEEP }}
                aria-label="Enviar"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
