import { useT, type Lang } from "@/lib/strings";

const STATS = [
  { value: "20+", key: "stat_years" as const },
  { value: "12,000+", key: "stat_patients" as const },
  { value: "300+", key: "stat_transplants" as const },
  { value: "4.9/5", key: "stat_rating" as const },
];

export default function Stats({ lang }: { lang: Lang }) {
  const t = useT(lang);
  return (
    <section style={{ borderBottom: "1px solid var(--rule-2)", background: "var(--bg)" }}>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "44px 28px",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 24,
        }}
      >
        {STATS.map((s) => (
          <div
            key={s.key}
            style={{
              paddingInlineStart: 18,
              borderInlineStart: "1px solid var(--rule)",
            }}
          >
            <div
              className="serif"
              style={{ fontSize: 38, fontWeight: 500, color: "var(--teal-deep)", letterSpacing: "-0.02em" }}
            >
              {s.value}
            </div>
            <div style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 4, textTransform: "uppercase", letterSpacing: "0.08em" }}>
              {t(s.key)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
