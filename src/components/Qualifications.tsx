import { useT, type Lang } from "@/lib/strings";

const ROWS: [string, string][] = [
  ["mbbs", "1998"],
  ["mrcp", "2006"],
  ["hst", "2009"],
  ["frcp", "2014"],
  ["diab", "2010"],
  ["tx", "2012"],
  ["assoc", "2015"],
];

export default function Qualifications({ lang }: { lang: Lang }) {
  const t = useT(lang);
  return (
    <section style={{ borderBottom: "1px solid var(--rule-2)" }}>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "100px 28px",
          display: "grid",
          gridTemplateColumns: "300px 1fr",
          gap: 60,
        }}
      >
        <div>
          <div className="eyebrow">{t("qual_eyebrow")}</div>
          <h2
            className="serif"
            style={{ fontSize: 38, marginTop: 12, letterSpacing: "-0.02em" }}
          >
            {t("qual_title")}
          </h2>
        </div>
        <div>
          <div style={{ borderTop: "1px solid var(--rule-2)" }}>
            {ROWS.map(([key, year]) => (
              <div
                key={key}
                style={{
                  display: "grid",
                  gridTemplateColumns: "70px 1fr",
                  gap: 24,
                  padding: "20px 0",
                  borderBottom: "1px solid var(--rule-2)",
                }}
              >
                <div
                  className="mono"
                  style={{ color: "var(--teal)", fontSize: 13, paddingTop: 4 }}
                >
                  {year}
                </div>
                <div>
                  <div className="serif" style={{ fontSize: 19, lineHeight: 1.3 }}>
                    {t(`qual_${key}` as Parameters<ReturnType<typeof useT>>[0])}
                  </div>
                  <div style={{ fontSize: 13, color: "var(--ink-3)", marginTop: 2 }}>
                    {t(`qual_${key}_inst` as Parameters<ReturnType<typeof useT>>[0])}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
