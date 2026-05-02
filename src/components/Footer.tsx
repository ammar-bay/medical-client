import { LogoIcon } from "./Icons";
import { useT, type Lang } from "@/lib/strings";

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <div
        style={{
          fontSize: 12,
          fontWeight: 500,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: "var(--ink-3)",
          marginBottom: 14,
        }}
      >
        {title}
      </div>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "grid",
          gap: 8,
          fontSize: 14,
          color: "var(--ink-2)",
        }}
      >
        {items.map((x, i) => <li key={i}>{x}</li>)}
      </ul>
    </div>
  );
}

export default function Footer({ lang }: { lang: Lang }) {
  const t = useT(lang);
  return (
    <footer style={{ background: "var(--bg)", paddingBottom: 40 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 28px 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: 40 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--teal)" }}>
              <LogoIcon size={26} />
              <div className="serif" style={{ fontSize: 18, color: "var(--ink)" }}>
                {t("hero_name")}
              </div>
            </div>
            <div style={{ marginTop: 14, fontSize: 14, color: "var(--ink-3)", maxWidth: 280 }}>
              {t("foot_tag")}
            </div>
          </div>

          <FooterCol
            title={t("foot_links")}
            items={[t("nav_about"), t("nav_services"), t("nav_locations"), t("nav_faq")]}
          />
          <FooterCol
            title={t("foot_contact")}
            items={["+92 300 0000000", "appointments@drirfan.pk", "WhatsApp 24/7"]}
          />
          <FooterCol
            title={t("foot_hours")}
            items={[
              `${t("loc_ldh")} — ${t("loc_ldh_hours")}`,
              `${t("loc_fh")} — ${t("loc_fh_hours")}`,
            ]}
          />
        </div>

        <div
          style={{
            marginTop: 48,
            paddingTop: 20,
            borderTop: "1px solid var(--rule-2)",
            fontSize: 12,
            color: "var(--ink-3)",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div>{t("foot_copy")}</div>
          <div>{t("foot_emergency")}</div>
        </div>
      </div>
    </footer>
  );
}
