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
    <section className="border-b border-(--rule-2) bg-(--bg)">
      <div className="max-w-300 mx-auto px-5 md:px-7 py-14 md:py-24 grid grid-cols-1 md:grid-cols-[1.15fr_1fr] gap-10 md:gap-16 items-center">
        <div>
          <div className="eyebrow">{t("hero_eyebrow")}</div>
          <h1
            className="serif mt-4 mb-4 tracking-[-0.02em] leading-[1.02]"
            style={{ fontSize: "clamp(42px, 9vw, 76px)" }}
          >
            {t("hero_name")}
          </h1>
          <div className="mono text-xs text-(--ink-3) mb-3.5 tracking-[0.04em]">
            {t("hero_creds")}
          </div>
          <div className="text-base text-(--ink-2) font-medium mb-2">
            {t("hero_role")}
          </div>
          <p className="text-base text-(--ink-2) leading-relaxed max-w-135 mt-5 mb-0">
            {t("hero_subtitle")}
          </p>
          <div className="flex gap-3 mt-8 flex-wrap">
            <button className="btn btn-primary btn-lg" onClick={onBook}>
              {t("hero_cta_book")}
              <ArrowIcon size={15} dir={dir === "rtl" ? "left" : "right"} />
            </button>
            <a href="tel:+923214820890" className="btn btn-ghost btn-lg">
              <PhoneIcon size={14} /> {t("hero_cta_call")}
            </a>
          </div>
        </div>

        <div className="hidden md:block relative">
          <div
            className="relative overflow-hidden rounded bg-(--bg-soft) border border-(--rule-2)"
            style={{ aspectRatio: "4/5" }}
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
            className="absolute bottom-7 bg-(--bg-card) border border-(--rule-2) px-4.5 py-3.5 rounded max-w-60"
            style={{
              left: dir === "rtl" ? "auto" : -22,
              right: dir === "rtl" ? -22 : "auto",
              boxShadow: "var(--shadow-md)",
            }}
          >
            <div className="eyebrow mb-1.5">FRCP · Internationally trained</div>
            <div className="serif text-lg leading-[1.2]">{t("hero_credential_title")}</div>
            <div className="text-xs text-(--ink-3) mt-1">{t("hero_credential_sub")}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
