import { useT, type Lang } from "@/lib/strings";

export default function About({ lang }: { lang: Lang }) {
  const t = useT(lang);
  return (
    <section id="about" className="border-b border-(--rule-2)">
      <div className="max-w-300 mx-auto px-5 md:px-7 py-16 md:py-25 grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10 lg:gap-15">
        <div>
          <div className="eyebrow">{t("about_eyebrow")}</div>
        </div>
        <div>
          <h2 className="serif text-[34px] md:text-[42px] tracking-[-0.02em] max-w-180">
            {t("about_title")}
          </h2>
          <div className="mt-8 text-[17px] text-(--ink-2) leading-[1.65] max-w-170 grid gap-4.5">
            <p className="m-0">{t("about_body_1")}</p>
            <p className="m-0">{t("about_body_2")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
