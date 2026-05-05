import { LogoIcon } from "./Icons";
import { useT, type Lang } from "@/lib/strings";

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <div className="text-xs font-medium uppercase tracking-widest text-(--ink-3) mb-3.5">
        {title}
      </div>
      <ul className="list-none p-0 m-0 grid gap-2 text-sm text-(--ink-2)">
        {items.map((x, i) => <li key={i}>{x}</li>)}
      </ul>
    </div>
  );
}

export default function Footer({ lang }: { lang: Lang }) {
  const t = useT(lang);
  return (
    <footer className="bg-(--bg) pb-10">
      <div className="max-w-300 mx-auto px-5 md:px-7 pt-15">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10">
          <div>
            <div className="flex items-center gap-2.5 text-(--teal)">
              <LogoIcon size={26} />
              <div className="serif text-lg text-(--ink)">{t("hero_name")}</div>
            </div>
            <div className="mt-3.5 text-sm text-(--ink-3) max-w-70">
              {t("foot_tag")}
            </div>
          </div>

          <FooterCol
            title={t("foot_links")}
            items={[t("nav_about"), t("nav_services"), t("nav_locations"), t("nav_faq")]}
          />
          <FooterCol
            title={t("foot_contact")}
            items={[
              "+92 321 4820890 (Doctors Hospital)",
              "+92 345 1450025 (Farooq Hospital DHA)",
              "WhatsApp available on both numbers",
            ]}
          />
          <FooterCol
            title={t("foot_hours")}
            items={[
              `${t("loc_ldh")} — ${t("loc_ldh_hours")}`,
              `${t("loc_fh")} — ${t("loc_fh_hours")}`,
            ]}
          />
        </div>

        <div className="mt-12 pt-5 border-t border-(--rule-2) text-xs text-(--ink-3) flex justify-between flex-wrap gap-3">
          <div>{t("foot_copy")}</div>
          <div>{t("foot_emergency")}</div>
        </div>
      </div>
    </footer>
  );
}
