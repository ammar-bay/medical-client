"use client";
import Image from "next/image";
import { ArrowIcon, PhoneIcon } from "./Icons";
import { useT, type Lang } from "@/lib/strings";

interface HeroProps {
  lang: Lang;
  onBook: () => void;
}

export default function Hero({ lang, onBook }: HeroProps) {
  const t = useT(lang);
  const dir = lang === "ur" ? "rtl" : "ltr";

  return (
    <section style={{ borderBottom: "1px solid var(--rule-2)", background: "var(--bg)" }}>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "92px 28px 100px",
          display: "grid",
          gridTemplateColumns: "1.15fr 1fr",
          gap: 64,
          alignItems: "center",
        }}
      >
        <div>
          <div className="eyebrow">{t("hero_eyebrow")}</div>
          <h1
            className="serif"
            style={{
              fontSize: 76,
              marginTop: 16,
              marginBottom: 18,
              letterSpacing: "-0.02em",
              lineHeight: 1.02,
            }}
          >
            {t("hero_name")}
          </h1>
          <div
            className="mono"
            style={{ fontSize: 12, color: "var(--ink-3)", marginBottom: 14, letterSpacing: "0.04em" }}
          >
            {t("hero_creds")}
          </div>
          <div style={{ fontSize: 16, color: "var(--ink-2)", fontWeight: 500, marginBottom: 8 }}>
            {t("hero_role")}
          </div>
          <p style={{ fontSize: 16, color: "var(--ink-2)", lineHeight: 1.6, maxWidth: 540, marginTop: 18, marginBottom: 0 }}>
            {t("hero_subtitle")}
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 30, flexWrap: "wrap" }}>
            <button className="btn btn-primary btn-lg" onClick={onBook}>
              {t("hero_cta_book")}
              <ArrowIcon size={15} dir={dir === "rtl" ? "left" : "right"} />
            </button>
            <a href="tel:+923001234567" className="btn btn-ghost btn-lg">
              <PhoneIcon size={14} /> {t("hero_cta_call")}
            </a>
          </div>
        </div>

        <div style={{ position: "relative" }}>
          <div
            style={{
              aspectRatio: "4/5",
              borderRadius: 4,
              position: "relative",
              overflow: "hidden",
              background: "var(--bg-soft)",
              border: "1px solid var(--rule-2)",
            }}
          >
            <Image
              src="/portrait.jpg"
              alt="Dr. Irfan Ahmad"
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </div>

          <div
            style={{
              position: "absolute",
              left: dir === "rtl" ? "auto" : -22,
              right: dir === "rtl" ? -22 : "auto",
              bottom: 28,
              background: "var(--bg-card)",
              border: "1px solid var(--rule-2)",
              padding: "14px 18px",
              borderRadius: 4,
              boxShadow: "var(--shadow-md)",
              maxWidth: 240,
            }}
          >
            <div className="eyebrow" style={{ marginBottom: 6 }}>FRCP · Ireland</div>
            <div className="serif" style={{ fontSize: 18, lineHeight: 1.2 }}>
              {t("hero_credential_title")}
            </div>
            <div style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 4 }}>
              {t("hero_credential_sub")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
