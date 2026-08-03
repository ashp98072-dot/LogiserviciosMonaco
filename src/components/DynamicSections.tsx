import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, CheckCircle2, Video } from "lucide-react";
import { useSiteData, CustomSection } from "@/context/SiteDataContext";

interface DynamicSectionsProps {
  page: "inicio" | "quienes-somos" | "cobertura" | "trabaja" | "contacto" | "todas";
  previewSection?: CustomSection; // For live editing preview
  onSelectSection?: (section: CustomSection) => void; // For live editor interactive clicking
}

function getEmbedVideoUrl(url: string | undefined): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  if (trimmed.includes("youtube.com/watch?v=")) {
    const videoId = trimmed.split("watch?v=")[1]?.split("&")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  if (trimmed.includes("youtu.be/")) {
    const videoId = trimmed.split("youtu.be/")[1]?.split("?")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  if (trimmed.includes("vimeo.com/")) {
    const videoId = trimmed.split("vimeo.com/")[1]?.split("?")[0];
    return `https://player.vimeo.com/video/${videoId}`;
  }
  return trimmed;
}

function getTitleColorClass(color?: string, isDark?: boolean) {
  switch (color) {
    case "gold": return "text-gold";
    case "primary": return "text-primary";
    case "red": return "text-red-600 dark:text-red-400";
    case "white": return "text-white";
    case "black": return "text-black dark:text-white";
    default: return isDark ? "text-white" : "text-foreground";
  }
}

function getSubtitleColorClass(color?: string) {
  switch (color) {
    case "gold": return "text-gold";
    case "primary": return "text-primary";
    case "white": return "text-white";
    case "red": return "text-red-600 dark:text-red-400";
    case "muted": return "text-muted-foreground";
    default: return "text-gold";
  }
}

function getTextColorClass(color?: string, isDark?: boolean) {
  switch (color) {
    case "muted": return "text-muted-foreground";
    case "white": return "text-white/90";
    case "dark": return "text-neutral-900 dark:text-neutral-100 font-medium";
    default: return isDark ? "text-white/80" : "text-muted-foreground";
  }
}

function getFontFamilyClass(font?: string) {
  switch (font) {
    case "serif": return "font-serif";
    case "mono": return "font-mono";
    case "display": return "font-display tracking-tight";
    default: return "font-sans";
  }
}

function getTitleSizeClass(size?: string) {
  switch (size) {
    case "large": return "text-3xl md:text-5xl font-extrabold";
    case "huge": return "text-4xl md:text-6xl font-black";
    default: return "text-2xl md:text-4xl font-bold";
  }
}

export default function DynamicSections({ page, previewSection, onSelectSection }: DynamicSectionsProps) {
  const { siteData } = useSiteData();

  const sections = previewSection
    ? [previewSection]
    : (siteData.customSections || [])
        .filter((sec) => sec.active !== false)
        .filter((sec) => {
          if (page === "todas") return true;
          if (!sec.pageTarget) return page === "inicio";
          return sec.pageTarget === page || sec.pageTarget === "todas";
        })
        .sort((a, b) => (a.order || 0) - (b.order || 0));

  if (sections.length === 0) return null;

  return (
    <div className="space-y-0">
      {sections.map((sec) => {
        const isDark = sec.bgStyle === "dark";
        const isGold = sec.bgStyle === "gold";

        const bgClass = isDark
          ? "bg-neutral-900 text-white py-16 md:py-20"
          : isGold
          ? "bg-hero-gradient text-white py-16 md:py-20"
          : "bg-background text-foreground py-16 md:py-20 border-t border-border";

        const embedVideo = getEmbedVideoUrl(sec.videoUrl);

        const titleColorClass = getTitleColorClass(sec.titleColor, isDark || isGold);
        const subtitleColorClass = getSubtitleColorClass(sec.subtitleColor);
        const textColorClass = getTextColorClass(sec.textColor, isDark || isGold);
        const fontFamilyClass = getFontFamilyClass(sec.fontFamily);
        const titleSizeClass = getTitleSizeClass(sec.titleSize);

        const wrapInteractive = (content: React.ReactNode) => {
          if (!onSelectSection) return content;
          return (
            <div
              key={sec.id}
              onClick={() => onSelectSection(sec)}
              className="relative group cursor-pointer"
            >
              {content}
              <div className="absolute inset-0 bg-gold/15 border-2 border-gold opacity-0 group-hover:opacity-100 transition z-20 pointer-events-none flex items-center justify-center">
                <span className="bg-neutral-900 text-gold font-bold text-xs px-3.5 py-2 rounded-xl shadow-2xl border border-gold/50 flex items-center gap-1.5">
                  ✏️ Clic para editar bloque: {sec.title}
                </span>
              </div>
            </div>
          );
        };

        // Media Element (Image or Video)
        const renderMedia = () => {
          if (sec.mediaType === "video" || (sec.videoUrl && sec.layoutStyle === "video")) {
            if (embedVideo && (embedVideo.includes("youtube.com") || embedVideo.includes("vimeo.com"))) {
              return (
                <div className="relative aspect-video rounded-xl overflow-hidden shadow-elegant border border-border/20 w-full">
                  <iframe
                    src={embedVideo}
                    title={sec.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              );
            }
            if (sec.videoUrl) {
              return (
                <div className="relative aspect-video rounded-xl overflow-hidden shadow-elegant border border-border/20 w-full bg-black">
                  <video src={sec.videoUrl} controls className="w-full h-full object-cover" />
                </div>
              );
            }
          }

          if (sec.imageUrl) {
            return (
              <img
                src={sec.imageUrl}
                alt={sec.title}
                className="rounded-xl shadow-elegant w-full h-auto object-cover max-h-[450px]"
              />
            );
          }

          return (
            <div className="h-64 rounded-xl bg-accent flex items-center justify-center p-6 text-center text-muted-foreground border border-border">
              <Sparkles className="h-12 w-12 text-gold opacity-60" />
            </div>
          );
        };

        // Video Block / Hero Video
        if (sec.layoutStyle === "video") {
          return wrapInteractive(
            <section key={sec.id} className={`${bgClass} ${fontFamilyClass} relative overflow-hidden`}>
              <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
                {sec.subtitle && (
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/20 text-xs font-semibold uppercase tracking-wider ${subtitleColorClass}`}>
                    <Video className="h-3.5 w-3.5" /> {sec.subtitle}
                  </span>
                )}
                <h2 className={`${titleSizeClass} ${titleColorClass} leading-tight`}>{sec.title}</h2>
                {sec.content && (
                  <p className={`text-base md:text-lg max-w-2xl mx-auto whitespace-pre-line ${textColorClass}`}>{sec.content}</p>
                )}
                <div className="max-w-4xl mx-auto mt-6">
                  {renderMedia()}
                </div>
                {sec.buttonText && sec.buttonUrl && (
                  <div className="pt-4">
                    {sec.buttonUrl.startsWith("http") ? (
                      <a
                        href={sec.buttonUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-gold-gradient text-gold-foreground font-bold px-6 py-3 rounded-xl shadow-md hover:brightness-105 transition"
                      >
                        {sec.buttonText} <ArrowRight className="h-4 w-4" />
                      </a>
                    ) : (
                      <Link
                        to={sec.buttonUrl}
                        className="inline-flex items-center gap-2 bg-gold-gradient text-gold-foreground font-bold px-6 py-3 rounded-xl shadow-md hover:brightness-105 transition"
                      >
                        {sec.buttonText} <ArrowRight className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </section>
          );
        }

        // Features Grid Block
        if (sec.layoutStyle === "features") {
          const items = sec.featuresList && sec.featuresList.length > 0
            ? sec.featuresList
            : sec.content.split("\n").filter((line) => line.trim() !== "");

          return wrapInteractive(
            <section key={sec.id} className={`${bgClass} ${fontFamilyClass}`}>
              <div className="max-w-7xl mx-auto px-4 space-y-8">
                <div className="text-center max-w-3xl mx-auto">
                  {sec.subtitle && (
                    <span className={`font-semibold uppercase text-xs tracking-wider ${subtitleColorClass}`}>{sec.subtitle}</span>
                  )}
                  <h2 className={`${titleSizeClass} ${titleColorClass} mt-1`}>{sec.title}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((item, idx) => (
                    <div key={idx} className="p-6 rounded-xl border border-border bg-card shadow-xs flex items-start gap-4">
                      <CheckCircle2 className="h-6 w-6 text-gold shrink-0 mt-0.5" />
                      <p className={`text-sm font-medium ${textColorClass}`}>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          );
        }

        // Stats Block
        if (sec.layoutStyle === "stats") {
          return wrapInteractive(
            <section key={sec.id} className={`${bgClass} ${fontFamilyClass} py-12`}>
              <div className="max-w-7xl mx-auto px-4 text-center">
                {sec.title && <h2 className={`${titleSizeClass} ${titleColorClass} mb-8`}>{sec.title}</h2>}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {sec.statsList && sec.statsList.length > 0 ? (
                    sec.statsList.map((st, idx) => (
                      <div key={idx} className="p-6 rounded-xl bg-card border border-border shadow-xs">
                        <div className="text-3xl md:text-4xl font-black text-gold">{st.value}</div>
                        <div className="text-xs font-semibold text-muted-foreground uppercase mt-2">{st.label}</div>
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="p-6 rounded-xl bg-card border border-border shadow-xs">
                        <div className="text-3xl md:text-4xl font-black text-gold">22</div>
                        <div className="text-xs font-semibold text-muted-foreground uppercase mt-2">Departamentos</div>
                      </div>
                      <div className="p-6 rounded-xl bg-card border border-border shadow-xs">
                        <div className="text-3xl md:text-4xl font-black text-gold">100%</div>
                        <div className="text-xs font-semibold text-muted-foreground uppercase mt-2">Puntualidad</div>
                      </div>
                      <div className="p-6 rounded-xl bg-card border border-border shadow-xs">
                        <div className="text-3xl md:text-4xl font-black text-gold">15+</div>
                        <div className="text-xs font-semibold text-muted-foreground uppercase mt-2">Años Experiencia</div>
                      </div>
                      <div className="p-6 rounded-xl bg-card border border-border shadow-xs">
                        <div className="text-3xl md:text-4xl font-black text-gold">24/7</div>
                        <div className="text-xs font-semibold text-muted-foreground uppercase mt-2">Monitoreo GPS</div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </section>
          );
        }

        if (sec.layoutStyle === "banner") {
          return wrapInteractive(
            <section key={sec.id} className={`${bgClass} ${fontFamilyClass} relative overflow-hidden`}>
              {sec.imageUrl && (
                <div className="absolute inset-0 opacity-20">
                  <img src={sec.imageUrl} alt={sec.title} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="relative max-w-5xl mx-auto px-4 text-center">
                {sec.subtitle && (
                  <span className={`inline-block px-3 py-1 rounded-full bg-gold/20 text-xs font-semibold uppercase tracking-wider mb-3 ${subtitleColorClass}`}>
                    {sec.subtitle}
                  </span>
                )}
                <h2 className={`${titleSizeClass} ${titleColorClass} leading-tight`}>{sec.title}</h2>
                <p className={`mt-4 text-base md:text-lg max-w-2xl mx-auto whitespace-pre-line ${textColorClass}`}>{sec.content}</p>
                {sec.buttonText && sec.buttonUrl && (
                  <div className="mt-8">
                    {sec.buttonUrl.startsWith("http") ? (
                      <a
                        href={sec.buttonUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-gold-gradient text-gold-foreground font-bold px-6 py-3 rounded-xl shadow-md hover:brightness-105 transition"
                      >
                        {sec.buttonText} <ArrowRight className="h-4 w-4" />
                      </a>
                    ) : (
                      <Link
                        to={sec.buttonUrl}
                        className="inline-flex items-center gap-2 bg-gold-gradient text-gold-foreground font-bold px-6 py-3 rounded-xl shadow-md hover:brightness-105 transition"
                      >
                        {sec.buttonText} <ArrowRight className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </section>
          );
        }

        if (sec.layoutStyle === "text-right") {
          return wrapInteractive(
            <section key={sec.id} className={`${bgClass} ${fontFamilyClass}`}>
              <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
                <div>{renderMedia()}</div>
                <div>
                  {sec.subtitle && (
                    <span className={`font-semibold uppercase text-xs tracking-wider ${subtitleColorClass}`}>{sec.subtitle}</span>
                  )}
                  <h2 className={`mt-2 ${titleSizeClass} ${titleColorClass}`}>{sec.title}</h2>
                  <p className={`mt-4 leading-relaxed whitespace-pre-line text-sm md:text-base text-justify ${textColorClass}`}>{sec.content}</p>
                  {sec.buttonText && sec.buttonUrl && (
                    <div className="mt-6">
                      {sec.buttonUrl.startsWith("http") ? (
                        <a
                          href={sec.buttonUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all"
                        >
                          {sec.buttonText} <ArrowRight className="h-4 w-4" />
                        </a>
                      ) : (
                        <Link
                          to={sec.buttonUrl}
                          className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all"
                        >
                          {sec.buttonText} <ArrowRight className="h-4 w-4" />
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </section>
          );
        }

        if (sec.layoutStyle === "card") {
          return wrapInteractive(
            <section key={sec.id} className={`${bgClass} ${fontFamilyClass}`}>
              <div className="max-w-5xl mx-auto px-4">
                <div className="rounded-2xl border border-border bg-card p-8 md:p-12 shadow-elegant">
                  {sec.subtitle && (
                    <span className={`font-semibold uppercase text-xs tracking-wider ${subtitleColorClass}`}>{sec.subtitle}</span>
                  )}
                  <h2 className={`mt-1 ${titleSizeClass} ${titleColorClass}`}>{sec.title}</h2>
                  <p className={`mt-4 whitespace-pre-line text-sm md:text-base text-justify ${textColorClass}`}>{sec.content}</p>
                  <div className="mt-6">{renderMedia()}</div>
                  {sec.buttonText && sec.buttonUrl && (
                    <div className="mt-6">
                      {sec.buttonUrl.startsWith("http") ? (
                        <a
                          href={sec.buttonUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-5 py-2.5 rounded-lg hover:bg-primary/90 transition text-sm"
                        >
                          {sec.buttonText} <ArrowRight className="h-4 w-4" />
                        </a>
                      ) : (
                        <Link
                          to={sec.buttonUrl}
                          className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-5 py-2.5 rounded-lg hover:bg-primary/90 transition text-sm"
                        >
                          {sec.buttonText} <ArrowRight className="h-4 w-4" />
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </section>
          );
        }

        // Default: text-left
        return wrapInteractive(
          <section key={sec.id} className={`${bgClass} ${fontFamilyClass}`}>
            <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
              <div>
                {sec.subtitle && (
                  <span className={`font-semibold uppercase text-xs tracking-wider ${subtitleColorClass}`}>{sec.subtitle}</span>
                )}
                <h2 className={`mt-2 ${titleSizeClass} ${titleColorClass}`}>{sec.title}</h2>
                <p className={`mt-4 leading-relaxed whitespace-pre-line text-sm md:text-base text-justify ${textColorClass}`}>{sec.content}</p>
                {sec.buttonText && sec.buttonUrl && (
                  <div className="mt-6">
                    {sec.buttonUrl.startsWith("http") ? (
                      <a
                        href={sec.buttonUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all"
                      >
                        {sec.buttonText} <ArrowRight className="h-4 w-4" />
                      </a>
                    ) : (
                      <Link
                        to={sec.buttonUrl}
                        className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all"
                      >
                        {sec.buttonText} <ArrowRight className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                )}
              </div>
              <div>{renderMedia()}</div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
