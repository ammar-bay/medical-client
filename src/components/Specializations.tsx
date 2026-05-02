import { DropIcon, HeartIcon, PulseIcon } from "./Icons";
import { useT, type Lang } from "@/lib/strings";

const SPECS = [
  { icon: <DropIcon size={26} />, key: "kidney" as const },
  { icon: <HeartIcon size={26} />, key: "transplant" as const },
  { icon: <PulseIcon size={26} />, key: "diabetes" as const },
  { icon: <HeartIcon size={26} />, key: "hyper" as const },
];

export default function Specializations({ lang }: { lang: Lang }) {
  const t = useT(lang);
  return (
    <section id="services" style={{ background: "var(--bg-soft)", borderBottom: "1px solid var(--rule-2)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 28px" }}>
        <div className="eyebrow">{t("spec_eyebrow")}</div>
        <h2
          className="serif"
          style={{ fontSize: 42, marginTop: 12, letterSpacing: "-0.02em" }}
        >
          {t("spec_title")}
        </h2>
        <div
          style={{
            marginTop: 48,
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            border: "1px solid var(--rule-2)",
            borderRadius: 4,
            background: "var(--bg-card)",
          }}
        >
          {SPECS.map((s, idx) => (
            <div
              key={s.key}
              style={{
                padding: 28,
                borderInlineEnd: idx < SPECS.length - 1 ? "1px solid var(--rule-2)" : "none",
              }}
            >
              <div style={{ color: "var(--teal)", marginBottom: 24 }}>{s.icon}</div>
              <h3 className="serif" style={{ fontSize: 22, marginBottom: 10 }}>
                {t(`spec_${s.key}`)}
              </h3>
              <p style={{ fontSize: 14, color: "var(--ink-3)", lineHeight: 1.55, margin: 0 }}>
                {t(`spec_${s.key}_desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
