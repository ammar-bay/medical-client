import { StarIcon } from "./Icons";
import { useT, type Lang } from "@/lib/strings";

export default function Testimonials({ lang }: { lang: Lang }) {
  const t = useT(lang);
  const items = [1, 2, 3] as const;

  return (
    <section style={{ borderBottom: "1px solid var(--rule-2)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 28px" }}>
        <div className="eyebrow">{t("test_eyebrow")}</div>
        <h2
          className="serif"
          style={{ fontSize: 42, marginTop: 12, letterSpacing: "-0.02em" }}
        >
          {t("test_title")}
        </h2>

        <div
          style={{
            marginTop: 48,
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
          }}
        >
          {items.map((i) => (
            <figure
              key={i}
              className="card"
              style={{ padding: 28, margin: 0, borderRadius: 4 }}
            >
              <div style={{ display: "flex", gap: 2, color: "var(--gold)", marginBottom: 14 }}>
                {[1, 2, 3, 4, 5].map((s) => <StarIcon key={s} size={14} />)}
              </div>
              <blockquote
                className="serif"
                style={{ margin: 0, fontSize: 19, lineHeight: 1.4, color: "var(--ink)" }}
              >
                &ldquo;{t(`test_${i}` as Parameters<typeof t>[0])}&rdquo;
              </blockquote>
              <figcaption
                style={{
                  marginTop: 22,
                  paddingTop: 18,
                  borderTop: "1px solid var(--rule-2)",
                }}
              >
                <div style={{ fontSize: 14, fontWeight: 500 }}>
                  {t(`test_${i}_name` as Parameters<typeof t>[0])}
                </div>
                <div style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 2 }}>
                  {t(`test_${i}_meta` as Parameters<typeof t>[0])}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
