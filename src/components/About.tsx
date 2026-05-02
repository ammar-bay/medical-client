import { useT, type Lang } from "@/lib/strings";

export default function About({ lang }: { lang: Lang }) {
  const t = useT(lang);
  return (
    <section id="about" style={{ borderBottom: "1px solid var(--rule-2)" }}>
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
          <div className="eyebrow">{t("about_eyebrow")}</div>
        </div>
        <div>
          <h2
            className="serif"
            style={{ fontSize: 42, letterSpacing: "-0.02em", maxWidth: 720 }}
          >
            {t("about_title")}
          </h2>
          <div
            style={{
              marginTop: 32,
              fontSize: 17,
              color: "var(--ink-2)",
              lineHeight: 1.65,
              maxWidth: 680,
              display: "grid",
              gap: 18,
            }}
          >
            <p style={{ margin: 0 }}>{t("about_body_1")}</p>
            <p style={{ margin: 0 }}>{t("about_body_2")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
