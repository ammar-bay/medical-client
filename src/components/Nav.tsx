"use client";
import { LogoIcon, ArrowIcon } from "./Icons";
import { useT, type Lang } from "@/lib/strings";

interface NavProps {
  lang: Lang;
  setLang: (l: Lang) => void;
  onBook: () => void;
}

export default function Nav({ lang, setLang, onBook }: NavProps) {
  const t = useT(lang);
  const dir = lang === "ur" ? "rtl" : "ltr";

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 30,
        backdropFilter: "saturate(180%) blur(8px)",
        background: "color-mix(in oklch, var(--bg) 80%, transparent)",
        borderBottom: "1px solid var(--rule-2)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "16px 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ color: "var(--teal)" }}>
            <LogoIcon size={26} />
          </span>
          <div style={{ lineHeight: 1.1 }}>
            <div className="serif" style={{ fontSize: 17, fontWeight: 500 }}>
              {t("hero_name")}
            </div>
            <div style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.04em" }}>
              {lang === "ur" ? "نیفرولوجسٹ" : "Nephrologist · Lahore"}
            </div>
          </div>
        </div>

        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: 28,
            fontSize: 14,
            color: "var(--ink-2)",
          }}
        >
          <a href="#about" className="navlink">{t("nav_about")}</a>
          <a href="#services" className="navlink">{t("nav_services")}</a>
          <a href="#locations" className="navlink">{t("nav_locations")}</a>
          <a href="#faq" className="navlink">{t("nav_faq")}</a>
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            onClick={() => setLang(lang === "en" ? "ur" : "en")}
            style={{
              fontSize: 12,
              fontWeight: 500,
              padding: "6px 10px",
              border: "1px solid var(--rule)",
              borderRadius: 999,
              background: "transparent",
              color: "var(--ink-2)",
              fontFamily: "var(--mono)",
            }}
          >
            {lang === "en" ? "اردو" : "EN"}
          </button>
          <button className="btn btn-primary btn-sm" onClick={onBook}>
            {t("nav_book")} <ArrowIcon size={14} dir={dir === "rtl" ? "left" : "right"} />
          </button>
        </div>
      </div>
    </header>
  );
}
