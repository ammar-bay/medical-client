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
    <header className="sticky top-0 z-30 backdrop-saturate-180 backdrop-blur-sm border-b border-(--rule-2) bg-(--nav-bg)">
      <div className="max-w-300 mx-auto px-5 md:px-7 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="text-(--teal) shrink-0"><LogoIcon size={26} /></span>
          <div className="leading-[1.1] min-w-0">
            <div className="serif text-[17px] font-medium truncate">{t("hero_name")}</div>
            <div className="text-xs text-(--ink-3) tracking-[0.04em] hidden sm:block">
              {lang === "ur" ? "نیفرولوجسٹ" : "Nephrologist · Lahore"}
            </div>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-7 text-sm text-(--ink-2)">
          <a href="#about" className="navlink">{t("nav_about")}</a>
          <a href="#services" className="navlink">{t("nav_services")}</a>
          <a href="#locations" className="navlink">{t("nav_locations")}</a>
          <a href="#faq" className="navlink">{t("nav_faq")}</a>
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setLang(lang === "en" ? "ur" : "en")}
            className="text-xs font-medium px-2.5 py-1.5 border border-(--rule) rounded-full bg-transparent text-(--ink-2) cursor-pointer"
          >
            {lang === "en" ? "اردو" : "EN"}
          </button>
          <button className="btn btn-primary btn-sm" onClick={onBook}>
            <span className="hidden sm:inline">{t("nav_book")}</span>
            <span className="sm:hidden">{lang === "ur" ? "بک" : "Book"}</span>
            <ArrowIcon size={14} dir={dir === "rtl" ? "left" : "right"} />
          </button>
        </div>
      </div>
    </header>
  );
}
